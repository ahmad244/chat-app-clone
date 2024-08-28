package com.ahmad.webchat.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ahmad.webchat.dto.common.ResponseDTO;
import com.ahmad.webchat.dto.common.UserDTO;
import com.ahmad.webchat.service.contacts.ContactService;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/all")
    public ResponseDTO<Set<UserDTO>> getAllContacts() {
        return contactService.getContacts();
    }

    @PostMapping("/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO<?> addContact(@PathVariable long userId) {
        return contactService.addContact(userId);
    }
}
