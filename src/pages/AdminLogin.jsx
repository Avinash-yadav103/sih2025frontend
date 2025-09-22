import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginBack from '../assets/images/login-back.jpg';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('authToken', 'admin-token');
    navigate('/admin/dashboard');
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background Image with Blur */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${loginBack})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px) brightness(0.7)',
          transform: 'scale(1.1)', // Prevents blur edges from showing
          zIndex: -2,
        }}
      />

      {/* Overlay for better contrast - Admin theme with warmer colors */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0, 51, 128, 0.12) 0%, rgba(128, 0, 51, 0.07) 100%)',
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <Grid container sx={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {/* Left sidebar - Admin themed */}
        <Grid 
          item 
          xs={12} 
          sm={4} 
          md={4}
          sx={{
            background: 'linear-gradient(180deg, rgba(0,51,128,0.95) 0%, rgba(0,40,100,0.95) 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: 3, sm: 4 },
            justifyContent: 'center',
            minHeight: '100vh',
            backdropFilter: 'blur(10px)',
            borderRight: '2px solid rgba(255,255,255,0.1)',
            boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Government Emblem"
              style={{ 
                width: '120px', 
                marginBottom: '30px', 
                filter: 'drop-shadow(0 4px 12px rgba(255,204,0,0.4))' 
              }}
            />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                textAlign: 'center',
                mb: 1,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                letterSpacing: '1px'
              }}
            >
              MINISTRY OF TOURISM
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              NORTH EASTERN{' '}
              <Box component="span" sx={{ color: '#ffcc00', fontWeight: 'bold' }}>
                REGION
              </Box>
            </Typography>
            <Box 
              sx={{ 
                width: '80px', 
                height: '2px', 
                background: 'linear-gradient(90deg, #ffcc00 0%, #ff6b35 100%)',
                margin: '0 auto 30px auto',
                borderRadius: '1px'
              }} 
            />
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              letterSpacing: '0.5px',
              color: '#ffcc00'
            }}
          >
            Admin Login Portal
          </Typography>
        </Grid>

        {/* Right content area - Centered Form */}
        <Grid 
          item 
          xs={12} 
          sm={8} 
          md={8}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: { xs: 2, sm: 4 },
            minHeight: '100vh',
            minWidth: '70vw',
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              width: '100%',
              maxWidth: '450px',
              mx: 'auto',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 204, 0, 0.2)',
              boxShadow: `
                0 20px 40px rgba(0,51,128,0.15),
                0 0 0 1px rgba(255,204,0,0.1),
                inset 0 1px 0 rgba(255,255,255,0.4)
              `,
              transform: 'translateZ(0)', // Ensures proper rendering
            }}
          >
            <Box component="form" onSubmit={handleLogin}>
              {/* Form Header - Admin themed */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #003380 0%, #800033 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                    mb: 1,
                    textShadow: '1px 1px 2px rgba(0,51,128,0.1)'
                  }}
                >
                  Admin Access
                </Typography>
                <Box 
                  sx={{ 
                    width: '60px', 
                    height: '3px', 
                    background: 'linear-gradient(90deg, #003380 0%, #ffcc00 50%, #800033 100%)',
                    margin: '0 auto',
                    borderRadius: '2px'
                  }} 
                />
              </Box>

              {/* Username Field */}
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1.5, 
                    color: '#003380', 
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}
                >
                  Username
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter administrator username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(245, 247, 250, 0.8)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '& fieldset': { 
                        borderColor: 'rgba(0,51,128,0.3)',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': { 
                        borderColor: '#ffcc00',
                        boxShadow: '0 0 0 3px rgba(255, 204, 0, 0.1)'
                      },
                      '&.Mui-focused fieldset': { 
                        borderColor: '#800033',
                        boxShadow: '0 0 0 3px rgba(128, 0, 51, 0.1)'
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '14px 16px',
                      fontSize: '1rem'
                    }
                  }}
                  required
                />
              </Box>

              {/* Password Field */}
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1.5, 
                    color: '#003380', 
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}
                >
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(245, 247, 250, 0.8)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '& fieldset': { 
                        borderColor: 'rgba(0,51,128,0.3)',
                        borderWidth: '2px'
                      },
                      '&:hover fieldset': { 
                        borderColor: '#ffcc00',
                        boxShadow: '0 0 0 3px rgba(255, 204, 0, 0.1)'
                      },
                      '&.Mui-focused fieldset': { 
                        borderColor: '#800033',
                        boxShadow: '0 0 0 3px rgba(128, 0, 51, 0.1)'
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '14px 16px',
                      fontSize: '1rem'
                    }
                  }}
                  required
                />
              </Box>

              {/* Login Button - Admin themed */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.8,
                  background: 'linear-gradient(135deg, #800033 0%, #003380 50%, #800033 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  boxShadow: '0 6px 20px rgba(128,0,51,0.3)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transition: 'left 0.6s ease',
                  },
                  '&:hover': { 
                    background: 'linear-gradient(135deg, #660029 0%, #002266 50%, #660029 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(128,0,51,0.4)',
                    '&:before': {
                      left: '100%',
                    }
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                  }
                }}
              >
                Access Admin Panel
              </Button>

              {/* Footer */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(128,0,51,0.8)',
                    fontWeight: '600',
                    mb: 0.5
                  }}
                >
                  Administrator Access Only
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(0,51,128,0.7)',
                    fontWeight: '500',
                    mb: 2
                  }}
                >
                  Unauthorized access is strictly prohibited.
                </Typography>
                <Box 
                  sx={{ 
                    borderTop: '1px solid rgba(128,0,51,0.2)', 
                    pt: 2,
                    mt: 2
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(0,51,128,0.6)',
                      fontSize: '0.85rem'
                    }}
                  >
                    © {new Date().getFullYear()} | Ministry of Tourism,
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(0,51,128,0.6)',
                      fontSize: '0.85rem'
                    }}
                  >
                    Government of India
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLogin;