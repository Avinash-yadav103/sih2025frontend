import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Button, Accordion, AccordionSummary, AccordionDetails, Chip, Avatar, LinearProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Schemes = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const majorSchemes = [
    {
      title: "North East Special Infrastructure Development Scheme (NESIDS)",
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80",
      desc: "100% centrally funded scheme to fill infrastructural gaps in the region and accelerate development.",
      budget: "₹2,000 Crores",
      duration: "2022-2026",
      status: "Active",
      progress: 65,
      ministry: "Ministry of DoNER",
      beneficiaries: "All 8 NE States",
      keyFeatures: [
        "Road connectivity improvement",
        "Digital infrastructure development",
        "Healthcare facility upgrades",
        "Educational infrastructure enhancement",
        "Water supply and sanitation projects"
      ],
      achievements: [
        "500+ km roads constructed",
        "200+ healthcare centers upgraded",
        "100+ schools digitally connected"
      ]
    },
    {
      title: "North East Industrial Development Scheme (NEIDS)",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      desc: "Promoting industrialization and employment generation in the northeastern states through financial incentives.",
      budget: "₹3,000 Crores",
      duration: "2017-2027",
      status: "Active",
      progress: 75,
      ministry: "Ministry of DoNER",
      beneficiaries: "Industries in NE Region",
      keyFeatures: [
        "Capital investment subsidy up to 30%",
        "Interest subsidy on working capital",
        "Employment generation incentives",
        "Technology upgradation support",
        "Marketing assistance"
      ],
      achievements: [
        "1,200+ industries benefited",
        "50,000+ jobs created",
        "₹8,000 Cr investment attracted"
      ]
    },
    {
      title: "Prime Minister's Development Package for NER",
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
      desc: "Comprehensive development package for transforming the Northeast into India's economic powerhouse.",
      budget: "₹53,000 Crores",
      duration: "2008-2030",
      status: "Active",
      progress: 80,
      ministry: "Multiple Ministries",
      beneficiaries: "All NE States & Citizens",
      keyFeatures: [
        "Railway network expansion",
        "Power sector development",
        "Telecommunication infrastructure",
        "Higher education initiatives",
        "Tourism infrastructure"
      ],
      achievements: [
        "2,000+ km railway lines",
        "5,000+ MW power generation",
        "100+ educational institutions"
      ]
    },
    {
      title: "Destination North East (DNE) Circuit",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      desc: "Tourism development scheme for promoting NE as a premier global tourist destination.",
      budget: "₹1,500 Crores",
      duration: "2022-2025",
      status: "Active",
      progress: 45,
      ministry: "Ministry of Tourism",
      beneficiaries: "Tourism Stakeholders",
      keyFeatures: [
        "Tourism infrastructure development",
        "Marketing and promotion activities",
        "Skill development for tourism sector",
        "Community-based tourism promotion",
        "Heritage conservation projects"
      ],
      achievements: [
        "300+ tourism projects sanctioned",
        "10,000+ people trained",
        "25% increase in tourist arrivals"
      ]
    },
    {
      title: "North East Venture Fund (NEVF)",
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=800&q=80",
      desc: "Fund to support startups and entrepreneurs in the Northeast for innovation-driven development.",
      budget: "₹100 Crores",
      duration: "2017-ongoing",
      status: "Active",
      progress: 60,
      ministry: "Ministry of DoNER",
      beneficiaries: "Startups & Entrepreneurs",
      keyFeatures: [
        "Seed funding for startups",
        "Mentorship and incubation support",
        "Technology transfer assistance",
        "Market linkage facilitation",
        "IP and patent support"
      ],
      achievements: [
        "200+ startups funded",
        "5,000+ jobs created",
        "₹500 Cr market value generated"
      ]
    },
    {
      title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY) - NE",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
      desc: "Skill development scheme specifically designed for NE youth with focus on regional requirements.",
      budget: "₹500 Crores",
      duration: "2016-ongoing",
      status: "Active",
      progress: 85,
      ministry: "Ministry of Skill Development",
      beneficiaries: "Youth in NE States",
      keyFeatures: [
        "Industry-relevant skill training",
        "Placement assistance guarantee",
        "Recognition of Prior Learning (RPL)",
        "Special focus on traditional skills",
        "Digital literacy programs"
      ],
      achievements: [
        "1,00,000+ youth trained",
        "80% placement rate achieved",
        "500+ training centers established"
      ]
    }
  ];

  const schemeCategories = [
    { name: "Infrastructure", count: 15, color: "#00497A", icon: "🏗️" },
    { name: "Industrial Development", count: 12, color: "#FF9800", icon: "🏭" },
    { name: "Education & Skill", count: 18, color: "#00497A", icon: "📚" },
    { name: "Tourism", count: 8, color: "#FF9800", icon: "🗺️" },
    { name: "Healthcare", count: 10, color: "#00497A", icon: "🏥" },
    { name: "Agriculture", count: 14, color: "#FF9800", icon: "🌾" }
  ];

  const impactStats = [
    { number: "₹60,000+", label: "Crores Allocated", description: "Total budget for NE development" },
    { number: "2M+", label: "Direct Beneficiaries", description: "People directly benefited" },
    { number: "100+", label: "Active Schemes", description: "Currently running programs" },
    { number: "25%", label: "GDP Growth", description: "Average annual growth rate" }
  ];

  return (
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ color: '#00497A', fontWeight: '500', mb: 3 }}>
            Government Schemes for North East
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
          <Typography variant="h6" sx={{ color: '#666666', maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            Comprehensive development schemes by the Government of India to accelerate growth and 
            transform the North Eastern Region into a vibrant economic hub.
          </Typography>
        </Box>

        {/* Impact Statistics */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {impactStats.map((stat, index) => (
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
                  {stat.number}
                </Typography>
                <Typography variant="h6" sx={{ color: '#333333', fontWeight: '500', mb: 1 }}>
                  {stat.label}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666' }}>
                  {stat.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Scheme Categories */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Scheme Categories
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {schemeCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{
                p: 3,
                textAlign: 'center',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Avatar sx={{ 
                  width: 60, 
                  height: 60, 
                  bgcolor: category.color,
                  mx: 'auto',
                  mb: 2,
                  fontSize: '1.8rem'
                }}>
                  {category.icon}
                </Avatar>
                <Typography variant="h6" sx={{ color: '#333333', fontWeight: '500', mb: 1 }}>
                  {category.name}
                </Typography>
                <Typography variant="h5" sx={{ color: category.color, fontWeight: '500' }}>
                  {category.count}+ Schemes
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Major Schemes */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500' }} gutterBottom>
            Major Development Schemes
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {majorSchemes.map((scheme, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{
                transition: '0.3s',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }
              }}>
                <Accordion
                  expanded={expandedAccordion === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      bgcolor: '#F5F7FA',
                      '&:hover': { bgcolor: '#E8F4FD' }
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={2}>
                        <img
                          src={scheme.image}
                          alt={scheme.title}
                          style={{ 
                            width: '100%', 
                            height: '80px', 
                            objectFit: 'cover', 
                            borderRadius: '8px' 
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ color: '#00497A', fontWeight: '500', mb: 1 }}>
                          {scheme.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666666' }}>
                          {scheme.desc}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                          <Box sx={{ textAlign: 'center', minWidth: '80px' }}>
                            <Typography variant="caption" sx={{ color: '#666666' }}>Budget</Typography>
                            <Typography variant="h6" sx={{ color: '#00497A', fontWeight: '500', fontSize: '1rem' }}>
                              {scheme.budget}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'center', minWidth: '80px' }}>
                            <Typography variant="caption" sx={{ color: '#666666' }}>Duration</Typography>
                            <Typography variant="body2" sx={{ color: '#FF9800', fontWeight: '500' }}>
                              {scheme.duration}
                            </Typography>
                          </Box>
                          <Chip 
                            label={scheme.status} 
                            size="small" 
                            sx={{ 
                              bgcolor: scheme.status === 'Active' ? '#4CAF50' : '#FF9800',
                              color: 'white',
                              fontWeight: '500'
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 4 }}>
                    <Grid container spacing={4}>
                      {/* Progress and Basic Info */}
                      <Grid item xs={12} md={4}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" sx={{ color: '#00497A', fontWeight: '500', mb: 2 }}>
                            Scheme Progress
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={scheme.progress} 
                              sx={{ 
                                flexGrow: 1, 
                                mr: 2, 
                                height: 8, 
                                borderRadius: 4,
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: scheme.progress > 70 ? '#4CAF50' : scheme.progress > 40 ? '#FF9800' : '#F44336'
                                }
                              }}
                            />
                            <Typography variant="body2" sx={{ color: '#666666', fontWeight: '500' }}>
                              {scheme.progress}%
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                            <strong>Ministry:</strong> {scheme.ministry}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#666666' }}>
                            <strong>Beneficiaries:</strong> {scheme.beneficiaries}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Key Features */}
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: '#00497A', fontWeight: '500', mb: 2 }}>
                          Key Features
                        </Typography>
                        <Box component="ul" sx={{ pl: 2, color: '#666666' }}>
                          {scheme.keyFeatures.map((feature, idx) => (
                            <Typography component="li" variant="body2" key={idx} sx={{ mb: 1 }}>
                              {feature}
                            </Typography>
                          ))}
                        </Box>
                      </Grid>

                      {/* Achievements */}
                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ color: '#00497A', fontWeight: '500', mb: 2 }}>
                          Key Achievements
                        </Typography>
                        <Box>
                          {scheme.achievements.map((achievement, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Box sx={{ 
                                width: 8, 
                                height: 8, 
                                bgcolor: '#FF9800', 
                                borderRadius: '50%', 
                                mr: 2 
                              }} />
                              <Typography variant="body2" sx={{ color: '#666666' }}>
                                {achievement}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          bgcolor: '#00497A', 
                          '&:hover': { bgcolor: '#003359' },
                          fontWeight: '500',
                          px: 4
                        }}
                      >
                        Learn More Details
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Application Process */}
        <Box sx={{ 
          textAlign: 'center', 
          p: 6, 
          bgcolor: '#00497A', 
          color: 'white', 
          borderRadius: 3,
          mb: 8,
          backgroundImage: 'linear-gradient(135deg, #00497A 0%, #003359 100%)'
        }}>
          <Typography variant="h4" sx={{ fontWeight: '500', mb: 2 }}>
            How to Apply for Government Schemes?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '700px', mx: 'auto' }}>
            Get information about eligibility criteria, application process, and required documents 
            for various government schemes available for the North Eastern Region.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: '#FF9800', 
              '&:hover': { bgcolor: '#F57C00' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: '500',
              boxShadow: '0 4px 16px rgba(255, 152, 0, 0.3)',
              mr: 2
            }}
          >
            Application Guidelines
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            sx={{ 
              borderColor: '#FF9800',
              color: '#FF9800',
              '&:hover': { 
                borderColor: '#F57C00',
                color: '#F57C00',
                bgcolor: 'rgba(255, 152, 0, 0.1)'
              },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: '500'
            }}
          >
            Contact Support
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Schemes;