package com.pfa.backend.infrastructure.persistence;

import com.pfa.backend.domain.model.EmailVerificationToken;
import com.pfa.backend.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {

    Optional<EmailVerificationToken> findByTokenHashAndUsedAtIsNullAndExpiresAtAfter(String tokenHash, Instant now);

    void deleteByUserAndUsedAtIsNull(User user);
}