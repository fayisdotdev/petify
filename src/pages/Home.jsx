import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { Link } from 'react-router-dom'

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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Pëtify</h1>
        <p><em>Premium Nutrition, Perfect Health</em></p>
      </header>

      <section style={{ backgroundColor: '#eef8ff', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>Special Combo Offers Available Now!</h2>
        <p>High protein, color-enhancing fish food combos tailored for Discus, Arowana, Cichlids, Flowerhorn, Oscar, Snakehead, and other carnivorous fish.</p>
        <Link to="/catalog">
          <button style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Shop Catalog
          </button>
        </Link>
      </section>

      <section>
        <h3>Why Choose Pëtify?</h3>
        <ul>
          <li><strong>High Protein:</strong> Supports healthy growth & vitality</li>
          <li><strong>Enhances Color:</strong> Brings out natural beauty</li>
          <li><strong>Easy Digestion:</strong> Supports healthy digestion & growth</li>
          <li><strong>Immune Support:</strong> Strengthens immune system naturally</li>
        </ul>
      </section>
    </div>
  )
}