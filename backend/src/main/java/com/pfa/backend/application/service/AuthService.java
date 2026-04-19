package com.pfa.backend.application.service;

import com.pfa.backend.application.dto.auth.RegisterRequest;
import com.pfa.backend.application.dto.auth.UserSummaryResponse;
import com.pfa.backend.domain.enums.Role;
import com.pfa.backend.domain.model.Client;
import com.pfa.backend.domain.model.User;
import com.pfa.backend.infrastructure.persistence.ClientRepository;
import com.pfa.backend.infrastructure.persistence.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, ClientRepository clientRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserSummaryResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase(Locale.ROOT);
        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        Role role = request.getRole();
        if (role != Role.CLIENT && role != Role.STUDENT) {
            throw new IllegalArgumentException("This endpoint only supports student registration");
        }
        Role persistedRole = Role.STUDENT;

        User user = new User();
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(persistedRole);
        user.setIsActive(true);

        User savedUser = userRepository.save(user);

        Client client = new Client();
        client.setUser(savedUser);
        client.setFirstName(request.getFirstName().trim());
        client.setLastName(request.getLastName().trim());
        clientRepository.save(client);

        return new UserSummaryResponse(
            savedUser.getId(),
            savedUser.getEmail(),
            savedUser.getFirstName(),
            savedUser.getLastName(),
            savedUser.getRole()
        );
    }
}
