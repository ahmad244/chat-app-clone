package com.ahmad.webchat.dao;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.ahmad.webchat.entity.UserRole;

public interface UserRoleRepository extends ReactiveCrudRepository<UserRole, Long> {

}
