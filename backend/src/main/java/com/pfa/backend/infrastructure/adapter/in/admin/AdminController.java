package com.pfa.backend.infrastructure.adapter.in.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @GetMapping("/ping")
    public Map<String, Object> ping() {
        return Map.of(
            "module", "admin",
            "status", "ok",
            "timestamp", Instant.now().toString()
        );
    }
}
