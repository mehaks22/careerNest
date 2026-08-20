package com.careernest.backend.repository;

import com.careernest.backend.model.Role;
import com.careernest.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);
    // Count users using the Role enum
    long countByRole(Role role);
}
