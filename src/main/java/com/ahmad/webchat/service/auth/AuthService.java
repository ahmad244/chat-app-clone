package com.ahmad.webchat.service.auth;

import org.springframework.http.ResponseEntity;

import com.ahmad.webchat.dto.auth.AuthenticationRequestDTO;
import com.ahmad.webchat.dto.auth.RegisterUserDTO;
import com.ahmad.webchat.dto.common.ResponseDTO;
import com.ahmad.webchat.entity.User;

import reactor.core.publisher.Mono;

public interface AuthService {

    public Mono<ResponseDTO<User>> registerUser(RegisterUserDTO user);

    public Mono<ResponseEntity<ResponseDTO<?>>> loginUser(AuthenticationRequestDTO user);

    public ResponseDTO<Boolean> logoutUser();
}
