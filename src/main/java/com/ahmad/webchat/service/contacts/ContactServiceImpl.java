package com.ahmad.webchat.service.contacts;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ahmad.webchat.dao.UserRepository;
import com.ahmad.webchat.dto.common.ResponseDTO;
import com.ahmad.webchat.dto.common.ResponseMessageDTO;
import com.ahmad.webchat.dto.common.UserDTO;
import com.ahmad.webchat.entity.User;
import com.ahmad.webchat.exception.UserNotFoundException;
import com.ahmad.webchat.security.utils.JwtProfile;

@Service
public class ContactServiceImpl implements ContactService {

    UserRepository userRepository;

    @Autowired
    public ContactServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public ResponseDTO<?> addContact(long userId) {
        User contactUser = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFoundException("User not found"));

        User user = JwtProfile.get();

        if (user.getId().equals(contactUser.getId())) {
            return ResponseDTO.builder().message(
                    ResponseMessageDTO.builder().code(HttpStatus.BAD_REQUEST.toString())
                            .message("You can't add yourself")
                            .build())
                    .build();
        }

        userRepository.addContact(user.getId(), contactUser.getId());

        return ResponseDTO.builder().message(
                ResponseMessageDTO.builder().code(HttpStatus.CREATED.toString()).message("user added successfully")
                        .build())
                .build();
    }

    @Override
    public ResponseDTO<Set<UserDTO>> getContacts() {
        User user = JwtProfile.get();
        Set<UserDTO> contactDTOs = userRepository.findById(user.getId()).get().getContacts().stream()
                .map(contact -> UserDTO.builder()
                        .id(contact.getId())
                        .firstName(contact.getFirstName())
                        .lastName(contact.getLastName())
                        .email(contact.getEmail()).build()

                )
                .collect(Collectors.toSet());

        return ResponseDTO.<Set<UserDTO>>builder().data(contactDTOs).build();
    }

}
