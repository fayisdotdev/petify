import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

// TEMPORARY: this connectivity check exists only to confirm supabaseClient.js
// is wired up correctly. Remove it once Phase 1 creates real tables and the
// Catalog page is pulling real data — see TASKS.md.
function SupabaseConnectionCheck() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    // auth.getSession() doesn't need any tables to exist yet — it just
    // confirms the client can reach the Supabase project with the URL/key
    // from .env.
    supabase.auth
      .getSession()
      .then(({ error }) => {
        setStatus(error ? `error: ${error.message}` : 'connected ✅')
      })
      .catch((err) => setStatus(`error: ${err.message}`))
  }, [])

  return <p>Supabase connection: {status}</p>
}

export default function Home() {
  return (
    <div>
      <h1>Petify</h1>
      <p>Home page placeholder.</p>
      <SupabaseConnectionCheck />
    </div>
  )
}
