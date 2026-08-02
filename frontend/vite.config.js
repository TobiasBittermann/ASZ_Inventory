import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/members" : "http://localhost:8080",
      "/drinks" : "http://localhost:8080",
      "/bwbookings" : "http://localhost:8080",
      "/bwdeposits" : "http://localhost:8080",
    }
  }
})
