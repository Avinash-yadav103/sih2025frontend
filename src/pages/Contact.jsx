import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

const Contact = () => (
  <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 8 }}>
    <Container maxWidth="sm">
      <Typography variant="h3" sx={{ color: '#003380', fontWeight: 'bold', mb: 2 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Ministry of Tourism, North Eastern Region</strong><br />
        Government of India<br />
        Email: <a href="mailto:info@netourism.gov.in" style={{ color: '#003380', textDecoration: 'none' }}>info@netourism.gov.in</a><br />
        Phone: <a href="tel:+91-XXXXXXXXXX" style={{ color: '#003380', textDecoration: 'none' }}>+91-XXXXXXXXXX</a>
      </Typography>
      <Button variant="contained" sx={{ bgcolor: '#ffcc00', color: '#003380', fontWeight: 'bold', borderRadius: '6px' }}>
        Feedback / Suggestion
      </Button>
    </Container>
  </Box>
);

export default Contact;