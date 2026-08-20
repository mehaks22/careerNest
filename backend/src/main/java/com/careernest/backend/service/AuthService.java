package com.careernest.backend.service;

import com.careernest.backend.dto.LoginRequest;
import com.careernest.backend.dto.LoginResponse;
import com.careernest.backend.model.Role;
import com.careernest.backend.model.User;
import com.careernest.backend.repository.UserRepository;
import com.careernest.backend.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder,JwtTokenProvider tokenProvider){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.tokenProvider=tokenProvider;
    }

    public User register(User user,String role){
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.valueOf(role.toUpperCase()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setActive(true);

        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request){
        Optional<User> user= userRepository.findByEmail(request.getEmail());
        if(user.isEmpty() || !passwordEncoder.matches(request.getPassword(),user.get().getPassword())){
            throw new RuntimeException("Invalid email or password");
        }

        User foundUser = user.get();
        String token = tokenProvider.generateToken(foundUser.getEmail(),foundUser.getId());

        return new LoginResponse(token,foundUser.getId(),foundUser.getEmail(),foundUser.getRole().toString());

    }
}
