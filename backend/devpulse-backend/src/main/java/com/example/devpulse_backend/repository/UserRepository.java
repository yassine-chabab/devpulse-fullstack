package com.example.devpulse_backend.repository;

import com.example.devpulse_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Méthode magique de Spring Data JPA : cherche un utilisateur par son nom d'utilisateur
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    // Vérifie si un utilisateur existe déjà (utile lors de l'inscription)
    Boolean existsByUsername(String username);
}