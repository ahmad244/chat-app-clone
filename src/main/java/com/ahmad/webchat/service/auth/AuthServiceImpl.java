package com.ahmad.webchat.service.auth;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ahmad.webchat.dao.RoleRepository;
import com.ahmad.webchat.dao.UserRepository;
import com.ahmad.webchat.dto.auth.AuthenticationRequestDTO;
import com.ahmad.webchat.dto.auth.AuthenticationResponseDTO;
import com.ahmad.webchat.dto.auth.RegisterUserDTO;
import com.ahmad.webchat.dto.common.ResponseDTO;
import com.ahmad.webchat.dto.common.ResponseMessageDTO;
import com.ahmad.webchat.entity.Role;
import com.ahmad.webchat.entity.User;
import com.ahmad.webchat.entity.UserRole;
import com.ahmad.webchat.exception.UsernameAlreadyExistException;
import com.ahmad.webchat.security.JwtUtil;
import com.ahmad.webchat.security.MyUserDetailsService;

import jakarta.servlet.http.Cookie;
import jakarta.transaction.Transactional;
import reactor.core.publisher.Mono;

@Service
public class AuthServiceImpl implements AuthService {

        @Value("${jwt.expiration}")
        private long EXPIRATION;

        private UserRepository userRepository;
        private RoleRepository roleRepository;
        private PasswordEncoder passwordEncoder;

        private AuthenticationManager authenticationManager;
        private JwtUtil jwtTokenUtil;
        private MyUserDetailsService userDetailsService;

        @Autowired
        public AuthServiceImpl(
                        UserRepository userRepository,
                        RoleRepository roleRepository,
                        PasswordEncoder passwordEncoder,
                        AuthenticationManager authenticationManager,
                        JwtUtil jwtTokenUtil,
                        MyUserDetailsService userDetailsService) {
                this.userRepository = userRepository;
                this.roleRepository = roleRepository;
                this.passwordEncoder = passwordEncoder;
                this.authenticationManager = authenticationManager;
                this.jwtTokenUtil = jwtTokenUtil;
                this.userDetailsService = userDetailsService;
        }

        @Override
        @Transactional
        public Mono<ResponseDTO<User>> registerUser(RegisterUserDTO user) {
            return userRepository.findByUsername(user.getUsername())
                .flatMap(existingUser -> Mono.<ResponseDTO<User>>error(new UsernameAlreadyExistException("Username already exists")))
                .switchIfEmpty(
                    roleRepository.findByName("BASIC_USER")
                        .flatMap(basicRole -> {
                            User tempUser = User.builder()
                                .email(user.getEmail())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .username(user.getUsername())
                                .password(passwordEncoder.encode(user.getPassword()))
                                .enabled(true)
                                .build();
        
                            UserRole userRole = UserRole.builder()
                                .role(basicRole)
                                .user(tempUser)
                                .build();
        
                            tempUser.setUserRoles(Set.of(userRole));
        
                            return userRepository.save(tempUser)
                                .map(savedUser -> ResponseDTO.<User>builder().data(savedUser).build());
                        })
                );
        }
        
        

        @Override
        public Mono<ResponseEntity<ResponseDTO<?>>> loginUser(AuthenticationRequestDTO user) {
            return Mono.fromCallable(() -> 
                    authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()))
                )
                .flatMap(authResult -> userDetailsService.loadUserByUsername(user.getUsername()))
                .flatMap(userDetails -> {
                    // Generate JWT token
                    String jwt = jwtTokenUtil.generateToken(userDetails.getUsername());
        
                    // Create the cookie
                    Cookie cookie = new Cookie("jwt", jwt);
                    cookie.setMaxAge((int) EXPIRATION);
                    cookie.setSecure(true);
                    cookie.setHttpOnly(true);
                    cookie.setPath("/");
        
                    // Manually format the Set-Cookie header
                    String cookieHeader = String.format(
                        "%s=%s; HttpOnly; Secure; Path=%s; Max-Age=%d",
                        cookie.getName(), cookie.getValue(), cookie.getPath(), cookie.getMaxAge());
        
                    // Create the response DTO
                    ResponseDTO<AuthenticationResponseDTO> response = ResponseDTO
                        .<AuthenticationResponseDTO>builder()
                        .data(new AuthenticationResponseDTO(jwt))
                        .build();
        
                    // Return the ResponseEntity
                    return Mono.just(
                        ResponseEntity.ok()
                            .header("Set-Cookie", cookieHeader)
                            .body(response)
                    );
                })
                .onErrorResume(AuthenticationException.class, e -> {
                    // Handle authentication error
                    ResponseDTO<String> response = ResponseDTO.<String>builder()
                        .message(ResponseMessageDTO.builder()
                            .code(HttpStatus.UNAUTHORIZED.toString())
                            .message("Invalid username or password")
                            .build())
                        .build();
        
                    return Mono.just(new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED));
                });
        }
        

        @Override
        public ResponseDTO<Boolean> logoutUser() {
                // TODO Auto-generated method stub
                throw new UnsupportedOperationException("Unimplemented method 'logoutUser'");
        }

}
