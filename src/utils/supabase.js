import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are properly set
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Supabase credentials not found in environment variables. " +
    "Please check your .env file and make sure VITE_SUPABASE_URL and " +
    "VITE_SUPABASE_ANON_KEY are set correctly."
  );
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// Test the connection and permissions
export const testConnection = async () => {
  try {
    // Try to fetch a single row from the Zones table
    const { data, error } = await supabase
      .from('Zones')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error("Supabase connection test failed:", error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (e) {
    console.error("Failed to test Supabase connection:", e);
    return { success: false, error: e };
  }
};

export default supabase;