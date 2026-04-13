package com.pfa.backend.application.dto.auth;

public class LoginResponse {

    private String token;
    private UserSummaryResponse user;

    public LoginResponse() {
    }

    public LoginResponse(String token, UserSummaryResponse user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserSummaryResponse getUser() {
        return user;
    }

    public void setUser(UserSummaryResponse user) {
        this.user = user;
    }
}
