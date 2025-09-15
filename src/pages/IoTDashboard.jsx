import { Box, Typography, Paper, Grid, Card, CardContent, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const IoTDashboard = () => {
  // Mock data
  const devices = [
    { id: 'D-001', type: 'Smartwatch', touristId: 'T-12345', battery: 85, signal: 'Good', status: 'Online' },
    { id: 'D-002', type: 'Smartphone', touristId: 'T-12346', battery: 23, signal: 'Poor', status: 'Online' },
    { id: 'D-003', type: 'Smartwatch', touristId: 'T-12347', battery: 56, signal: 'Good', status: 'Offline' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        IoT Devices Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Devices</Typography>
              <Typography variant="h3">45</Typography>
              <Typography variant="body2">42 Online, 3 Offline</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Low Battery</Typography>
              <Typography variant="h3">5</Typography>
              <Typography variant="body2">Below 20% battery</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Poor Signal</Typography>
              <Typography variant="h3">8</Typography>
              <Typography variant="body2">May have connectivity issues</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Device Status
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Device ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Tourist ID</TableCell>
                <TableCell>Battery</TableCell>
                <TableCell>Signal</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id} hover>
                  <TableCell>{device.id}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{device.touristId}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: '100px' }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={device.battery} 
                          color={device.battery < 20 ? 'error' : device.battery < 50 ? 'warning' : 'success'} 
                        />
                      </Box>
                      <Typography variant="body2">{device.battery}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{device.signal}</TableCell>
                  <TableCell>
                    <Chip 
                      label={device.status} 
                      color={device.status === 'Online' ? 'success' : 'error'} 
                      size="small" 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default IoTDashboard;