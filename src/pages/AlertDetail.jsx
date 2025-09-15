import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';

const AlertDetail = () => {
  const { alertId } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alert Details: {alertId}
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Status</Typography>
            <Typography variant="body1">New</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Priority</Typography>
            <Typography variant="body1">High</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Tourist</Typography>
            <Typography variant="body1">John Doe (T-12345)</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Location</Typography>
            <Typography variant="body1">Gangtok</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Description</Typography>
            <Typography variant="body1">
              Alert details will be displayed here
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary">
                Assign Unit
              </Button>
              <Button variant="outlined" color="primary">
                View on Map
              </Button>
              <Button variant="outlined">
                Mark as Resolved
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AlertDetail;