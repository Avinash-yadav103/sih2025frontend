import React from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia } from '@mui/material';

const galleryImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80"
];

const Gallery = () => (
  <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 8 }}>
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ color: '#003380', fontWeight: 'bold', mb: 4 }}>
        Gallery
      </Typography>
      <Grid container spacing={3}>
        {galleryImages.map((img, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <CardMedia
                component="img"
                height="200"
                image={img}
                alt={`Gallery ${idx + 1}`}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default Gallery;