import axios from 'axios';

// Crée une instance Axios avec l'URL de base de ton backend Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Modifie le port si ton Spring Boot tourne sur un autre port (ex: 8080)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur de requête : ajoute le token JWT (Bearer Token) si l'utilisateur est connecté
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;