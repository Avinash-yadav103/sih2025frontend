import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';

const Home = () => {
  const highlights = [
    {
      title: "Rich Cultural Heritage",
      description: "Experience diverse tribal cultures, traditional festivals, and ancient customs.",
      icon: "🎭",
      color: "#00497A"
    },
    {
      title: "Pristine Natural Beauty",
      description: "Explore untouched forests, majestic mountains, and crystal clear rivers.",
      icon: "🏔️",
      color: "#FF9800"
    },
    {
      title: "Unique Wildlife",
      description: "Discover rare species including one-horned rhinoceros and red pandas.",
      icon: "🦏",
      color: "#00497A"
    },
    {
      title: "Adventure Activities",
      description: "From trekking to river rafting, experience thrilling adventures.",
      icon: "🚣",
      color: "#FF9800"
    }
  ];

  const quickStats = [
    { number: "8", label: "States", color: "#00497A" },
    { number: "50+", label: "Tourist Destinations", color: "#FF9800" },
    { number: "100+", label: "Festivals", color: "#00497A" },
    { number: "200+", label: "Tribal Communities", color: "#FF9800" }
  ];

  const featuredDestinations = [
    {
      name: "Kaziranga National Park",
      state: "Assam",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      tag: "Wildlife"
    },
    {
      name: "Tawang Monastery",
      state: "Arunachal Pradesh",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      tag: "Religious"
    },
    {
      name: "Living Root Bridges",
      state: "Meghalaya",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      tag: "Nature"
    }
  ];

  return (
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ color: '#00497A', fontWeight: '500', mb: 2 }}>
            Welcome to North Eastern Tourism Portal
          </Typography>
          <Typography variant="h6" sx={{ color: '#666666', mb: 4, maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            Explore the beauty, culture, and diversity of North East India - where pristine landscapes meet rich traditions and warm hospitality.
          </Typography>
          <Box sx={{ position: 'relative', mb: 6 }}>
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
              alt="North East India"
              style={{ 
                width: '100%', 
                height: '400px',
                borderRadius: '12px', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                objectFit: 'cover'
              }}
            />
            <Box sx={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              bgcolor: 'rgba(0, 73, 122, 0.9)',
              color: 'white',
              p: 2,
              borderRadius: 2,
              maxWidth: '300px'
            }}>
              <Typography variant="h6" sx={{ fontWeight: '500', mb: 1 }}>
                Discover the Unexplored
              </Typography>
              <Typography variant="body2">
                Eight states, countless stories waiting to be told
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 3,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Typography variant="h3" sx={{ color: stat.color, fontWeight: '500', mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="h6" sx={{ color: '#666666', fontWeight: '500' }}>
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Highlights Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Why Visit North East India?
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {highlights.map((highlight, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{
                p: 4,
                height: '100%',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ 
                    fontSize: '3rem', 
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    bgcolor: `${highlight.color}15`,
                    borderRadius: 2
                  }}>
                    {highlight.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: highlight.color, fontWeight: '500', mb: 2 }}>
                      {highlight.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.6 }}>
                      {highlight.description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Destinations */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Featured Destinations
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {featuredDestinations.map((destination, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
                }
              }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={destination.image}
                    alt={destination.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Chip
                    label={destination.tag}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: '#FF9800',
                      color: 'white',
                      fontWeight: '500'
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#333333', fontWeight: '500' }}>
                    {destination.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#FF9800', mb: 2, fontWeight: '500' }}>
                    📍 {destination.state}
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: '#00497A', 
                      '&:hover': { bgcolor: '#003359' },
                      mt: 'auto',
                      fontWeight: '500'
                    }}
                  >
                    Explore More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box sx={{ 
          textAlign: 'center', 
          p: 6, 
          bgcolor: '#00497A', 
          color: 'white', 
          borderRadius: 3,
          mb: 8,
          backgroundImage: 'linear-gradient(135deg, #00497A 0%, #003359 100%)'
        }}>
          <Typography variant="h4" sx={{ fontWeight: '500', mb: 2 }}>
            Start Your Journey Today
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Discover hidden gems, experience unique cultures, and create unforgettable memories in India's most enchanting region.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: '#FF9800', 
              '&:hover': { bgcolor: '#F57C00' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: '500',
              boxShadow: '0 4px 16px rgba(255, 152, 0, 0.3)'
            }}
          >
            Plan Your Visit
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;