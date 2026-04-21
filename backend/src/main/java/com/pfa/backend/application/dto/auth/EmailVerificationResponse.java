package com.pfa.backend.application.dto.auth;

import java.time.Instant;

public class EmailVerificationResponse {

    private String message;
    private String verificationToken;
    private Instant expiresAt;

    public EmailVerificationResponse() {
    }

    public EmailVerificationResponse(String message, String verificationToken, Instant expiresAt) {
        this.message = message;
        this.verificationToken = verificationToken;
        this.expiresAt = expiresAt;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }
}