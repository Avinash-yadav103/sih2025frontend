import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

const IncidentList = () => {
  // Mock data
  const incidents = [
    { id: 'C-33333', touristId: 'T-12345', status: 'Open', type: 'Theft', location: 'Gangtok', date: '2025-09-10' },
    { id: 'C-33334', touristId: 'T-12346', status: 'Investigating', type: 'Lost', location: 'Zuluk', date: '2025-09-09' },
    { id: 'C-33335', touristId: 'T-12347', status: 'Closed', type: 'Accident', location: 'Nathula', date: '2025-09-08' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Incidents & Cases
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Incidents"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained">Search</Button>
        <Button variant="contained" color="secondary">New Case</Button>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tourist ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id} hover>
                <TableCell>{incident.id}</TableCell>
                <TableCell>{incident.touristId}</TableCell>
                <TableCell>{incident.type}</TableCell>
                <TableCell>{incident.location}</TableCell>
                <TableCell>{incident.date}</TableCell>
                <TableCell>
                  <Chip 
                    label={incident.status} 
                    color={incident.status === 'Open' ? 'error' : incident.status === 'Investigating' ? 'warning' : 'success'} 
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

export default IncidentList;