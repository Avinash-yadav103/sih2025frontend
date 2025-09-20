import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Divider,
  CircularProgress
} from '@mui/material';
import './Search.css';

const SearchResults = ({ results, loading, onResultSelect }) => {
  // Group results by category
  const groupedResults = results.reduce((acc, result) => {
    const category = result.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {});

  // Get category display names
  const getCategoryName = (category) => {
    switch (category) {
      case 'place': return 'Places';
      case 'tourist': return 'Tourists';
      case 'incident': return 'Incidents';
      case 'unit': return 'Police Units';
      case 'iot': return 'IoT Devices';
      default: return 'Other';
    }
  };

  if (loading) {
    return (
      <Box className="search-results loading">
        <Box className="search-loading-container">
          <CircularProgress size={24} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Searching...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box className="search-results empty">
        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
          No results found
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="search-results">
      {Object.keys(groupedResults).map((category, index) => (
        <React.Fragment key={category}>
          <Typography className="search-category-header">
            {getCategoryName(category)}
          </Typography>
          <List dense disablePadding>
            {groupedResults[category].map((result) => (
              <ListItem 
                key={`${result.category}-${result.id}`}
                onClick={() => onResultSelect(result)}
                className="search-result-item"
                button
              >
                <span className="result-icon">{result.icon}</span>
                <ListItemText 
                  primary={result.title}
                  secondary={result.address} 
                />
              </ListItem>
            ))}
          </List>
          {index < Object.keys(groupedResults).length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default SearchResults;