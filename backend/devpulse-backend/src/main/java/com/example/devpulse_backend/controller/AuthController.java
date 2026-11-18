package com.example.devpulse_backend.controller;

import com.example.devpulse_backend.model.User;
import com.example.devpulse_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Route d'inscription : /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Vérifier si l'email existe déjà
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Cet email est déjà utilisé."));
        }

        // Sauvegarde de l'utilisateur (pense à encoder le mot de passe plus tard avec Spring Security)
        User savedUser = userRepository.save(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Utilisateur créé avec succès !");
        response.put("user", savedUser);
        
        return ResponseEntity.ok(response);
    }

    // Route de connexion : /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            
            Map<String, Object> response = new HashMap<>();
            // Pour l'instant, on renvoie un faux token de test pour valider le flux frontend/backend
            response.put("token", "fake-jwt-token-for-" + user.getEmail());
            response.put("user", user);

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(Map.of("message", "Email ou mot de passe incorrect."));
    }
}