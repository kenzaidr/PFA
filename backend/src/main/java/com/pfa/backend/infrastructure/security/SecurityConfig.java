package com.pfa.backend.infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/v1/auth/register",
                    "/api/v1/auth/register/",
                    "/api/v1/auth/email-verification/request",
                    "/api/v1/auth/email-verification/request/",
                    "/api/v1/auth/email-verification/confirm",
                    "/api/v1/auth/email-verification/confirm/",
                    "/api/v1/auth/password-reset/request",
                    "/api/v1/auth/password-reset/request/",
                    "/api/v1/auth/password-reset/confirm",
                    "/api/v1/auth/password-reset/confirm/"
                ).permitAll()
                .requestMatchers(
                    "/api/health",
                    "/api/v1/auth/ping",
                    "/api/v1/auth/register",
                    "/api/v1/auth/register/",
                    "/api/v1/auth/email-verification/request",
                    "/api/v1/auth/email-verification/request/",
                    "/api/v1/auth/email-verification/confirm",
                    "/api/v1/auth/email-verification/confirm/",
                    "/api/v1/auth/password-reset/request",
                    "/api/v1/auth/password-reset/request/",
                    "/api/v1/auth/password-reset/confirm",
                    "/api/v1/auth/password-reset/confirm/",
                    "/api/v1/students/ping",
                    "/api/v1/recruiters/ping",
                    "/api/v1/admin/ping",
                    "/error"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(form -> form.disable());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
