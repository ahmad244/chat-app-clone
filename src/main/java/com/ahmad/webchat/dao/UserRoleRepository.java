package com.ahmad.webchat.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ahmad.webchat.entity.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

}
