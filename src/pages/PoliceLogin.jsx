import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import loginBack from '../assets/images/login-back.jpg';

const PoliceLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('authToken', 'police-token');
    navigate('/police/dashboard');
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

      {/* Overlay for better contrast */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(0, 51, 128, 0.08) 0%, rgba(0, 51, 128, 0.08) 100%)',
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <Grid container sx={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {/* Left sidebar */}
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
                filter: 'drop-shadow(0 4px 12px rgba(255,255,255,0.3))' 
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
              <Box component="span" sx={{ color: '#7be63e', fontWeight: 'bold' }}>
                REGION
              </Box>
            </Typography>
            <Box 
              sx={{ 
                width: '80px', 
                height: '2px', 
                background: 'linear-gradient(90deg, #7be63e 0%, #ffcc00 100%)',
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
              letterSpacing: '0.5px'
            }}
          >
            Police/Auth Login Portal
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
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: `
                0 20px 40px rgba(0,51,128,0.15),
                0 0 0 1px rgba(255,255,255,0.1),
                inset 0 1px 0 rgba(255,255,255,0.4)
              `,
              transform: 'translateZ(0)', // Ensures proper rendering
            }}
          >
            <Box component="form" onSubmit={handleLogin}>
              {/* Form Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    color: '#003380', 
                    fontWeight: 'bold',
                    mb: 1,
                    textShadow: '1px 1px 2px rgba(0,51,128,0.1)'
                  }}
                >
                  Secure Login
                </Typography>
                <Box 
                  sx={{ 
                    width: '60px', 
                    height: '3px', 
                    background: 'linear-gradient(90deg, #003380 0%, #7be63e 100%)',
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
                  placeholder="Enter your username"
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
                        borderColor: '#7be63e',
                        boxShadow: '0 0 0 3px rgba(123, 230, 62, 0.1)'
                      },
                      '&.Mui-focused fieldset': { 
                        borderColor: '#003380',
                        boxShadow: '0 0 0 3px rgba(0, 51, 128, 0.1)'
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
                  placeholder="Enter your password"
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
                        borderColor: '#7be63e',
                        boxShadow: '0 0 0 3px rgba(123, 230, 62, 0.1)'
                      },
                      '&.Mui-focused fieldset': { 
                        borderColor: '#003380',
                        boxShadow: '0 0 0 3px rgba(0, 51, 128, 0.1)'
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

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.8,
                  background: 'linear-gradient(135deg, #003380 0%, #004499 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  boxShadow: '0 6px 20px rgba(0,51,128,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    background: 'linear-gradient(135deg, #002266 0%, #003380 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,51,128,0.4)'
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                  }
                }}
              >
                Login to Portal
              </Button>

              {/* Footer */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(0,51,128,0.7)',
                    fontWeight: '500',
                    mb: 0.5
                  }}
                >
                  For official use only.
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(0,51,128,0.7)',
                    fontWeight: '500',
                    mb: 2
                  }}
                >
                  Unauthorized access is prohibited.
                </Typography>
                <Box 
                  sx={{ 
                    borderTop: '1px solid rgba(0,51,128,0.1)', 
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

export default PoliceLogin;