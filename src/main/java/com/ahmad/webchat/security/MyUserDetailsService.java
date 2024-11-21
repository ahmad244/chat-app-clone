package com.ahmad.webchat.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ahmad.webchat.dao.UserRepository;
import com.ahmad.webchat.entity.User;

import reactor.core.publisher.Mono;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .switchIfEmpty(Mono.error(new UsernameNotFoundException("User not found")));
        return new MyUserDetails(user);
    }
}
