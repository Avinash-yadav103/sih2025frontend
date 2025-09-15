import { useState } from 'react';
import { 
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, IconButton, Button, TextField,
  FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FenceIcon from '@mui/icons-material/Fence';
import ErrorIcon from '@mui/icons-material/Error';
import DevicesIcon from '@mui/icons-material/Devices';

// Mock alert data
const mockAlerts = [
  { 
    id: 'A-98765', 
    time: '2025-09-10T04:23:11Z', 
    severity: 'high', 
    touristId: 'T-12345', 
    touristName: 'John Doe',
    type: 'panic', 
    location: 'Gangtok', 
    status: 'new', 
    assignedUnit: null 
  },
  { 
    id: 'A-98764', 
    time: '2025-09-10T03:45:22Z', 
    severity: 'medium', 
    touristId: 'T-12346', 
    touristName: 'Jane Smith',
    type: 'geofence', 
    location: 'Zuluk', 
    status: 'assigned', 
    assignedUnit: 'U-101' 
  },
  { 
    id: 'A-98763', 
    time: '2025-09-10T02:11:05Z', 
    severity: 'low', 
    touristId: 'T-12347', 
    touristName: 'Bob Johnson',
    type: 'anomaly', 
    location: 'Gangtok', 
    status: 'resolved', 
    assignedUnit: 'U-102' 
  },
  { 
    id: 'A-98762', 
    time: '2025-09-10T01:30:47Z', 
    severity: 'high', 
    touristId: 'T-12348', 
    touristName: 'Alice Brown',
    type: 'iot', 
    location: 'Nathula', 
    status: 'new', 
    assignedUnit: null 
  },
];

// Helper to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Get icon for alert type
const getAlertTypeIcon = (type) => {
  switch(type) {
    case 'panic': return <NotificationsActiveIcon color="error" />;
    case 'geofence': return <FenceIcon color="warning" />;
    case 'anomaly': return <ErrorIcon color="info" />;
    case 'iot': return <DevicesIcon color="secondary" />;
    default: return null;
  }
};

// Get color for severity
const getSeverityColor = (severity) => {
  switch(severity) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'success';
    default: return 'default';
  }
};

const Alerts = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: 'all',
    severity: 'all',
    type: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewAlert = (alertId) => {
    navigate(`/police/alerts/${alertId}`);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  // Filter alerts based on current filters
  const filteredAlerts = mockAlerts.filter(alert => {
    if (filters.status !== 'all' && alert.status !== filters.status) return false;
    if (filters.severity !== 'all' && alert.severity !== filters.severity) return false;
    if (filters.type !== 'all' && alert.type !== filters.type) return false;
    if (searchQuery && !alert.touristName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !alert.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alert Inbox
      </Typography>
      
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={filters.status}
              label="Status"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="assigned">Assigned</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="severity-label">Severity</InputLabel>
            <Select
              labelId="severity-label"
              id="severity"
              name="severity"
              value={filters.severity}
              label="Severity"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={filters.type}
              label="Type"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="panic">Panic</MenuItem>
              <MenuItem value="geofence">Geofence</MenuItem>
              <MenuItem value="anomaly">Anomaly</MenuItem>
              <MenuItem value="iot">IoT</MenuItem>
            </Select>
          </FormControl>
          
          <Button variant="contained" color="primary">
            Refresh
          </Button>
        </Box>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Alert ID</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Tourist</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned Unit</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.id} hover>
                <TableCell>{alert.id}</TableCell>
                <TableCell>{formatDate(alert.time)}</TableCell>
                <TableCell>
                  <Chip 
                    label={alert.severity.toUpperCase()} 
                    color={getSeverityColor(alert.severity)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  {alert.touristName}
                  <Typography variant="caption" display="block">
                    {alert.touristId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getAlertTypeIcon(alert.type)}
                    {alert.type}
                  </Box>
                </TableCell>
                <TableCell>{alert.location}</TableCell>
                <TableCell>
                  <Chip 
                    label={alert.status} 
                    color={alert.status === 'new' ? 'error' : alert.status === 'assigned' ? 'warning' : 'success'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>{alert.assignedUnit || '-'}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    size="small"
                    onClick={() => handleViewAlert(alert.id)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Alerts;