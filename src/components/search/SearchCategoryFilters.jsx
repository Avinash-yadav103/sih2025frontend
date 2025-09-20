import React from 'react';
import { Box, Button } from '@mui/material';
import './Search.css';

const SearchCategoryFilters = ({ activeCategories, toggleCategory }) => {
  const categories = [
    { id: 'place', label: 'Places', icon: '📍' },
    { id: 'tourist', label: 'Tourists', icon: '👤' },
    { id: 'incident', label: 'Incidents', icon: '🚨' },
    { id: 'unit', label: 'Units', icon: '🚔' },
    { id: 'iot', label: 'IoT Devices', icon: '📱' },
  ];

  return (
    <Box className="search-category-filters">
      {categories.map((category) => (
        <Button
          key={category.id}
          className={activeCategories.includes(category.id) ? 'active' : ''}
          onClick={() => toggleCategory(category.id)}
        >
          <span className="icon">{category.icon}</span> {category.label}
        </Button>
      ))}
    </Box>
  );
};

export default SearchCategoryFilters;