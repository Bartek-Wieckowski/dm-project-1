import { createClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';

const supabaseURL = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseURL || !supabaseAnonKey) {
  throw new Error('Brak wymaganych zmiennych środowiskowych.');
}

export const supabase = createClient<Database>(supabaseURL, supabaseAnonKey);
