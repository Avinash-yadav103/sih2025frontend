import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

const IncidentDetail = () => {
  const { incidentId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Incident Details: {incidentId}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Status</Typography>
            <Typography variant="body1">Open</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Tourist ID</Typography>
            <Typography variant="body1">T-12345</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Location</Typography>
            <Typography variant="body1">Gangtok</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Date</Typography>
            <Typography variant="body1">September 10, 2025</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary">
                Generate E-FIR
              </Button>
              <Button variant="outlined">
                View on Map
              </Button>
              <Button variant="outlined" color="secondary">
                Close Case
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Details" />
          <Tab label="Evidence" />
          <Tab label="Timeline" />
          <Tab label="Related Alerts" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Typography>
              Incident details will appear here
            </Typography>
          )}
          {tabValue === 1 && (
            <Typography>
              Evidence information will appear here
            </Typography>
          )}
          {tabValue === 2 && (
            <Typography>
              Timeline of incident will appear here
            </Typography>
          )}
          {tabValue === 3 && (
            <Typography>
              Related alerts will appear here
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default IncidentDetail;