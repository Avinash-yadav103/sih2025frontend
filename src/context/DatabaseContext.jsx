import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, testConnection } from '../utils/supabase.js';

// Create the context
const DatabaseContext = createContext({
  isConnected: false,
  isLoading: true,
  error: null,
  retry: () => {}
});

// Create a provider component
export const DatabaseProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      const { success, error } = await testConnection();
      setIsConnected(success);
      setError(error || null);
    } catch (err) {
      setIsConnected(false);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check connection when the component mounts
  useEffect(() => {
    checkConnection();
  }, []);

  // Create the value for the context
  const contextValue = {
    isConnected,
    isLoading,
    error,
    retry: checkConnection
  };

  return (
    <DatabaseContext.Provider value={contextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Create a custom hook for using the context
export const useDatabase = () => useContext(DatabaseContext);

export default DatabaseContext;