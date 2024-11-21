package com.ahmad.webchat.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;


import com.ahmad.webchat.entity.User;

import jakarta.transaction.Transactional;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveCrudRepository<User, Long> {

    Mono<User> findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO user_contacts (user_id, user_contact_id) VALUES (:userId, :contactId)", nativeQuery = true)
    void addContact(Long userId, Long contactId);

}
