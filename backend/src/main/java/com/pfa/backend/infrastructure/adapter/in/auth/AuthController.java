package com.pfa.backend.infrastructure.adapter.in.auth;

import com.pfa.backend.application.dto.auth.RegisterRequest;
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
}
