package com.aps.sige.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aps.sige.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
