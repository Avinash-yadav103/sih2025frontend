import React from 'react';
import { Box, Typography, Container, Button, TextField, InputAdornment, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import emblemLogo from '../assets/react.svg'; // Replace with actual emblem logo
import land1 from '../assets/images/land1.jpg';
import land2 from '../assets/images/land2.jpg';
import land3 from '../assets/images/land3.jpg';
import infraImg from '../assets/images/infra.jpeg';
import developImg from '../assets/images/develop.jpeg';
import nerImg from '../assets/images/NER.jpeg';

// Add CSS for marquee animation
const marqueeStyle = {
  '@keyframes marquee': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(-100%)' }
  },
  animation: 'marquee 20s linear infinite',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const LandingPage = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#0046a6', color: 'white', py: 2, px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem" 
              height="80px" 
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" fontWeight="bold">MINISTRY OF TOURISM</Typography>
              <Typography variant="h6">
                NORTH EASTERN <span style={{ color: '#7be63e' }}>REGION</span>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button variant="contained" sx={{ mx: 1, bgcolor: '#003380' }}>A+</Button>
            <Button variant="contained" sx={{ mx: 1, bgcolor: '#003380' }}>A</Button>
            <Button variant="contained" sx={{ mx: 1, bgcolor: '#003380' }}>A-</Button>
            <select style={{ marginLeft: '10px', padding: '5px', borderRadius: '3px' }}>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ bgcolor: '#003380', color: 'white', py: 2, px: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button component={Link} to="/home" color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>
            Home
          </Button>
          <Button component={Link} to="/about-us" color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>
            About Us
          </Button>
          <Button component={Link} to="/tourism" color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>
            Tourism
          </Button>
          <Button component={Link} to="/schemes" color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>
            Schemes
          </Button>
          <Button component={Link} to="/gallery" color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>
            Gallery
          </Button>
          <Button component={Link} to="/contact" color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>
            Contact
          </Button>
        </Box>
        <TextField
          size="small"
          placeholder="Search..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button sx={{ bgcolor: '#ffcc00', color: '#000', minWidth: '40px', p: 0.5, '&:hover': { bgcolor: '#e6b800' } }}>
                  <SearchIcon />
                </Button>
              </InputAdornment>
            ),
            style: { backgroundColor: 'white', borderRadius: '4px' }
          }}
          sx={{ width: '250px' }}
        />
      </Box>

      {/* Announcement Banner */}
      <Box sx={{ 
        bgcolor: '#ffcc00', 
        py: 2, 
        px: 3, 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Box sx={{
          whiteSpace: 'nowrap',
          position: 'relative',
          animation: 'marquee 20s linear infinite',
          '@keyframes marquee': {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' }
          },
        }}>
          <Typography variant="h6" component="span">
            Welcome to North Eastern Tourism Portal • Register for upcoming Cultural Festival in Meghalaya • 
            New Tourism Policy announced for North East Region • Visit Spectacular Dzükou Valley
          </Typography>
        </Box>
      </Box>

      {/* Login Buttons */}
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', gap: 4, mb: 6, justifyContent: 'center' }}>
          <Link to="/admin/login" style={{ textDecoration: 'none', width: '300px' }}>
            <Button 
              variant="contained"
              fullWidth
              sx={{ 
                py: 2,
                bgcolor: '#003380',
                '&:hover': { bgcolor: '#00256e' },
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              Admin Login
            </Button>
          </Link>
          <Link to="/police/login" style={{ textDecoration: 'none', width: '300px' }}>
            <Button 
              variant="contained"
              fullWidth
              sx={{ 
                py: 2, 
                bgcolor: '#003380',
                '&:hover': { bgcolor: '#00256e' },
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              Police/Auth Login
            </Button>
          </Link>
        </Box>

        {/* Tourism Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#003380', fontWeight: 'bold' }} gutterBottom>
            Discover North East Tourism
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#ffcc00', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
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
                image={land1}
                alt="Wildlife Sanctuaries"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  🐅 Wildlife Sanctuaries of Assam
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
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
                image={land2}
                alt="Scenic Mountains"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  🏔️ Scenic Mountains of Arunachal Pradesh
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
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
                image={land3}
                alt="Cultural Festivals"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  🎉 Cultural Festivals of Nagaland
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
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
                image="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80" // Living Root Bridge, Meghalaya
                alt="Traditional Villages"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  🏡 Traditional Villages of Meghalaya
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Government Schemes Section */}
        <Box sx={{ textAlign: 'center', my: 6 }}>
          <Typography variant="h4" sx={{ color: '#003380', fontWeight: 'bold' }} gutterBottom>
            Government Schemes for North East
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#ffcc00', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              height: '100%'
            }}>
              <CardMedia
                component="img"
                height="200"
                image={infraImg}
                alt="NESIDS"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>North East Special Infrastructure Development Scheme</Typography>
                <Typography variant="body2">100% centrally funded scheme to fill infrastructural gaps in the region.</Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#003380' }}>Learn More</Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              height: '100%'
            }}>
              <CardMedia
                component="img"
                height="200"
                image={developImg}
                alt="NEIDS"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>North East Industrial Development Scheme</Typography>
                <Typography variant="body2">Promoting industrialization and employment generation in the northeastern states.</Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#003380' }}>Learn More</Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              height: '100%'
            }}>
              <CardMedia
                component="img"
                height="200"
                image={nerImg}
                alt="PMDP"
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>Prime Minister's Development Package for NER</Typography>
                <Typography variant="body2">Special package for infrastructure and economic development.</Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#003380' }}>Learn More</Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: '#002366',
          color: '#fff',
          mt: 6,
          pt: 6,
          pb: 2,
          fontFamily: 'Roboto, Arial, sans-serif',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ffcc00' }}>
                Important Links
              </Typography>
              <Box component="ul" sx={{ listStyleType: 'none', pl: 0 }}>
                {[
                  { label: 'Ministry of Tourism', url: 'https://tourism.gov.in/' },
                  { label: 'Ministry of DoNER', url: 'https://mdoner.gov.in/' },
                  { label: 'Government of India', url: 'https://india.gov.in/' },
                  { label: 'Digital India', url: 'https://digitalindia.gov.in/' },
                  { label: 'MyGov', url: 'https://www.mygov.in/' },
                ].map(link => (
                  <Box component="li" key={link.label} sx={{ mb: 1 }}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener"
                      style={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'color 0.2s',
                      }}
                      onMouseOver={e => (e.target.style.color = '#ffcc00')}
                      onMouseOut={e => (e.target.style.color = '#fff')}
                    >
                      {link.label}
                    </a>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ffcc00' }}>
                North Eastern States
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyleType: 'none',
                  pl: 0,
                  columns: 2,
                  columnGap: 4,
                }}
              >
                {[
                  "Arunachal Pradesh", "Assam", "Manipur", "Meghalaya",
                  "Mizoram", "Nagaland", "Sikkim", "Tripura"
                ].map(state => (
                  <Box component="li" key={state} sx={{ mb: 1 }}>
                    <a
                      href={`#${state.replace(/\s+/g, '').toLowerCase()}`}
                      style={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'color 0.2s',
                      }}
                      onMouseOver={e => (e.target.style.color = '#ffcc00')}
                      onMouseOut={e => (e.target.style.color = '#fff')}
                    >
                      {state}
                    </a>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ffcc00' }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                  alt="Emblem"
                  height="32px"
                  style={{ marginRight: 8, filter: 'brightness(1.2)' }}
                />
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#fff' }}>
                  Ministry of Tourism, North Eastern Region
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 1, color: '#fff' }}>
                Government of India
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:info@netourism.gov.in"
                  style={{
                    color: '#ffcc00',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  info@netourism.gov.in
                </a>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Phone:</strong>{' '}
                <a
                  href="tel:+91-XXXXXXXXXX"
                  style={{
                    color: '#ffcc00',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  +91-XXXXXXXXXX
                </a>
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#ffcc00',
                    color: '#002366',
                    fontWeight: 'bold',
                    boxShadow: 0,
                    '&:hover': { bgcolor: '#e6b800' },
                    borderRadius: '6px',
                  }}
                >
                  Feedback / Suggestion
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              mt: 4,
              pt: 3,
              textAlign: 'center',
              fontSize: '15px',
              color: '#fff',
              opacity: 0.95,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                mb: 1,
                fontWeight: 500,
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                © {new Date().getFullYear()} | Content Owned by Ministry of Tourism, Government of India
              </Typography>
              <span style={{ fontSize: '18px', color: '#ffcc00' }}>•</span>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Last Updated: September 2025
              </Typography>
              <span style={{ fontSize: '18px', color: '#ffcc00' }}>•</span>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Designed & Developed by SIH2025 Team
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Button
                size="small"
                sx={{
                  color: '#ffcc00',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  px: 2,
                  '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' },
                }}
              >
                Accessibility Statement
              </Button>
              <Button
                size="small"
                sx={{
                  color: '#ffcc00',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  px: 2,
                  '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' },
                }}
              >
                Privacy Policy
              </Button>
              <Button
                size="small"
                sx={{
                  color: '#ffcc00',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  px: 2,
                  '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' },
                }}
              >
                Terms of Use
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;