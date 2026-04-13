package com.pfa.backend.infrastructure.exception;

import java.time.Instant;
import java.util.Map;

public class ApiError {
    
    private Instant timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private Map<String, String> fieldErrors;

    // This is the constructor that your GlobalExceptionHandler is calling!
    public ApiError(Instant timestamp, int status, String error, String message, String path, Map<String, String> fieldErrors) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.fieldErrors = fieldErrors;
    }

    // Getters are required so Spring Boot can convert this object into JSON
    public Instant getTimestamp() { return timestamp; }
    public int getStatus() { return status; }
    public String getError() { return error; }
    public String getMessage() { return message; }
    public String getPath() { return path; }
    public Map<String, String> getFieldErrors() { return fieldErrors; }
    
    // (You can also generate Setters here if your project requires them, 
    // but they aren't strictly necessary just to return the error)
}