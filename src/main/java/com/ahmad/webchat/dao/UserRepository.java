package com.ahmad.webchat.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.ahmad.webchat.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

}
