import React from 'react';
import { Box, Typography, Container, Button, TextField, InputAdornment, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import emblemLogo from '../assets/react.svg'; // Replace with actual emblem logo

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
          <Button color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>Home</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>About Us</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>Tourism</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>Schemes</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>Gallery</Button>
          <Button color="inherit" sx={{ fontWeight: 'bold', mx: 1 }}>Contact</Button>
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
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Rhinos_at_Kaziranga.jpg/1280px-Rhinos_at_Kaziranga.jpg"
                alt="Wildlife Sanctuaries"
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Wildlife Sanctuaries of Assam</Typography>
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
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Tawang_Monastery_Arunachal_Pradesh.jpg/800px-Tawang_Monastery_Arunachal_Pradesh.jpg"
                alt="Scenic Mountains"
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Scenic Mountains of Arunachal Pradesh</Typography>
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
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/A_dance_from_hornbill_festival_kohima_nagaland.jpg/800px-A_dance_from_hornbill_festival_kohima_nagaland.jpg"
                alt="Cultural Festivals"
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Cultural Festivals of Nagaland</Typography>
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
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Living_Root_Bridge_of_Meghalaya.jpg/800px-Living_Root_Bridge_of_Meghalaya.jpg"
                alt="Traditional Villages"
              />
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Traditional Villages of Meghalaya</Typography>
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
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Umiam_Lake_Shillong.jpg/800px-Umiam_Lake_Shillong.jpg"
                alt="NESIDS"
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
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Road_to_Gurudongmar_Lake_North_Sikkim_India_2012.jpg/800px-Road_to_Gurudongmar_Lake_North_Sikkim_India_2012.jpg"
                alt="NEIDS"
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
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Majuli_river_island.jpg/800px-Majuli_river_island.jpg"
                alt="PMDP"
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
      <Box sx={{ bgcolor: '#003380', color: 'white', mt: 6, py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Important Links</Typography>
              <Box component="ul" sx={{ listStyleType: 'none', pl: 0 }}>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Ministry of Tourism</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Ministry of DoNER</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Government of India</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Digital India</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>MyGov</Link></Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>North Eastern States</Typography>
              <Box component="ul" sx={{ listStyleType: 'none', pl: 0 }}>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Arunachal Pradesh</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Assam</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Manipur</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Meghalaya</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Mizoram</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Nagaland</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Sikkim</Link></Box>
                <Box component="li" sx={{ mb: 1 }}><Link href="#" sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Tripura</Link></Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Contact Us</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Ministry of Tourism, North Eastern Region</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Government of India</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Email: info@netourism.gov.in</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Phone: +91-XXXXXXXXXX</Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 4, pt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} | Content Owned by Ministry of Tourism, Government of India
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;