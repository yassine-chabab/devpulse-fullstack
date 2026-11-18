import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
   // Force Vite à échouer si le port 5173 est pris, au lieu d'en prendre un autre au hasard
  },
})