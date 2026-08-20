package com.careernest.backend.controller;

import com.careernest.backend.dto.LoginRequest;
import com.careernest.backend.dto.LoginResponse;
import com.careernest.backend.model.User;
import com.careernest.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService=authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Fallback to JOB_SEEKER if role is not set
            String role = (user.getRole() != null) ? user.getRole().toString() : "JOB_SEEKER";
            User registeredUser = authService.register(user, role);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            String msg = (e.getMessage() != null) ? e.getMessage() : "Registration failed";
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", msg));
        }
    }


    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequest request){
        try{
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/test")
    public ResponseEntity<String> testCors() {
        return ResponseEntity.ok("CORS works!");
    }


}
