package com.example.devpulse_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    
    // Autorise le frontend Vite/React
    configuration.setAllowedOrigins(List.of("http://localhost:5173"));
    
    // Autorise les méthodes HTTP (dont OPTIONS pour le preflight)
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    
    // Autorise les headers (notamment Authorization et Content-Type)
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    
    // Autorise l'envoi des credentials / cookies / tokens
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Désactivation du CSRF (Obligatoire pour les API REST stateless sans sessions/cookies)
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            
            // 2. Gestion des autorisations par URL
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().permitAll()
            );

        return http.build();
    }
}