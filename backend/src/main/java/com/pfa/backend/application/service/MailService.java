package com.pfa.backend.application.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.ObjectProvider;

@Service
public class MailService {

    private final ObjectProvider<JavaMailSender> mailSenderProvider;
    private final String fromAddress;
    private final String frontendBaseUrl;

    public MailService(
        ObjectProvider<JavaMailSender> mailSenderProvider,
        @Value("${app.mail.from:}") String fromAddress,
        @Value("${app.frontend-base-url:http://localhost:5173}") String frontendBaseUrl
    ) {
        this.mailSenderProvider = mailSenderProvider;
        this.fromAddress = fromAddress;
        this.frontendBaseUrl = frontendBaseUrl;
    }

    public boolean isMailConfigured() {
        return fromAddress != null && !fromAddress.trim().isEmpty() && mailSenderProvider.getIfAvailable() != null;
    }

    public void sendEmailVerification(String to, String token) {
        if (!isMailConfigured()) {
            return;
        }

        String link = frontendBaseUrl + "/verify-email?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(to);
        message.setSubject("Verify your email address");
        message.setText("Please verify your email by opening this link:\n" + link);
        mailSenderProvider.getObject().send(message);
    }

    public void sendPasswordReset(String to, String token) {
        if (!isMailConfigured()) {
            return;
        }

        String link = frontendBaseUrl + "/reset-password?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(to);
        message.setSubject("Reset your password");
        message.setText("You can reset your password using this link:\n" + link);
        mailSenderProvider.getObject().send(message);
    }
}