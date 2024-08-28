package com.ahmad.webchat.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ahmad.webchat.dao.RoleRepository;
import com.ahmad.webchat.dao.UserRepository;
import com.ahmad.webchat.dao.UserRoleRepository;
import com.ahmad.webchat.dto.RegisterUserDTO;
import com.ahmad.webchat.entity.Role;
import com.ahmad.webchat.entity.User;
import com.ahmad.webchat.entity.UserRole;
import com.ahmad.webchat.exception.UserNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private UserRoleRepository userRoleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
            UserRoleRepository userRoleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public User registerUser(RegisterUserDTO user) {
        
        Role basicRole = roleRepository.findByName("BASIC_USER");

        Set<UserRole> userRoles = new HashSet<UserRole>();
        userRoles.add(UserRole.builder().role(basicRole).build());

        User tempUser = User.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .userRoles(userRoles).build();

        User savedUser = userRepository.save(tempUser);
        savedUser.getUserRoles().forEach(userRole -> {
            userRole.setUser(savedUser);
            userRoleRepository.save(userRole);
        });

        return savedUser;

    }

    @Override
    public User loginUser(String username, String password) {
     
        
        User dbUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("Invalid username or password"));
        if (passwordEncoder.matches(password, dbUser.getPassword())) {
            return dbUser;
        } else {
            throw new UserNotFoundException("Invalid username or password");
        }
    }

    @Override
    public Boolean logoutUser() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'logoutUser'");
    }

}
