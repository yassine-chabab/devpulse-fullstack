package com.example.devpulse_backend.service;

import com.example.devpulse_backend.model.Task;
import com.example.devpulse_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    // Injection par constructeur : standard professionnel en Spring Boot
    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Récupère la liste de toutes les tâches stockées en base.
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Récupère une tâche spécifique par son ID.
     */
    public Task getTaskById(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        return optionalTask.orElse(null); 
        // En prod, on gère plutôt des exceptions personnalisées (ex: ResourceNotFoundException)
    }

    /**
     * Enregistre ou met à jour une tâche.
     * C'est ici que tu mettras plus tard tes règles métier (ex: valider le statut, lier au user connecté).
     */
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Supprime une tâche par son ID.
     */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}