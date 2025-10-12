import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Experiment {
  id: string;
  unit_number: number;
  experiment_number: number;
  title: string;
  question: string;
  description: string;
  solution_html: string;
  solution_css: string;
  solution_explanation: string;
  key_concepts: string[];
  difficulty_level: string;
  created_at: string;
  updated_at: string;
}
