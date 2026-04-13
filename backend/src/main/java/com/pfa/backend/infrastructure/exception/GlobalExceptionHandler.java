package com.pfa.backend.infrastructure.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import jakarta.servlet.http.HttpServletRequest;

import java.time.Instant;
import java.util.HashMap;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // This tells Spring Boot: "If ANY function throws an IllegalArgumentException, run this code."
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleBadArguments(IllegalArgumentException ex, HttpServletRequest request) {
        
        // 1. Create your standardized ApiError (The Apology Card)
        ApiError errorResponse = new ApiError(
            Instant.now(),                                // Exact time right now
            HttpStatus.BAD_REQUEST.value(),               // 400
            HttpStatus.BAD_REQUEST.getReasonPhrase(),     // "Bad Request"
            ex.getMessage(),                              // The specific error message from your function
            request.getRequestURI(),                      // The URL the user was trying to access
            new HashMap<>()                               // Empty map for now (no specific field errors)
        );

        // 2. Send it back to the frontend
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}