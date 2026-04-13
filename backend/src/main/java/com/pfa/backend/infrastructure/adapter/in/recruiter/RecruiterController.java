package com.pfa.backend.infrastructure.adapter.in.recruiter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/recruiters")
public class RecruiterController {

    @GetMapping("/ping")
    public Map<String, Object> ping() {
        return Map.of(
            "module", "recruiters",
            "status", "ok",
            "timestamp", Instant.now().toString()
        );
    }
}
