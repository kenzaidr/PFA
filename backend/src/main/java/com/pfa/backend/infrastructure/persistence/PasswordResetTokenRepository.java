package com.pfa.backend.infrastructure.persistence;

import com.pfa.backend.domain.model.PasswordResetToken;
import com.pfa.backend.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByTokenHashAndUsedAtIsNullAndExpiresAtAfter(String tokenHash, Instant now);

    void deleteByUserAndUsedAtIsNull(User user);
}