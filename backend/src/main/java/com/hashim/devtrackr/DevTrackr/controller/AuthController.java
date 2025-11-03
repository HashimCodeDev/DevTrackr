package com.hashim.devtrackr.DevTrackr.controller;

import com.hashim.devtrackr.DevTrackr.dto.AuthResponse;
import com.hashim.devtrackr.DevTrackr.dto.LoginRequest;
import com.hashim.devtrackr.DevTrackr.dto.RegisterRequest;
import com.hashim.devtrackr.DevTrackr.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        long startTime = System.currentTimeMillis();
        try {
            log.info("User registration attempt for email: {}", request.getEmail());
            AuthResponse response = authService.register(request);
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("User successfully registered with email: {} in {}ms", request.getEmail(), executionTime);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Registration failed for email {} after {}ms: {}", request.getEmail(), executionTime, e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        long startTime = System.currentTimeMillis();
        try {
            log.info("Login attempt for email: {}", request.getEmail());
            AuthResponse response = authService.login(request);
            long executionTime = System.currentTimeMillis() - startTime;
            log.info("User successfully logged in with email: {} in {}ms", request.getEmail(), executionTime);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            log.error("Login failed for email {} after {}ms: {}", request.getEmail(), executionTime, e.getMessage(), e);
            throw e;
        }
    }
}