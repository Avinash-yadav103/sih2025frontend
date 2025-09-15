import { Box, Typography, Paper, Button, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';

const GeofenceManager = () => {
  // Mock data
  const geofences = [
    { id: 'G-001', name: 'Restricted Zone A', type: 'Polygon', risk: 'High', active: true },
    { id: 'G-002', name: 'Tourist Zone B', type: 'Circle', risk: 'Low', active: true },
    { id: 'G-003', name: 'Danger Area C', type: 'Polygon', risk: 'High', active: false },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Geofence Manager
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '70vh', overflow: 'auto' }}>
            <List>
              {geofences.map((fence, index) => (
                <Box key={fence.id}>
                  <ListItem button>
                    <ListItemText 
                      primary={fence.name} 
                      secondary={`${fence.type} | Risk: ${fence.risk} | ${fence.active ? 'Active' : 'Inactive'}`}
                    />
                  </ListItem>
                  {index < geofences.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained">Create New</Button>
            <Button variant="outlined">Import</Button>
            <Button variant="outlined">Export</Button>
          </Paper>
          
          <Paper sx={{ height: 'calc(70vh - 64px)', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1">
              Map for geofence creation and editing will appear here
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeofenceManager;