package com.ahmad.webchat.service;

import com.ahmad.webchat.dto.RegisterUserDTO;
import com.ahmad.webchat.entity.User;

public interface AuthService {

    public User registerUser(RegisterUserDTO user);

    public User loginUser(String username, String password);

    public Boolean logoutUser();
}
