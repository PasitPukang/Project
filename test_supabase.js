import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vvxxvetiydnxlokncwun.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2eHh2ZXRpeWRueGxva25jd3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MDc4ODYsImV4cCI6MjEwMjI4Mzg4Nn0.BtGFVhWjbCeHdF0jISq9yrvtpzblB8M-sC14owMnsEE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data: rooms, error: roomsErr } = await supabase.from('rooms').select('*');
  console.log('ROOMS:', rooms, 'ERROR:', roomsErr);

  const { data: bookings, error: bookingsErr } = await supabase.from('bookings').select('*');
  console.log('BOOKINGS:', bookings, 'ERROR:', bookingsErr);
}

check();
