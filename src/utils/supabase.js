import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your_fallback_supabase_url';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_fallback_anon_key';

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Tests the connection to Supabase
 * @returns {Promise<Object>} Connection status and info
 */
export const testConnection = async () => {
  try {
    // Simple query to check if the connection works
    const { data, error } = await supabase.from('health_check').select('*').limit(1);
    
    if (error) throw error;
    
    return {
      success: true,
      message: 'Successfully connected to Supabase',
      timestamp: new Date().toISOString(),
      database: supabaseUrl
    };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    
    return {
      success: false,
      message: error.message || 'Failed to connect to Supabase',
      timestamp: new Date().toISOString(),
      error: error.toString()
    };
  }
};

// Other exports
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data?.user || null;
};

// Make the Supabase client available as both named and default export
export { supabase };
export default supabase;