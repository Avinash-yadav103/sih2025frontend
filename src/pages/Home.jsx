import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Home = () => (
  <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 8 }}>
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ color: '#003380', fontWeight: 'bold', mb: 2 }}>
        Welcome to North Eastern Tourism Portal
      </Typography>
      <Typography variant="h6" sx={{ color: '#555', mb: 4 }}>
        Explore the beauty, culture, and diversity of North East India.
      </Typography>
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
        alt="North East India"
        style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
      />
    </Container>
  </Box>
);

export default Home;