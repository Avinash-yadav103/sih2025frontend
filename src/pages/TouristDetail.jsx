import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

const TouristDetail = () => {
  const { touristId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tourist Profile: {touristId}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Name</Typography>
            <Typography variant="body1">John Doe</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Digital ID</Typography>
            <Typography variant="body1">0xabc123...</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Status</Typography>
            <Typography variant="body1">Active</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Safety Score</Typography>
            <Typography variant="body1">72/100</Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Summary" />
          <Tab label="Live Track" />
          <Tab label="Timeline" />
          <Tab label="Device & Health" />
          <Tab label="Consent & Privacy" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Typography>
              Tourist summary information will appear here
            </Typography>
          )}
          {tabValue === 1 && (
            <Typography>
              Live tracking data will appear here
            </Typography>
          )}
          {tabValue === 2 && (
            <Typography>
              Timeline of activities will appear here
            </Typography>
          )}
          {tabValue === 3 && (
            <Typography>
              Device and health information will appear here
            </Typography>
          )}
          {tabValue === 4 && (
            <Typography>
              Consent and privacy logs will appear here
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default TouristDetail;