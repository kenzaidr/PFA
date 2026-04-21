package com.pfa.backend.application.dto.auth;

import jakarta.validation.constraints.NotBlank;

public class EmailVerificationConfirmRequest {

    @NotBlank(message = "Token is required")
    private String token;

    public EmailVerificationConfirmRequest() {
    }

    public EmailVerificationConfirmRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}