import { createClient } 
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const SUPABASE_URL =
"https://sfypfvyjoszrsigkwrsf.supabase.co";


const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmeXBmdnlqb3N6cnNpZ2t3cnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MzkxNzIsImV4cCI6MjEwMjIxNTE3Mn0.1iuTJRhwb5vgX48yMjjJrQL4pVf1XaA6BdESdaTNKLU";


export const supabase =
createClient(
SUPABASE_URL,
SUPABASE_KEY
);
