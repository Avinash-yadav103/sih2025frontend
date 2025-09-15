import { Outlet } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';
import FenceIcon from '@mui/icons-material/Fence';
import DevicesIcon from '@mui/icons-material/Devices';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const drawerWidth = 240;

const menuItems = [
  { text: 'Map', path: '/police/map', icon: <MapIcon /> },
  { text: 'Alerts', path: '/police/alerts', icon: <NotificationsIcon /> },
  { text: 'Tourists', path: '/police/tourists', icon: <PeopleIcon /> },
  { text: 'Incidents', path: '/police/incidents', icon: <ReportIcon /> },
  { text: 'Dispatch', path: '/police/dispatch', icon: <LocalShippingIcon /> },
  { text: 'Units', path: '/police/units', icon: <GroupsIcon /> },
  { text: 'Geofences', path: '/police/geofences', icon: <FenceIcon /> },
  { text: 'IoT Devices', path: '/police/iot', icon: <DevicesIcon /> },
  { text: 'Reports', path: '/police/reports', icon: <InsightsIcon /> },
  { text: 'Settings', path: '/police/settings', icon: <SettingsIcon /> },
  { text: 'Audit', path: '/police/audit', icon: <VerifiedUserIcon /> },
];

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Police Dashboard — Smart Tourist Safety Monitoring
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;