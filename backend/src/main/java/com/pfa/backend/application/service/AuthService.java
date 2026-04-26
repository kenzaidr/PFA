package com.pfa.backend.application.service;

import com.pfa.backend.application.dto.auth.EmailVerificationConfirmRequest;
import com.pfa.backend.application.dto.auth.EmailVerificationRequest;
import com.pfa.backend.application.dto.auth.EmailVerificationResponse;
import com.pfa.backend.application.dto.auth.RegisterRequest;
import com.pfa.backend.application.dto.auth.PasswordResetConfirmRequest;
import com.pfa.backend.application.dto.auth.PasswordResetRequest;
import com.pfa.backend.application.dto.auth.PasswordResetResponse;
import com.pfa.backend.application.dto.auth.UserSummaryResponse;
import com.pfa.backend.domain.enums.Role;
import com.pfa.backend.domain.model.EmailVerificationToken;
import com.pfa.backend.domain.model.Client;
import com.pfa.backend.domain.model.Company;
import com.pfa.backend.domain.model.PasswordResetToken;
import com.pfa.backend.domain.model.User;
import com.pfa.backend.infrastructure.persistence.EmailVerificationTokenRepository;
import com.pfa.backend.infrastructure.persistence.ClientRepository;
import com.pfa.backend.infrastructure.persistence.CompanyRepository;
import com.pfa.backend.infrastructure.persistence.PasswordResetTokenRepository;
import com.pfa.backend.infrastructure.persistence.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.HexFormat;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final CompanyRepository companyRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, ClientRepository clientRepository, CompanyRepository companyRepository, EmailVerificationTokenRepository emailVerificationTokenRepository, PasswordResetTokenRepository passwordResetTokenRepository, MailService mailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.companyRepository = companyRepository;
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.mailService = mailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserSummaryResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase(Locale.ROOT);

        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        Role role = request.getRole();
        boolean isStudentRegistration = role == Role.CLIENT || role == Role.STUDENT;
        boolean isRecruiterRegistration = role == Role.RECRUITER;

        if (!isStudentRegistration && !isRecruiterRegistration) {
            throw new IllegalArgumentException("This endpoint only supports student or recruiter registration");
        }

        if (isRecruiterRegistration && (request.getCompanyName() == null || request.getCompanyName().trim().isEmpty())) {
            throw new IllegalArgumentException("Company name is required for recruiter registration");
        }

        Role persistedRole = isRecruiterRegistration ? Role.RECRUITER : Role.STUDENT;

        User user = new User();
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(persistedRole);
        user.setIsActive(false);
        user.setEmailVerified(false);

        User savedUser = userRepository.save(user);

        if (isRecruiterRegistration) {
            Company company = new Company();
            company.setUser(savedUser);
            company.setCompanyName(request.getCompanyName().trim());
            company.setIsVerified(false);
            companyRepository.save(company);
        } else {
            Client client = new Client();
            client.setUser(savedUser);
            client.setFirstName(request.getFirstName().trim());
            client.setLastName(request.getLastName().trim());
            clientRepository.save(client);
        }

        createAndSendEmailVerificationToken(savedUser);

        return new UserSummaryResponse(
            savedUser.getId(),
            savedUser.getEmail(),
            savedUser.getFirstName(),
            savedUser.getLastName(),
            savedUser.getRole()
        );
    }

    @Transactional
    public EmailVerificationResponse requestEmailVerification(EmailVerificationRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase(Locale.ROOT);
        User user = userRepository.findByEmail(normalizedEmail)
            .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            return new EmailVerificationResponse("Email already verified", null, null);
        }

        return createAndSendEmailVerificationToken(user);
    }

    @Transactional
    public void confirmEmailVerification(EmailVerificationConfirmRequest request) {
        String tokenHash = hashToken(request.getToken().trim());
        EmailVerificationToken token = emailVerificationTokenRepository
            .findByTokenHashAndUsedAtIsNullAndExpiresAtAfter(tokenHash, Instant.now())
            .orElseThrow(() -> new IllegalArgumentException("Invalid or expired verification token"));

        User user = token.getUser();
        user.setEmailVerified(true);
        user.setEmailVerifiedAt(Instant.now());
        user.setIsActive(true);
        userRepository.save(user);

        token.setUsedAt(Instant.now());
        emailVerificationTokenRepository.save(token);
    }

    @Transactional
    public PasswordResetResponse requestPasswordReset(PasswordResetRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase(Locale.ROOT);
        Optional<User> userOptional = userRepository.findByEmail(normalizedEmail);

        if (userOptional.isEmpty()) {
            return new PasswordResetResponse(
                "If an account exists for this email, a reset token has been generated.",
                null,
                null
            );
        }

        User user = userOptional.get();
        passwordResetTokenRepository.deleteByUserAndUsedAtIsNull(user);

        String rawToken = UUID.randomUUID().toString().replace("-", "");
        Instant expiresAt = Instant.now().plus(30, ChronoUnit.MINUTES);

        PasswordResetToken token = new PasswordResetToken();
        token.setUser(user);
        token.setTokenHash(hashToken(rawToken));
        token.setExpiresAt(expiresAt);
        passwordResetTokenRepository.save(token);

        mailService.sendPasswordReset(user.getEmail(), rawToken);

        return new PasswordResetResponse(
            mailService.isMailConfigured()
                ? "If an account exists for this email, a reset link has been sent."
                : "If an account exists for this email, a reset token has been generated.",
            mailService.isMailConfigured() ? null : rawToken,
            expiresAt
        );
    }

    @Transactional
    public void resetPassword(PasswordResetConfirmRequest request) {
        String tokenHash = hashToken(request.getToken().trim());
        PasswordResetToken token = passwordResetTokenRepository
            .findByTokenHashAndUsedAtIsNullAndExpiresAtAfter(tokenHash, Instant.now())
            .orElseThrow(() -> new IllegalArgumentException("Invalid or expired reset token"));

        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        token.setUsedAt(Instant.now());
        passwordResetTokenRepository.save(token);
    }

    private EmailVerificationResponse createAndSendEmailVerificationToken(User user) {
        emailVerificationTokenRepository.deleteByUserAndUsedAtIsNull(user);

        String rawToken = UUID.randomUUID().toString().replace("-", "");
        Instant expiresAt = Instant.now().plus(24, ChronoUnit.HOURS);

        EmailVerificationToken token = new EmailVerificationToken();
        token.setUser(user);
        token.setTokenHash(hashToken(rawToken));
        token.setExpiresAt(expiresAt);
        emailVerificationTokenRepository.save(token);

        mailService.sendEmailVerification(user.getEmail(), rawToken);

        return new EmailVerificationResponse(
            mailService.isMailConfigured()
                ? "If an account exists for this email, a verification link has been sent."
                : "If an account exists for this email, a verification token has been generated.",
            mailService.isMailConfigured() ? null : rawToken,
            expiresAt
        );
    }

    private String hashToken(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hashed);
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException("SHA-256 algorithm is not available", ex);
        }
    }
}
