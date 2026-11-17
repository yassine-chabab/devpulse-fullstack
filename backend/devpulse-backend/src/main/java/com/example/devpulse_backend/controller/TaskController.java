package com.example.devpulse_backend.controller;

import com.example.devpulse_backend.model.Task;
import com.example.devpulse_backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Récupérer toutes les tâches (GET)
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Créer une tâche (POST) - Avec capture d'erreur pour voir la cause exacte dans Postman
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        try {
            Task savedTask = taskRepository.save(task);
            return ResponseEntity.ok(savedTask);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("ERREUR EXACTE : " + e.getMessage());
        }
    }
    // Mettre à jour une tâche (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id)
            .map(task -> {
                task.setTitle(taskDetails.getTitle());
                task.setCompleted(taskDetails.getCompleted());
                Task updatedTask = taskRepository.save(task);
                return ResponseEntity.ok(updatedTask);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // Supprimer une tâche (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        return taskRepository.findById(id)
            .map(task -> {
                taskRepository.delete(task);
                return ResponseEntity.ok().body("Tâche supprimée avec succès");
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
