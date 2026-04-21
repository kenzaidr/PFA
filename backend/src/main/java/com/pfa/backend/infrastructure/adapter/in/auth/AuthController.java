package com.pfa.backend.infrastructure.adapter.in.auth;

import com.pfa.backend.application.dto.auth.EmailVerificationConfirmRequest;
import com.pfa.backend.application.dto.auth.EmailVerificationRequest;
import com.pfa.backend.application.dto.auth.EmailVerificationResponse;
import com.pfa.backend.application.dto.auth.RegisterRequest;
import com.pfa.backend.application.dto.auth.PasswordResetConfirmRequest;
import com.pfa.backend.application.dto.auth.PasswordResetRequest;
import com.pfa.backend.application.dto.auth.PasswordResetResponse;
import com.pfa.backend.application.dto.auth.UserSummaryResponse;
import com.pfa.backend.application.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/ping")
    public Map<String, Object> ping() {
        return Map.of(
            "module", "auth",
            "status", "ok",
            "timestamp", Instant.now().toString()
        );
    }

    @PostMapping("/register")
    public ResponseEntity<UserSummaryResponse> register(@Valid @RequestBody RegisterRequest request) {
        UserSummaryResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/email-verification/request")
    public ResponseEntity<EmailVerificationResponse> requestEmailVerification(@Valid @RequestBody EmailVerificationRequest request) {
        EmailVerificationResponse response = authService.requestEmailVerification(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/email-verification/confirm")
    public ResponseEntity<Map<String, String>> confirmEmailVerification(@Valid @RequestBody EmailVerificationConfirmRequest request) {
        authService.confirmEmailVerification(request);
        return ResponseEntity.ok(Map.of("message", "Email verified successfully"));
    }

    @PostMapping("/password-reset/request")
    public ResponseEntity<PasswordResetResponse> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        PasswordResetResponse response = authService.requestPasswordReset(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/password-reset/confirm")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody PasswordResetConfirmRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }
}
