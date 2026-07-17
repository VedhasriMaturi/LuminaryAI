import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a client instance, allowing empty values for mock fallback
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-anon-key'
);

// Helper check to verify if Supabase credentials are configured
export const isSupabaseConfigured = () => {
  return (
    !!import.meta.env.VITE_SUPABASE_URL && 
    !!import.meta.env.VITE_SUPABASE_ANON_KEY &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://your-project-id.supabase.co'
  );
};
