import { createClient } from '@supabase/supabase-js'

// Single Supabase client for the whole app. Every file that needs to talk to
// Supabase (auth, database, storage) should import `supabase` from here —
// never call createClient() anywhere else. See CLAUDE.md.
//
// The URL and anon key come from environment variables so real values never
// get committed to the repo. Copy .env.example to .env and fill them in
// locally; see README.md for where to find these values in your Supabase
// project settings.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly and early rather than letting every Supabase call fail
  // with a confusing error later on.
  throw new Error(
    'Missing Supabase env vars. Copy .env.example to .env and fill in ' +
      'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see README.md).'
  )
}

// The anon key is safe to expose in frontend code as long as every table has
// a correct Row Level Security policy — it does not bypass RLS. Never put the
// service_role key here; that one belongs only in Supabase Edge Functions.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
