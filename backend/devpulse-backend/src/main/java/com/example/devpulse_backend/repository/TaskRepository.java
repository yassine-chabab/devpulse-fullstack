package com.example.devpulse_backend.repository;

import com.example.devpulse_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Permet de récupérer toutes les tâches liées à un utilisateur spécifique via son username
    List<Task> findByUserUsername(String username);
}