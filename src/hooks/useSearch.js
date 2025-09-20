import { useState, useEffect, useCallback } from 'react';
import SearchService from '../services/SearchService';

function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [activeCategories, setActiveCategories] = useState(['place', 'tourist', 'incident', 'unit', 'iot']);

  // Debounce search to avoid too many API calls
  const debouncedSearch = useCallback(
    async (searchQuery) => {
      if (!searchQuery || searchQuery.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // Use mock data for development, replace with actual API call in production
        const searchResults = await SearchService.getMockSearchResults(searchQuery);
        // Filter results based on active categories
        const filteredResults = searchResults.filter(result => 
          activeCategories.includes(result.category)
        );
        
        setResults(filteredResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [activeCategories]
  );

  // Handle search query changes with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, debouncedSearch]);

  // Toggle category filters
  const toggleCategory = (category) => {
    setActiveCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSelectedResult(null);
  };

  return {
    query,
    setQuery,
    results,
    loading,
    selectedResult,
    setSelectedResult,
    activeCategories,
    toggleCategory,
    clearSearch,
  };
}

export default useSearch;