import React, { useState, useRef } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  CircularProgress,
  ClickAwayListener
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';  // Optional for voice search
import SearchResults from './SearchResults';
import './Search.css';

const SearchBar = ({ 
  query, 
  setQuery, 
  results, 
  loading, 
  selectedResult, 
  setSelectedResult,
  clearSearch,
  onResultSelect
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  // Handle input focus
  const handleFocus = () => {
    setFocused(true);
  };

  // Handle result selection
  const handleResultSelect = (result) => {
    setSelectedResult(result);
    setQuery(result.title);
    setFocused(false);
    onResultSelect(result);
  };

  // Clear search input
  const handleClear = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  const handleClickAway = () => {
    setFocused(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="search-container">
        <Box className={`search-bar google-style ${focused ? 'focused' : ''}`}>
          <SearchIcon className="search-icon" />
          <TextField 
            inputRef={inputRef}
            fullWidth
            variant="standard"
            placeholder="Search places, tourists, incidents, units..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : query ? (
                    <IconButton 
                      size="small" 
                      onClick={handleClear}
                      className="clear-button"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton 
                      size="small" 
                      className="mic-button"
                      color="primary"
                    >
                      <MicIcon fontSize="small" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {/* Show search results when focused and we have results or are loading */}
        {focused && query && (
          <Box className="search-results-wrapper">
            <SearchResults 
              results={results} 
              loading={loading} 
              onResultSelect={handleResultSelect} 
            />
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;