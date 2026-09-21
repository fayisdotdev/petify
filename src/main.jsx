import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Companion to public/404.html: if that page redirected here because of a
// direct visit to a subpath (e.g. /petify/cart), restore the real URL before
// React Router mounts, so it renders the right page instead of Home.
const redirectPath = sessionStorage.getItem('petify-redirect-path')
if (redirectPath) {
  sessionStorage.removeItem('petify-redirect-path')
  window.history.replaceState(null, '', redirectPath)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
