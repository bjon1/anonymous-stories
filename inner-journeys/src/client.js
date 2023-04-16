import { createClient } from '@supabase/supabase-js'

const URL = 'https://ddyxcdmtkmsudktqhjhj.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkeXhjZG10a21zdWRrdHFoamhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2NjQwNDEsImV4cCI6MTk5NzI0MDA0MX0.eLyM3Nx5ZvWYZeK6KxWWJvR11PU10SuSIHiQTPitKlI'

export const supabase = createClient(URL, API_KEY);