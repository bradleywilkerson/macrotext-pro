import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nuckvngjmuxagbnkubgn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Y2t2bmdqbXV4YWdibmt1YmduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTEwNzcsImV4cCI6MjA1ODQyNzA3N30.oIv8bTNeeDH6ZF3R_hzjfHq8YmticWyMPPI6pXc5sUY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 