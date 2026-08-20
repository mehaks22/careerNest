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
    public ResponseEntity<?> register(
            @RequestBody Map<String, Object> payload,
            @RequestParam(required = false, defaultValue = "JOB_SEEKER") String role) {
        try {
            // Log to Railway console so you can see exact incoming data
            System.out.println("Received register payload: " + payload);

            // Convert map or extract fields as needed
            // User registeredUser = authService.register(...);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
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
