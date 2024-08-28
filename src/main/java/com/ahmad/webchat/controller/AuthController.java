package com.ahmad.webchat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ahmad.webchat.dto.auth.AuthenticationRequestDTO;
import com.ahmad.webchat.dto.auth.RegisterUserDTO;
import com.ahmad.webchat.dto.common.ResponseDTO;
import com.ahmad.webchat.entity.User;
import com.ahmad.webchat.service.auth.AuthService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService AuthService;

    @Autowired
    public AuthController(AuthService AuthService) {
        this.AuthService = AuthService;
    }

    @PostMapping("/register")
    public ResponseDTO<User> register(@RequestBody RegisterUserDTO user) {
        return AuthService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequestDTO user) throws Exception {
        return AuthService.loginUser(user);
    }

}
