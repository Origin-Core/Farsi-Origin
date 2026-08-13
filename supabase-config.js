import { createClient } from 
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const SUPABASE_URL = "YOUR_SUPABASE_URL";

const SUPABASE_KEY = "YOUR_ANON_PUBLIC_KEY";


export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
