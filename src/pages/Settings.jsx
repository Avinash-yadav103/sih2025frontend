import { Box, Typography, Paper, Tabs, Tab, List, ListItem, ListItemText, Switch, TextField, Button, Divider } from '@mui/material';
import { useState } from 'react';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="General" />
          <Tab label="Notifications" />
          <Tab label="Blockchain Keys" />
          <Tab label="API Access" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <List>
              <ListItem>
                <ListItemText 
                  primary="System Language"
                  secondary="Choose the default language for the dashboard"
                />
                <Box sx={{ width: 200 }}>
                  <TextField 
                    select
                    label="Language"
                    value="english"
                    variant="outlined"
                    size="small"
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </TextField>
                </Box>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Auto-refresh Interval"
                  secondary="How often the dashboard data should refresh (in seconds)"
                />
                <Box sx={{ width: 200 }}>
                  <TextField 
                    type="number" 
                    defaultValue="30" 
                    variant="outlined" 
                    size="small" 
                  />
                </Box>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Dark Mode"
                  secondary="Enable dark theme for the dashboard"
                />
                <Switch />
              </ListItem>
            </List>
          )}
          
          {tabValue === 1 && (
            <List>
              <ListItem>
                <ListItemText 
                  primary="Alert Notifications"
                  secondary="Receive notifications for new alerts"
                />
                <Switch defaultChecked />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Email Notifications"
                  secondary="Send critical alerts to email"
                />
                <Switch />
              </ListItem>
            </List>
          )}
          
          {tabValue === 2 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>Blockchain Configuration</Typography>
              <TextField
                label="Public Key"
                variant="outlined"
                fullWidth
                margin="normal"
                value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
              />
              <TextField
                label="Verification Endpoint"
                variant="outlined"
                fullWidth
                margin="normal"
                value="https://api.blockchain.example/verify"
              />
              <Button variant="contained" sx={{ mt: 2 }}>
                Update Keys
              </Button>
            </Box>
          )}
          
          {tabValue === 3 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>API Configuration</Typography>
              <TextField
                label="API Key"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value="•••••••••••••••••"
              />
              <Button variant="contained" sx={{ mt: 2 }}>
                Generate New Key
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;