package com.pfa.backend.application.dto.auth;

import java.time.Instant;

public class PasswordResetResponse {

    private String message;
    private String resetToken;
    private Instant expiresAt;

    public PasswordResetResponse() {
    }

    public PasswordResetResponse(String message, String resetToken, Instant expiresAt) {
        this.message = message;
        this.resetToken = resetToken;
        this.expiresAt = expiresAt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }
}