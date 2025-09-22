import React from 'react';
import { Box, Typography, Grid, Paper, Button, Card, CardContent, IconButton, Divider, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import WarningOutlined from '@mui/icons-material/WarningOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Enhanced styled components with modern design
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  height: '100%',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
  },
}));

const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '2px',
    background: 'linear-gradient(90deg, #3A7AFE, #7C3AED)',
    borderRadius: '1px',
  }
});

const CardTitle = styled(Typography)({
  color: '#1e293b',
  fontWeight: 700,
  fontSize: '18px',
  letterSpacing: '-0.025em',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const DashboardButton = styled(Button)({
  background: 'linear-gradient(135deg, #3A7AFE 0%, #7C3AED 100%)',
  color: '#FFFFFF',
  '&:hover': {
    background: 'linear-gradient(135deg, #2563eb 0%, #6d28d9 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(58, 122, 254, 0.4)',
  },
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(58, 122, 254, 0.3)',
  padding: '8px 20px',
  fontWeight: 600,
  borderRadius: '10px',
  transition: 'all 0.3s ease',
});

const LogoutButton = styled(Button)({
  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  color: '#FFFFFF',
  '&:hover': {
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
  },
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
  borderRadius: '10px',
  fontWeight: 600,
  transition: 'all 0.3s ease',
});

const StatCard = styled(Box)({
  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #3A7AFE, #7C3AED, #06b6d4)',
  }
});

const HeaderContainer = styled(Box)({
  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  borderRadius: '16px',
  padding: '24px',
  marginBottom: '24px',
  color: 'white',
  boxShadow: '0 8px 32px rgba(30, 41, 59, 0.3)',
});

const IconContainer = styled(Box)(({ color }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  '& .MuiSvgIcon-root': {
    color: color,
    fontSize: '24px',
  },
}));

