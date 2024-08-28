package com.ahmad.webchat.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

import com.ahmad.webchat.entity.User;

import jakarta.transaction.Transactional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO user_contacts (user_id, user_contact_id) VALUES (:userId, :contactId)", nativeQuery = true)
    void addContact(Long userId, Long contactId);

}
