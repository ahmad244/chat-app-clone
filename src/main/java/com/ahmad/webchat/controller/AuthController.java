package com.ahmad.webchat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ahmad.webchat.dto.AuthenticationRequestDTO;
import com.ahmad.webchat.dto.AuthenticationResponseDTO;
import com.ahmad.webchat.dto.RegisterUserDTO;
import com.ahmad.webchat.entity.User;
import com.ahmad.webchat.security.JwtUtil;
import com.ahmad.webchat.security.MyUserDetailsService;
import com.ahmad.webchat.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private MyUserDetailsService userDetailsService;

    private AuthService AuthService;

    @Autowired
    public AuthController(AuthService AuthService) {
        this.AuthService = AuthService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterUserDTO user) {
        return AuthService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody AuthenticationRequestDTO user) {
        return AuthService.loginUser(user.getUsername(), user.getPassword());
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequestDTO authenticationRequest)
            throws Exception {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(), authenticationRequest.getPassword()));

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(new AuthenticationResponseDTO(jwt));
    }

}
