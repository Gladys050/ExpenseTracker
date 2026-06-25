import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fgtrfvoekfajkaljuzht.supabase.co/rest/v1";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndHJmdm9la2ZhamthbGp1emh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MzI2ODYsImV4cCI6MjA5NjQwODY4Nn0.a7YiqhyhVtyu7vrBGzvKvvu3S5H6qiSnVKB8Ih9wQR8";

export const supabase = createClient(supabaseUrl, supabaseKey);