// Enhanced chart components with animations
const SimpleBarChart = ({ data, labels, colors }) => {
  const maxValue = Math.max(...data);
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', mt: 2 }}>
      <Box sx={{ display: 'flex', flex: 1, mb: 1, alignItems: 'flex-end', gap: 1 }}>
        {data.map((value, index) => (
          <Box key={index} sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'relative',
          }}>
            <Typography sx={{ 
              fontSize: 10, 
              color: '#64748b', 
              mb: 1, 
              fontWeight: 600,
              position: 'absolute',
              top: -20,
              zIndex: 1,
            }}>
              {value}
            </Typography>
            <Box 
              sx={{ 
                width: '100%',
                height: `${(value / maxValue) * 100}%`, 
                background: `linear-gradient(180deg, ${colors[index % colors.length]} 0%, ${colors[index % colors.length]}80 100%)`,
                minHeight: '20px',
                borderRadius: '6px 6px 0 0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scaleY(1.05)',
                  filter: 'brightness(1.1)',
                },
                animation: `slideUp 0.6s ease ${index * 0.1}s both`,
                '@keyframes slideUp': {
                  from: { height: 0, opacity: 0 },
                  to: { height: `${(value / maxValue) * 100}%`, opacity: 1 },
                }
              }} 
            />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, px: 1 }}>
        {labels.map((label, index) => (
          <Typography key={index} sx={{ 
            fontSize: 12, 
            color: '#64748b', 
            flex: 1, 
            textAlign: 'center',
            fontWeight: 500,
          }}>
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const SimpleDonutChart = ({ data, labels, colors }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  let cumulative = 0;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
      <Box
        sx={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: `conic-gradient(${data.map((value, i) => {
            const startAngle = (cumulative / total) * 360;
            cumulative += value;
            const endAngle = (cumulative / total) * 360;
            return `${colors[i]} ${startAngle}deg ${endAngle}deg`;
          }).join(', ')})`,
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#64748b' }}>Total</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#1e293b' }}>{total}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 3, gap: 1 }}>
        {labels.map((label, i) => (
          <Chip
            key={i}
            label={`${label} (${data[i]})`}
            sx={{
              bgcolor: `${colors[i]}20`,
              color: colors[i],
              fontWeight: 600,
              fontSize: '12px',
              '&::before': {
                content: '""',
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: colors[i],
                marginRight: 1,
              }
            }}
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

const Dashboard = () => {
  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  // Sample chart data
  const touristData = [31, 40, 28, 51, 42, 65, 80];
  const alertData = [11, 15, 10, 17, 25, 21, 30];
  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const donutData = [65, 20, 10, 5];
  const donutLabels = ['Safe', 'Checked In', 'Overdue', 'Alert'];
  const donutColors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const statIcons = [PeopleIcon, SecurityIcon, LocationOnIcon, CheckCircleIcon];
  const statColors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981'];

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', 
      minHeight: '100vh',
      padding: '24px',
    }}>
      <HeaderContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ 
              color: 'white', 
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Police Command Center
            </Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '16px', fontWeight: 500 }}>
              Real-time monitoring and incident management
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton sx={{ 
              color: 'rgba(255,255,255,0.8)',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}>
              <NotificationsOutlined />
            </IconButton>
            <IconButton sx={{ 
              color: 'rgba(255,255,255,0.8)',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}>
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
      </HeaderContainer>
      
      {/* Enhanced Stats Overview Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Tourists', value: '2,845', change: '+12.5%', trend: 'up', period: 'Since last week' },
          { title: 'Active Alerts', value: '24', change: '+5.2%', trend: 'up', period: 'Since yesterday' },
          { title: 'Geofence Exits', value: '56', change: '+8.4%', trend: 'up', period: 'Since yesterday' },
          { title: 'Resolved Issues', value: '192', change: '+15.3%', trend: 'up', period: 'Since last week' }
        ].map((stat, index) => {
          const IconComponent = statIcons[index];
          const color = statColors[index];
          
          return (
            <Grid item xs={12} md={3} key={index}>
              <StatCard>
                <Box>
                  <IconContainer color={color}>
                    <IconComponent />
                  </IconContainer>
                  <Typography sx={{ color: '#64748b', fontSize: '14px', fontWeight: 600, mb: 1 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 700, mb: 2 }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    icon={stat.trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={stat.change}
                    sx={{
                      bgcolor: stat.trend === 'up' ? '#dcfce7' : '#fef2f2',
                      color: stat.trend === 'up' ? '#166534' : '#991b1b',
                      fontWeight: 600,
                      fontSize: '12px',
                    }}
                    size="small"
                  />
                  <Typography sx={{ color: '#64748b', fontSize: '12px' }}>
                    {stat.period}
                  </Typography>
                </Box>
              </StatCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Enhanced Charts and Data */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper sx={{ height: 'auto', p: 0 }}>
            <CardHeader>
              <CardTitle>
                <TrendingUpIcon sx={{ color: '#3A7AFE' }} />
                Tourist Activity Trends
              </CardTitle>
              <DashboardButton variant="contained" size="small">View Details</DashboardButton>
            </CardHeader>
            <Box sx={{ p: 3, height: '320px' }}>
              <Box sx={{ height: '280px' }}>
                <SimpleBarChart 
                  data={touristData} 
                  labels={weekLabels} 
                  colors={['#3b82f6', '#f59e0b']} 
                />
              </Box>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={4}>
          <StyledPaper sx={{ height: 'auto', p: 0 }}>
            <CardHeader>
              <CardTitle>
                <SecurityIcon sx={{ color: '#7C3AED' }} />
                Tourist Status
              </CardTitle>
              <IconButton size="small" sx={{ color: '#64748b' }}>
                <WarningOutlined fontSize="small" />
              </IconButton>
            </CardHeader>
            <Box sx={{ p: 3, height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <CardTitle>
                <WarningOutlined sx={{ color: '#ef4444' }} />
                Recent Incidents
              </CardTitle>
              <DashboardButton variant="contained" size="small">View All</DashboardButton>
            </CardHeader>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {[
                  { type: 'Missing Tourist', desc: 'Tourist not checked in for 24+ hours', priority: 'Critical', time: '25 mins ago', color: '#ef4444' },
                  { type: 'Theft Report', desc: 'Passport & valuables stolen', priority: 'Medium', time: '2 hours ago', color: '#f59e0b' },
                  { type: 'Medical Emergency', desc: 'Tourist requires medical attention', priority: 'Low', time: '3 hours ago', color: '#3b82f6' },
                  { type: 'Distress Signal', desc: 'Panic button activated', priority: 'Critical', time: '10 mins ago', color: '#ef4444' }
                ].map((incident, index) => (
                  <Grid item xs={12} md={3} key={index}>
                    <Card sx={{ 
                      border: '1px solid rgba(226, 232, 240, 0.8)',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
                      }
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography sx={{ fontWeight: 600, color: '#1e293b', fontSize: '16px' }}>
                            {incident.type}
                          </Typography>
                          <Chip
                            label={incident.priority}
                            sx={{
                              bgcolor: `${incident.color}15`,
                              color: incident.color,
                              fontWeight: 600,
                              fontSize: '11px',
                            }}
                            size="small"
                          />
                        </Box>
                        <Typography variant="body2" sx={{ color: '#64748b', mb: 3, lineHeight: 1.5 }}>
                          {incident.desc}
                        </Typography>
                        <Divider sx={{ mb: 2, bgcolor: 'rgba(226, 232, 240, 0.6)' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>
                            {incident.time}
                          </Typography>
                          <Button 
                            size="small" 
                            sx={{ 
                              color: '#3b82f6', 
                              textTransform: 'none', 
                              fontWeight: 600,
                              '&:hover': { bgcolor: '#eff6ff' }
                            }}
                          >
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