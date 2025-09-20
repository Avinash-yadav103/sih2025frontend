import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';

const Dashboard = () => {
  // Handle logout function
  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">
          Police Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Active Alerts
            </Typography>
            <Typography variant="body2">
              Dashboard content will appear here
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Tourist Status
            </Typography>
            <Typography variant="body2">
              Dashboard content will appear here
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
            <Typography variant="h6" gutterBottom>
              Recent Incidents
            </Typography>
            <Typography variant="body2">
              Dashboard content will appear here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;