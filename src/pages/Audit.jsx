import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';

const Audit = () => {
  // Mock data
  const auditLogs = [
    { id: 'LOG-001', timestamp: '2025-09-10T08:15:22Z', user: 'officer_21', action: 'Login', details: 'User logged in' },
    { id: 'LOG-002', timestamp: '2025-09-10T08:23:45Z', user: 'officer_21', action: 'View Alert', details: 'Viewed alert A-98765' },
    { id: 'LOG-003', timestamp: '2025-09-10T08:25:12Z', user: 'officer_21', action: 'Assign Unit', details: 'Assigned unit U-101 to alert A-98765' },
    { id: 'LOG-004', timestamp: '2025-09-10T09:30:05Z', user: 'inspector_5', action: 'Generate E-FIR', details: 'Generated E-FIR for incident C-33333' },
  ];

  // Helper to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Audit Logs
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Logs"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained">Search</Button>
        <Button variant="outlined">Export Logs</Button>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Log ID</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Blockchain Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell>{log.id}</TableCell>
                <TableCell>{formatDate(log.timestamp)}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.details}</TableCell>
                <TableCell>
                  {log.action === 'Generate E-FIR' ? '✓ Verified' : '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Audit;