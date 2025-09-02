import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    host: true,
    cors: {
      origin: [
        // 'https://s-exchange-backend.onrender.com',
        'http://localhost:8080'
      ],
      credentials: true
    },
    // allowedHosts: [
    //   's-exchange-backend.onrender.com',
    //   '.onrender.com',
      
    // ]
  }
})
