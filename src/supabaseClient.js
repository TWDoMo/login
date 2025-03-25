// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://spabadsobzyzsqcfqmdi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwYWJhZHNvYnp5enNxY2ZxbWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDExNjgsImV4cCI6MjA1ODQ3NzE2OH0.C00eHFBQzJ7oGgS228zcGWs3BIUViPknoVpKCNupjIA";
export const supabase = createClient(supabaseUrl, supabaseKey);
