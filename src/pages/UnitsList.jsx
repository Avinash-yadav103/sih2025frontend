import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const UnitsList = () => {
  // Mock data
  const units = [
    { id: 'U-101', name: 'Patrol Unit 1', type: 'Vehicle', location: 'Gangtok Central', status: 'Available' },
    { id: 'U-102', name: 'Patrol Unit 2', type: 'Foot Patrol', location: 'Zuluk Road', status: 'On Call' },
    { id: 'U-103', name: 'Emergency Response', type: 'Vehicle', location: 'Nathula Pass', status: 'Busy' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Police Units
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Units"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained">Search</Button>
        <Button variant="contained" color="secondary">Add Unit</Button>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.id} hover>
                <TableCell>{unit.id}</TableCell>
                <TableCell>{unit.name}</TableCell>
                <TableCell>{unit.type}</TableCell>
                <TableCell>{unit.location}</TableCell>
                <TableCell>
                  <Chip 
                    label={unit.status} 
                    color={unit.status === 'Available' ? 'success' : unit.status === 'On Call' ? 'warning' : 'error'} 
                    size="small" 
                  />
                </TableCell>
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

export default UnitsList;