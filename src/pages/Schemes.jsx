import React from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';

const schemes = [
  {
    title: "North East Special Infrastructure Development Scheme",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
    desc: "100% centrally funded scheme to fill infrastructural gaps in the region."
  },
  {
    title: "North East Industrial Development Scheme",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    desc: "Promoting industrialization and employment generation in the northeastern states."
  },
  {
    title: "Prime Minister's Development Package for NER",
    image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
    desc: "Special package for infrastructure and economic development."
  }
];

const Schemes = () => (
  <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 8 }}>
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ color: '#003380', fontWeight: 'bold', mb: 4 }}>
        Government Schemes for North East
      </Typography>
      <Grid container spacing={4}>
        {schemes.map(scheme => (
          <Grid item xs={12} md={4} key={scheme.title}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              height: '100%'
            }}>
              <CardMedia
                component="img"
                height="200"
                image={scheme.image}
                alt={scheme.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{scheme.title}</Typography>
                <Typography variant="body2">{scheme.desc}</Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#003380' }}>Learn More</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default Schemes;