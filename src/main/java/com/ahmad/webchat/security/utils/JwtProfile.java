package com.ahmad.webchat.security.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.ahmad.webchat.entity.User;
import com.ahmad.webchat.security.MyUserDetails;

public class JwtProfile {

    public static User get() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((MyUserDetails) authentication.getPrincipal()).getUser();
    }
}
