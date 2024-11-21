package com.ahmad.webchat.dao;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.ahmad.webchat.entity.Role;

import reactor.core.publisher.Mono;

public interface RoleRepository extends ReactiveCrudRepository<Role, Long> {

    Mono<Role> findByName(String string);

}
