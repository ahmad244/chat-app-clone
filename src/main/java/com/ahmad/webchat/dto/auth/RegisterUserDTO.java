package com.ahmad.webchat.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDTO {
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;

}
