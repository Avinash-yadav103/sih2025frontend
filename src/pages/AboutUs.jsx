import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Avatar, Chip } from '@mui/material';

const AboutUs = () => {
  const objectives = [
    {
      title: "Heritage Promotion",
      description: "Preserve and showcase the rich cultural heritage of North Eastern states",
      icon: "🏛️",
      color: "#00497A"
    },
    {
      title: "Sustainable Tourism",
      description: "Develop eco-friendly tourism practices that benefit local communities",
      icon: "🌱",
      color: "#FF9800"
    },
    {
      title: "Economic Development",
      description: "Create employment opportunities through responsible tourism initiatives",
      icon: "💼",
      color: "#00497A"
    },
    {
      title: "Cultural Exchange",
      description: "Foster understanding between visitors and local tribal communities",
      icon: "🤝",
      color: "#FF9800"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      position: "Secretary, Tourism",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      experience: "15+ years"
    },
    {
      name: "Ms. Priya Sharma",
      position: "Joint Secretary",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b407?auto=format&fit=crop&w=150&h=150&q=80",
      experience: "12+ years"
    },
    {
      name: "Mr. Arun Singh",
      position: "Director, NE Tourism",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      experience: "10+ years"
    }
  ];

  const achievements = [
    { number: "2M+", label: "Annual Visitors", description: "Tourist footfall in NE region" },
    { number: "500+", label: "Tourism Projects", description: "Infrastructure developed" },
    { number: "1000+", label: "Local Guides", description: "Trained and certified" },
    { number: "50+", label: "Awards", description: "National recognition received" }
  ];

  const milestones = [
    { year: "2008", event: "Launch of PM Development Package for NER", amount: "₹53,000 Cr" },
    { year: "2017", event: "North East Industrial Development Scheme", amount: "₹3,000 Cr" },
    { year: "2022", event: "Destination North East Circuit", amount: "₹1,500 Cr" },
    { year: "2025", event: "Digital Tourism Initiative", amount: "₹800 Cr" }
  ];

  return (
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ color: '#00497A', fontWeight: '500', mb: 3 }}>
            About Us
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
          
          <Typography variant="h6" sx={{ color: '#666666', mb: 4, maxWidth: '800px', mx: 'auto', lineHeight: 1.7 }}>
            The North Eastern Tourism Portal is an initiative by the Ministry of Tourism, Government of India, 
            to promote the rich heritage, culture, and natural beauty of the North Eastern Region.
          </Typography>
        </Box>

        {/* Mission & Vision Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 4, 
              height: '100%',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ 
                  fontSize: '2rem', 
                  mr: 2,
                  width: '60px',
                  height: '60px',
                  bgcolor: '#00497A15',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  🎯
                </Box>
                <Typography variant="h5" sx={{ color: '#00497A', fontWeight: '500' }}>
                  Our Mission
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.7 }}>
                To provide tourists and stakeholders with authentic information, resources, and support for a memorable experience. 
                We aim to develop the North Eastern Region as a premier sustainable tourism destination while preserving its unique cultural identity.
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 4, 
              height: '100%',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ 
                  fontSize: '2rem', 
                  mr: 2,
                  width: '60px',
                  height: '60px',
                  bgcolor: '#FF980015',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  🔭
                </Box>
                <Typography variant="h5" sx={{ color: '#FF9800', fontWeight: '500' }}>
                  Our Vision
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.7 }}>
                To establish the North Eastern Region as a globally recognized destination for eco-tourism, cultural tourism, 
                and adventure tourism, ensuring the preservation of its pristine environment and rich cultural heritage for future generations.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Key Objectives */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Our Key Objectives
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {objectives.map((objective, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{
                p: 4,
                height: '100%',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ 
                    fontSize: '2.5rem', 
                    mr: 3,
                    width: '70px',
                    height: '70px',
                    bgcolor: `${objective.color}15`,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {objective.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: objective.color, fontWeight: '500', mb: 2 }}>
                      {objective.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666666', lineHeight: 1.6 }}>
                      {objective.description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Achievements Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Our Achievements
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {achievements.map((achievement, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 3,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Typography variant="h3" sx={{ color: index % 2 === 0 ? '#00497A' : '#FF9800', fontWeight: '500', mb: 1 }}>
                  {achievement.number}
                </Typography>
                <Typography variant="h6" sx={{ color: '#333333', fontWeight: '500', mb: 1 }}>
                  {achievement.label}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666' }}>
                  {achievement.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Leadership Team */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Leadership Team
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                p: 4, 
                textAlign: 'center',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Avatar
                  src={member.image}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
                />
                <Typography variant="h6" sx={{ color: '#333333', fontWeight: '500', mb: 1 }}>
                  {member.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#FF9800', fontWeight: '500', mb: 1 }}>
                  {member.position}
                </Typography>
                <Chip 
                  label={member.experience} 
                  size="small" 
                  sx={{ bgcolor: '#00497A15', color: '#00497A', fontWeight: '500' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Key Milestones Timeline */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Key Milestones
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {milestones.map((milestone, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{
                p: 3,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    width: '50px',
                    height: '50px',
                    bgcolor: index % 2 === 0 ? '#00497A' : '#FF9800',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '500',
                    mr: 3
                  }}>
                    {milestone.year}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: '#333333', fontWeight: '500', mb: 1 }}>
                      {milestone.event}
                    </Typography>
                    <Typography variant="body1" sx={{ color: index % 2 === 0 ? '#00497A' : '#FF9800', fontWeight: '500' }}>
                      {milestone.amount}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Closing Message */}
        <Box sx={{ 
          textAlign: 'center', 
          p: 6, 
          bgcolor: '#00497A', 
          color: 'white', 
          borderRadius: 3,
          mb: 8,
          backgroundImage: 'linear-gradient(135deg, #00497A 0%, #003359 100%)'
        }}>
          <Typography variant="h5" sx={{ fontWeight: '500', mb: 3 }}>
            Discover the Unexplored
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: '700px', mx: 'auto', lineHeight: 1.6 }}>
            Join us in exploring the vibrant festivals, diverse wildlife, breathtaking landscapes, and warm hospitality 
            of North East India. Connect with local communities and experience authentic cultural exchanges 
            that will create memories to last a lifetime.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;