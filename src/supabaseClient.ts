import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://icwqswomnvcxzrrnlglp.supabase.co" 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljd3Fzd29tbnZjeHpycm5sZ2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MjczMDUsImV4cCI6MjA2NDQwMzMwNX0.6_6mFc_nVn7ajzCgGE_ci0mSm7USF3YHAO_rL-6kDSY" 

export const supabase = createClient(supabaseUrl, supabaseKey)
