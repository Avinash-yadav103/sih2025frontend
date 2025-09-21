import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const AboutUs = () => (
  <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 8 }}>
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ color: '#003380', fontWeight: 'bold', mb: 2 }}>
        About Us
      </Typography>
      <Typography variant="body1" sx={{ color: '#333', mb: 2 }}>
        The North Eastern Tourism Portal is an initiative by the Ministry of Tourism, Government of India, to promote the rich heritage, culture, and natural beauty of the North Eastern Region. Our mission is to provide tourists and stakeholders with authentic information, resources, and support for a memorable experience.
      </Typography>
      <Typography variant="body1" sx={{ color: '#333' }}>
        Discover the unexplored, connect with local communities, and experience the vibrant festivals, wildlife, and landscapes of North East India.
      </Typography>
    </Container>
  </Box>
);

export default AboutUs;