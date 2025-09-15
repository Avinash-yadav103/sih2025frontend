import { Box, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const Reports = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                label="Report Type"
                value="incidents"
              >
                <MenuItem value="incidents">Incidents</MenuItem>
                <MenuItem value="tourists">Tourist Activity</MenuItem>
                <MenuItem value="alerts">Alerts</MenuItem>
                <MenuItem value="response">Response Times</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Time Period</InputLabel>
              <Select
                label="Time Period"
                value="month"
              >
                <MenuItem value="day">Last 24 Hours</MenuItem>
                <MenuItem value="week">Last 7 Days</MenuItem>
                <MenuItem value="month">Last 30 Days</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Region</InputLabel>
              <Select
                label="Region"
                value="all"
              >
                <MenuItem value="all">All Regions</MenuItem>
                <MenuItem value="gangtok">Gangtok</MenuItem>
                <MenuItem value="zuluk">Zuluk</MenuItem>
                <MenuItem value="nathula">Nathula Pass</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" fullWidth>
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ height: '60vh', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>
          Reports and visualizations will appear here
        </Typography>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Export as PDF
        </Button>
        <Button variant="outlined">
          Export as CSV
        </Button>
      </Box>
    </Box>
  );
};

export default Reports;