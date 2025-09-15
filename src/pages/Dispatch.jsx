import { Box, Typography, Paper, Grid, Card, CardContent, Button } from '@mui/material';

const Dispatch = () => {
  // Mock data
  const units = [
    { id: 'U-101', name: 'Patrol Unit 1', status: 'Available', location: 'Gangtok Central' },
    { id: 'U-102', name: 'Patrol Unit 2', status: 'On Call', location: 'Zuluk Road' },
    { id: 'U-103', name: 'Emergency Response', status: 'Busy', location: 'Nathula Pass' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dispatch Center
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Active Alerts
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ bgcolor: '#fff8e1' }}>
              <CardContent>
                <Typography variant="subtitle1">Alert: A-98765</Typography>
                <Typography variant="body2">Panic Button</Typography>
                <Typography variant="body2">Tourist: John Doe</Typography>
                <Typography variant="body2">Location: Gangtok</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" size="small">Dispatch Unit</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available Units
        </Typography>
        <Grid container spacing={2}>
          {units.map((unit) => (
            <Grid item xs={12} md={4} key={unit.id}>
              <Card variant={unit.status === 'Available' ? 'outlined' : ''}>
                <CardContent>
                  <Typography variant="subtitle1">{unit.name}</Typography>
                  <Typography variant="body2">ID: {unit.id}</Typography>
                  <Typography variant="body2">Status: {unit.status}</Typography>
                  <Typography variant="body2">Location: {unit.location}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dispatch;