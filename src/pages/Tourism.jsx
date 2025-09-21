import React from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';

const tourismCards = [
  {
    title: '🐅 Wildlife Sanctuaries of Assam',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    desc: 'Explore the famous Kaziranga National Park and other wildlife sanctuaries.'
  },
  {
    title: '🏔️ Scenic Mountains of Arunachal Pradesh',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    desc: 'Experience the breathtaking Himalayan landscapes and valleys.'
  },
  {
    title: '🎉 Cultural Festivals of Nagaland',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    desc: 'Join vibrant festivals like the Hornbill Festival and more.'
  },
  {
    title: '🏡 Traditional Villages of Meghalaya',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    desc: 'Visit living root bridges and unique village cultures.'
  }
];

const Tourism = () => (
  <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 8 }}>
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ color: '#003380', fontWeight: 'bold', mb: 4 }}>
        Discover North East Tourism
      </Typography>
      <Grid container spacing={3}>
        {tourismCards.map(card => (
          <Grid item xs={12} md={3} key={card.title}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              }
            }}>
              <CardMedia
                component="img"
                height="180"
                image={card.image}
                alt={card.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>{card.title}</Typography>
                <Typography variant="body2">{card.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default Tourism;