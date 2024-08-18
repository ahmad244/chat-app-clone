package com.ahmad.webchat.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthenticationRequestDTO {
    private String username;
    private String password;
}

