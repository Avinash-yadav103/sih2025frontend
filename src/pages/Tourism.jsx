import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Tabs, Tab, Chip, Button, Avatar } from '@mui/material';

const Tourism = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tourismCategories = ['All Destinations', 'Wildlife', 'Cultural', 'Adventure', 'Religious', 'Eco-Tourism'];

  const destinations = [
    {
      title: '🐅 Wildlife Sanctuaries of Assam',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      desc: 'Explore the famous Kaziranga National Park, home to one-horned rhinoceros, and other wildlife sanctuaries.',
      category: 'Wildlife',
      state: 'Assam',
      bestTime: 'Nov - Apr',
      duration: '2-3 Days',
      highlights: ['One-horned Rhinoceros', 'Tigers', 'Elephants', 'Bird Watching']
    },
    {
      title: '🏔️ Scenic Mountains of Arunachal Pradesh',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      desc: 'Experience the breathtaking Himalayan landscapes, pristine valleys, and snow-capped peaks.',
      category: 'Adventure',
      state: 'Arunachal Pradesh',
      bestTime: 'Mar - Oct',
      duration: '4-5 Days',
      highlights: ['Tawang Monastery', 'Sela Pass', 'Bumla Pass', 'Trekking']
    },
    {
      title: '🎉 Cultural Festivals of Nagaland',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      desc: 'Join vibrant festivals like the Hornbill Festival and experience rich Naga tribal culture.',
      category: 'Cultural',
      state: 'Nagaland',
      bestTime: 'Oct - Mar',
      duration: '3-4 Days',
      highlights: ['Hornbill Festival', 'Traditional Dances', 'Handicrafts', 'Local Cuisine']
    },
    {
      title: '🏡 Traditional Villages of Meghalaya',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      desc: 'Visit living root bridges, unique village cultures, and experience the wettest place on Earth.',
      category: 'Eco-Tourism',
      state: 'Meghalaya',
      bestTime: 'Oct - May',
      duration: '3-4 Days',
      highlights: ['Living Root Bridges', 'Cherrapunji', 'Mawlynnong Village', 'Caves']
    },
    {
      title: '🙏 Sacred Monasteries of Sikkim',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
      desc: 'Discover ancient Buddhist monasteries and spiritual heritage in the lap of Himalayas.',
      category: 'Religious',
      state: 'Sikkim',
      bestTime: 'Mar - Jun, Sep - Dec',
      duration: '3-4 Days',
      highlights: ['Rumtek Monastery', 'Pemayangtse', 'Gangtok', 'Mountain Views']
    },
    {
      title: '🌊 Pristine Lakes of Manipur',
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
      desc: 'Explore the beautiful Loktak Lake and experience unique floating islands.',
      category: 'Eco-Tourism',
      state: 'Manipur',
      bestTime: 'Oct - Mar',
      duration: '2-3 Days',
      highlights: ['Loktak Lake', 'Floating Islands', 'Sangai Deer', 'Keibul Lamjao NP']
    },
    {
      title: '🎭 Tribal Heritage of Mizoram',
      image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80',
      desc: 'Experience the rich tribal culture and traditions of the Mizo people.',
      category: 'Cultural',
      state: 'Mizoram',
      bestTime: 'Oct - Mar',
      duration: '2-3 Days',
      highlights: ['Tribal Festivals', 'Handicrafts', 'Traditional Music', 'Hill Stations']
    },
    {
      title: '🏛️ Royal Palaces of Tripura',
      image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
      desc: 'Visit historic palaces and ancient temples showcasing royal heritage.',
      category: 'Cultural',
      state: 'Tripura',
      bestTime: 'Oct - Mar',
      duration: '2-3 Days',
      highlights: ['Ujjayanta Palace', 'Neermahal', 'Tripura Sundari Temple', 'Heritage Sites']
    }
  ];

  const travelTips = [
    {
      icon: '📋',
      title: 'Inner Line Permit',
      description: 'Required for Arunachal Pradesh, Nagaland, and Mizoram for Indian citizens.',
      color: '#00497A'
    },
    {
      icon: '🌡️',
      title: 'Best Season',
      description: 'October to April is ideal for most destinations in the region.',
      color: '#FF9800'
    },
    {
      icon: '🎒',
      title: 'What to Pack',
      description: 'Warm clothes, rain gear, comfortable trekking shoes, and medications.',
      color: '#00497A'
    },
    {
      icon: '🚗',
      title: 'Transportation',
      description: 'Well connected by air, rail, and road. Local taxis and buses available.',
      color: '#FF9800'
    }
  ];

  const states = [
    { name: 'Assam', capital: 'Dispur', speciality: 'Tea Gardens & Wildlife' },
    { name: 'Arunachal Pradesh', capital: 'Itanagar', speciality: 'Mountains & Monasteries' },
    { name: 'Manipur', capital: 'Imphal', speciality: 'Lakes & Classical Dance' },
    { name: 'Meghalaya', capital: 'Shillong', speciality: 'Living Bridges & Caves' },
    { name: 'Mizoram', capital: 'Aizawl', speciality: 'Tribal Culture & Hills' },
    { name: 'Nagaland', capital: 'Kohima', speciality: 'Festivals & Handicrafts' },
    { name: 'Sikkim', capital: 'Gangtok', speciality: 'Buddhism & Himalayas' },
    { name: 'Tripura', capital: 'Agartala', speciality: 'Palaces & Temples' }
  ];

  const filteredDestinations = selectedTab === 0 
    ? destinations 
    : destinations.filter(dest => dest.category === tourismCategories[selectedTab]);

  return (
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ color: '#00497A', fontWeight: '500', mb: 3 }}>
            Discover North East Tourism
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
          <Typography variant="h6" sx={{ color: '#666666', maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            Explore India's best kept secret - the mesmerizing North Eastern states with their pristine landscapes, 
            rich cultural heritage, and warm hospitality.
          </Typography>
        </Box>

        {/* Category Tabs */}
        <Box sx={{ mb: 6 }}>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: '#666666',
                fontWeight: '500',
                textTransform: 'none',
                fontSize: '1rem'
              },
              '& .Mui-selected': {
                color: '#00497A',
                fontWeight: '500'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#FF9800',
                height: '3px'
              }
            }}
          >
            {tourismCategories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
        </Box>

        {/* Destinations Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {filteredDestinations.map((destination, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
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
                    alt={destination.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Chip
                    label={destination.category}
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
                  <Box sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    bgcolor: 'rgba(0, 73, 122, 0.9)',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    📍 {destination.state}
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#333333', fontWeight: '500', mb: 2 }}>
                    {destination.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666', mb: 3, lineHeight: 1.6 }}>
                    {destination.desc}
                  </Typography>
                  
                  {/* Quick Info */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#666666', display: 'block' }}>
                        Best Time
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#00497A', fontWeight: '500' }}>
                        {destination.bestTime}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ color: '#666666', display: 'block' }}>
                        Duration
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#FF9800', fontWeight: '500' }}>
                        {destination.duration}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Highlights */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ color: '#666666', display: 'block', mb: 1 }}>
                      Highlights
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {destination.highlights.slice(0, 3).map((highlight, idx) => (
                        <Chip
                          key={idx}
                          label={highlight}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.75rem',
                            borderColor: '#00497A',
                            color: '#00497A'
                          }}
                        />
                      ))}
                      {destination.highlights.length > 3 && (
                        <Chip
                          label={`+${destination.highlights.length - 3} more`}
                          size="small"
                          sx={{ 
                            fontSize: '0.75rem',
                            bgcolor: '#FF980015',
                            color: '#FF9800'
                          }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      bgcolor: '#00497A', 
                      '&:hover': { bgcolor: '#003359' },
                      fontWeight: '500',
                      mt: 'auto'
                    }}
                  >
                    Explore Destination
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Travel Tips */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Essential Travel Tips
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {travelTips.map((tip, index) => (
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
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ 
                    fontSize: '2.5rem', 
                    mr: 3,
                    width: '70px',
                    height: '70px',
                    bgcolor: `${tip.color}15`,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {tip.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: tip.color, fontWeight: '500', mb: 2 }}>
                      {tip.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.6 }}>
                      {tip.description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* States Overview */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Eight Sisters of Northeast
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {states.map((state, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                p: 3,
                textAlign: 'center',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Avatar sx={{ 
                  width: 60, 
                  height: 60, 
                  bgcolor: index % 2 === 0 ? '#00497A' : '#FF9800',
                  mx: 'auto',
                  mb: 2,
                  fontSize: '1.5rem',
                  fontWeight: '500'
                }}>
                  {state.name.charAt(0)}
                </Avatar>
                <Typography variant="h6" sx={{ color: '#333333', fontWeight: '500', mb: 1 }}>
                  {state.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                  Capital: {state.capital}
                </Typography>
                <Typography variant="body2" sx={{ color: index % 2 === 0 ? '#00497A' : '#FF9800', fontWeight: '500' }}>
                  {state.speciality}
                </Typography>
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
            Ready to Explore Northeast India?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Plan your journey to India's most pristine and culturally rich region. 
            Experience nature, culture, and adventure like never before.
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
            Start Planning Your Trip
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Tourism;