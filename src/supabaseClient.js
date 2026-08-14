import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment or default demo fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-meetingroom.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY3MjUxMjAwMCwiZXhwIjoyMDA4MDg4MDAwfQ.demo_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
