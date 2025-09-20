import React from 'react';
import { Box, Typography, Grid, Paper, Button, Card, CardContent, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import WarningOutlined from '@mui/icons-material/WarningOutlined'; // Changed from AlertOutlined

// Styled components for custom UI elements
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F5F7FA',
  borderRadius: '10px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  border: '1px solid #E6E9EE',
  height: '100%',
}));

const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid #E6E9EE',
});

const CardTitle = styled(Typography)({
  color: '#1F1F1F',
  fontWeight: 600,
  fontSize: '16px',
});

const DashboardButton = styled(Button)({
  backgroundColor: '#3A7AFE',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#0057D9',
  },
  textTransform: 'none',
  boxShadow: 'none',
  padding: '8px 20px',
  fontWeight: 500,
});

const LogoutButton = styled(Button)({
  backgroundColor: '#FF4D4F',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#FF7875',
  },
  textTransform: 'none',
  boxShadow: 'none',
});

const StatCard = styled(Box)({
  backgroundColor: '#FFFFFF',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  border: '1px solid #E6E9EE',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

// Simple chart component using CSS
const SimpleBarChart = ({ data, labels, colors }) => {
  const maxValue = Math.max(...data);
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', mt: 2 }}>
      <Box sx={{ display: 'flex', flex: 1, mb: 1 }}>
        {data.map((value, index) => (
          <Box key={index} sx={{ flex: 1, px: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Box 
              sx={{ 
                height: `${(value / maxValue) * 100}%`, 
                bgcolor: colors[index % colors.length],
                minHeight: '20px',
                borderRadius: '4px 4px 0 0',
              }} 
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        {labels.map((label, index) => (
          <Typography key={index} sx={{ fontSize: 12, color: '#8C8C8C', flex: 1, textAlign: 'center' }}>
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

// Simple donut chart component using CSS
const SimpleDonutChart = ({ data, labels, colors }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  let cumulative = 0;
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', position: 'relative' }}>
      <Box
        sx={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: `conic-gradient(${data.map((value, i) => {
            const startAngle = (cumulative / total) * 360;
            cumulative += value;
            const endAngle = (cumulative / total) * 360;
            return `${colors[i]} ${startAngle}deg ${endAngle}deg`;
          }).join(', ')})`,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'white',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#8C8C8C' }}>Total</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#1F1F1F' }}>{total}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 3, position: 'absolute', bottom: 0 }}>
        {labels.map((label, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: 1, bgcolor: colors[i], mr: 1 }} />
            <Typography sx={{ fontSize: 12, color: '#595959' }}>{label} ({data[i]})</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const Dashboard = () => {
  // Handle logout function
  const handleLogout = () => {
    // Clear authentication tokens
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = '/login';
  };

  // Sample chart data
  const touristData = [31, 40, 28, 51, 42, 65, 80];
  const alertData = [11, 15, 10, 17, 25, 21, 30];
  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const donutData = [65, 20, 10, 5];
  const donutLabels = ['Safe', 'Checked In', 'Overdue', 'Alert'];
  const donutColors = ['#3A7AFE', '#52C41A', '#FFC53D', '#FF4D4F'];

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: '1px solid #E6E9EE' }}>
        <Typography variant="h4" sx={{ color: '#1F1F1F', fontWeight: 600 }}>
          Police Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton sx={{ color: '#595959' }}>
            <NotificationsOutlined />
          </IconButton>
          <IconButton sx={{ color: '#595959' }}>
            <SettingsOutlined />
          </IconButton>
          <LogoutButton 
            variant="contained" 
            startIcon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </LogoutButton>
        </Box>
      </Box>
      
      {/* Stats Overview Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <StatCard>
            <Box>
              <Typography sx={{ color: '#8C8C8C', fontSize: '14px' }}>
                Total Tourists
              </Typography>
              <Typography variant="h4" sx={{ color: '#1F1F1F', fontWeight: 600, my: 1 }}>
                2,845
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ background: '#D8E6FF', color: '#3A7AFE', px: 1, py: 0.5, borderRadius: 1, display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                +12.5%
              </Box>
              <Typography sx={{ color: '#8C8C8C', fontSize: '12px', ml: 1 }}>
                Since last week
              </Typography>
            </Box>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <Box>
              <Typography sx={{ color: '#8C8C8C', fontSize: '14px' }}>
                Active Alerts
              </Typography>
              <Typography variant="h4" sx={{ color: '#FF4D4F', fontWeight: 600, my: 1 }}>
                24
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ background: '#FFD6D6', color: '#FF4D4F', px: 1, py: 0.5, borderRadius: 1, display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                +5.2%
              </Box>
              <Typography sx={{ color: '#8C8C8C', fontSize: '12px', ml: 1 }}>
                Since yesterday
              </Typography>
            </Box>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <Box>
              <Typography sx={{ color: '#8C8C8C', fontSize: '14px' }}>
                Geofence Exits
              </Typography>
              <Typography variant="h4" sx={{ color: '#FFC53D', fontWeight: 600, my: 1 }}>
                56
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ background: '#FFF3D6', color: '#FFC53D', px: 1, py: 0.5, borderRadius: 1, display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                +8.4%
              </Box>
              <Typography sx={{ color: '#8C8C8C', fontSize: '12px', ml: 1 }}>
                Since yesterday
              </Typography>
            </Box>
          </StatCard>
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard>
            <Box>
              <Typography sx={{ color: '#8C8C8C', fontSize: '14px' }}>
                Resolved Issues
              </Typography>
              <Typography variant="h4" sx={{ color: '#52C41A', fontWeight: 600, my: 1 }}>
                192
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Box sx={{ background: '#DCFAD7', color: '#52C41A', px: 1, py: 0.5, borderRadius: 1, display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                +15.3%
              </Box>
              <Typography sx={{ color: '#8C8C8C', fontSize: '12px', ml: 1 }}>
                Since last week
              </Typography>
            </Box>
          </StatCard>
        </Grid>
      </Grid>

      {/* Charts and Data */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper sx={{ height: 'auto', p: 0 }}>
            <CardHeader>
              <CardTitle>Tourist Activity Trends</CardTitle>
              <DashboardButton variant="contained" size="small">View Details</DashboardButton>
            </CardHeader>
            <Box sx={{ p: 2, height: '320px' }}>
              {/* Simple Bar Chart */}
              <Box sx={{ height: '280px' }}>
                <SimpleBarChart 
                  data={touristData} 
                  labels={weekLabels} 
                  colors={['#3A7AFE', '#FFC53D']} 
                />
              </Box>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper sx={{ height: 'auto', p: 0 }}>
            <CardHeader>
              <CardTitle>Tourist Status</CardTitle>
              <IconButton size="small" sx={{ color: '#8C8C8C' }}>
                <WarningOutlined fontSize="small" /> {/* Changed from AlertOutlined */}
              </IconButton>
            </CardHeader>
            <Box sx={{ p: 2, height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Simple Donut Chart */}
              <SimpleDonutChart 
                data={donutData} 
                labels={donutLabels} 
                colors={donutColors} 
              />
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper sx={{ p: 0 }}>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <DashboardButton variant="contained" size="small">View All</DashboardButton>
            </CardHeader>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={12} md={3} key={item}>
                    <Card sx={{ border: '1px solid #E6E9EE', boxShadow: 'none' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography sx={{ fontWeight: 500, color: '#1F1F1F' }}>
                            {item === 1 ? 'Missing Tourist' : item === 2 ? 'Theft Report' : item === 3 ? 'Medical Emergency' : 'Distress Signal'}
                          </Typography>
                          <Box sx={{ 
                            bgcolor: item === 1 ? '#FFD6D6' : item === 2 ? '#FFF3D6' : item === 3 ? '#D8E6FF' : '#FFD6D6', 
                            color: item === 1 ? '#FF4D4F' : item === 2 ? '#FFC53D' : item === 3 ? '#3A7AFE' : '#FF4D4F',
                            fontSize: '12px',
                            fontWeight: 500,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px'
                          }}>
                            {item === 1 ? 'Critical' : item === 2 ? 'Medium' : item === 3 ? 'Low' : 'Critical'}
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#595959', mb: 2 }}>
                          {item === 1 ? 'Tourist not checked in for 24+ hours' : 
                           item === 2 ? 'Passport & valuables stolen' : 
                           item === 3 ? 'Tourist requires medical attention' : 
                           'Panic button activated'}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ fontSize: '12px', color: '#8C8C8C' }}>
                            {item === 1 ? '25 mins ago' : item === 2 ? '2 hours ago' : item === 3 ? '3 hours ago' : '10 mins ago'}
                          </Typography>
                          <Button size="small" sx={{ color: '#3A7AFE', textTransform: 'none', padding: 0 }}>
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;