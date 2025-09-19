import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PoliceLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would add authentication logic
    // For now, just simulate a successful login
    localStorage.setItem('authToken', 'police-token');
    navigate('/police/map');
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left sidebar */}
      <Grid item xs={12} sm={4} md={3} 
        sx={{ 
          bgcolor: '#003380', 
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4
        }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
          alt="Government Emblem" 
          style={{ width: '120px', marginBottom: '20px' }}
        />
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          MINISTRY OF TOURISM
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
          NORTH EASTERN <span style={{ color: '#7be63e' }}>REGION</span>
        </Typography>
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Police/Auth Login Portal
        </Typography>
      </Grid>

      {/* Right content area */}
      <Grid item xs={12} sm={8} md={9} 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 4
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            width: '100%', 
            maxWidth: '500px'
          }}
        >
          <Box component="form" onSubmit={handleLogin}>
            <Typography variant="h6" sx={{ mb: 2 }}>Username</Typography>
            <TextField
              fullWidth
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 3 }}
              required
            />

            <Typography variant="h6" sx={{ mb: 2 }}>Password</Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 4 }}
              required
            />

            <Button 
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ 
                py: 1,
                borderColor: '#003380',
                color: '#003380',
                '&:hover': { borderColor: '#002266', bgcolor: 'rgba(0, 51, 128, 0.04)' }
              }}
            >
              Login
            </Button>

            <Box sx={{ mt: 4, textAlign: 'center', color: '#666' }}>
              <Typography variant="body2">For official use only.</Typography>
              <Typography variant="body2">Unauthorized access is prohibited.</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                © {new Date().getFullYear()} | Ministry of Tourism,
              </Typography>
              <Typography variant="body2">Government of India</Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PoliceLogin;