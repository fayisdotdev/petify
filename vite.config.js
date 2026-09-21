import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Site is served at username.github.io/petify (a subpath, not domain root),
  // so asset URLs need this prefix or they'll 404 in production. If a custom
  // domain is added later (see README.md), change this back to '/'.
  base: '/petify/',
})
