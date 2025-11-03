package com.hashim.devtrackr.DevTrackr.controller;

import com.hashim.devtrackr.DevTrackr.dto.AuthResponse;
import com.hashim.devtrackr.DevTrackr.dto.LoginRequest;
import com.hashim.devtrackr.DevTrackr.dto.RegisterRequest;
import com.hashim.devtrackr.DevTrackr.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}