package com.ahmad.webchat.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ahmad.webchat.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String string);

}
