import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://qdxqqndmsashyeniycud.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeHFxbmRtc2FzaHllbml5Y3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMjQ3NDAsImV4cCI6MjA5NjcwMDc0MH0.DqDl7cffh4Pgo8_wR6exJSRE_bVxA5ohP07jrVwUqgk'
);