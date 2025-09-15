import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TouristList = () => {
  // Mock data
  const tourists = [
    { id: 'T-1001', name: 'John Doe', location: 'Gangtok', status: 'Active' },
    { id: 'T-1002', name: 'Jane Smith', location: 'Zuluk', status: 'Active' },
    { id: 'T-1003', name: 'Bob Johnson', location: 'Nathula', status: 'Inactive' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tourists
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Tourists"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained">Search</Button>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tourists.map((tourist) => (
              <TableRow key={tourist.id} hover>
                <TableCell>{tourist.id}</TableCell>
                <TableCell>{tourist.name}</TableCell>
                <TableCell>{tourist.location}</TableCell>
                <TableCell>{tourist.status}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TouristList;