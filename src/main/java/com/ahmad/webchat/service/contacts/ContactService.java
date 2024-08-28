package com.ahmad.webchat.service.contacts;

import java.util.Set;

import com.ahmad.webchat.dto.common.ResponseDTO;
import com.ahmad.webchat.dto.common.UserDTO;

public interface ContactService {

    public ResponseDTO<?> addContact(long UserId);

    public ResponseDTO<Set<UserDTO>> getContacts();

}
