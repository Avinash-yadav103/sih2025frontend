import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  TextField, 
  MenuItem, 
  Avatar,
  Divider,
  Chip,
  Alert
} from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real application, this would send data to a server
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  const contactCategories = [
    'General Inquiry',
    'Tourism Information',
    'Scheme Application',
    'Permit Assistance',
    'Feedback/Complaint',
    'Media Inquiry',
    'Partnership Proposal',
    'Technical Support'
  ];

  const officeLocations = [
    {
      city: "Guwahati",
      state: "Assam",
      address: "Tourism Office, Guwahati - 781001",
      phone: "+91-361-XXXXXXX",
      email: "guwahati@netourism.gov.in",
      hours: "Mon-Fri: 9:30 AM - 5:30 PM"
    },
    {
      city: "Shillong",
      state: "Meghalaya",
      address: "Tourism Office, Shillong - 793001",
      phone: "+91-364-XXXXXXX",
      email: "shillong@netourism.gov.in",
      hours: "Mon-Fri: 9:30 AM - 5:30 PM"
    },
    {
      city: "Imphal",
      state: "Manipur",
      address: "Tourism Office, Imphal - 795001",
      phone: "+91-385-XXXXXXX",
      email: "imphal@netourism.gov.in",
      hours: "Mon-Fri: 9:30 AM - 5:30 PM"
    },
    {
      city: "Kohima",
      state: "Nagaland",
      address: "Tourism Office, Kohima - 797001",
      phone: "+91-370-XXXXXXX",
      email: "kohima@netourism.gov.in",
      hours: "Mon-Fri: 9:30 AM - 5:30 PM"
    }
  ];

  const quickLinks = [
    { title: "Tourist Helpline", info: "1363 (24/7 Toll-Free)", type: "phone" },
    { title: "Emergency Services", info: "100, 101, 102, 108", type: "emergency" },
    { title: "Incredible India", info: "www.incredibleindia.org", type: "website" },
    { title: "India Tourism WhatsApp", info: "+91-9711937364", type: "whatsapp" }
  ];

  const departmentContacts = [
    {
      department: "Tourism Development",
      officer: "Shri Rajesh Kumar",
      designation: "Joint Secretary",
      email: "js.tourism@netourism.gov.in",
      phone: "+91-11-XXXXXXXX"
    },
    {
      department: "Infrastructure Development",
      officer: "Ms. Priya Sharma",
      designation: "Director",
      email: "director.infra@netourism.gov.in",
      phone: "+91-11-XXXXXXXX"
    },
    {
      department: "Cultural Affairs",
      officer: "Dr. Arun Singh",
      designation: "Additional Director",
      email: "addl.director@netourism.gov.in",
      phone: "+91-11-XXXXXXXX"
    }
  ];

  return (
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ color: '#00497A', fontWeight: '500', mb: 3 }}>
            Contact Us
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
          <Typography variant="h6" sx={{ color: '#666666', maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            Get in touch with us for tourism information, assistance, feedback, or any queries 
            related to North Eastern Region development and tourism.
          </Typography>
        </Box>

        {/* Success Alert */}
        {showSuccess && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Your message has been submitted successfully! We will get back to you within 2-3 business days.
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ color: '#00497A', fontWeight: '500', mb: 3 }}>
                Send us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      required
                      value={formData.name}
                      onChange={handleInputChange('name')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      variant="outlined"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange('email')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      variant="outlined"
                      required
                      value={formData.category}
                      onChange={handleInputChange('category')}
                    >
                      {contactCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      required
                      value={formData.subject}
                      onChange={handleInputChange('subject')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      placeholder="Please provide detailed information about your inquiry..."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: '#00497A',
                        '&:hover': { bgcolor: '#003359' },
                        px: 4,
                        py: 1.5,
                        fontWeight: '500'
                      }}
                    >
                      Submit Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

          {/* Quick Contact Info */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#00497A', fontWeight: '500', mb: 3 }}>
                Ministry Contact
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Avatar sx={{ 
                  width: 60, 
                  height: 60, 
                  bgcolor: '#00497A',
                  mx: 'auto',
                  mb: 2
                }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                    alt="Government Emblem"
                    style={{ width: '40px', height: '40px', filter: 'brightness(0) invert(1)' }}
                  />
                </Avatar>
                <Typography variant="h6" sx={{ color: '#333333', fontWeight: '500', textAlign: 'center', mb: 1 }}>
                  Ministry of Tourism
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666', textAlign: 'center' }}>
                  North Eastern Region
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                  <strong>Email:</strong>
                </Typography>
                <Typography variant="body2">
                  <a href="mailto:info@netourism.gov.in" style={{ color: '#FF9800', textDecoration: 'none' }}>
                    info@netourism.gov.in
                  </a>
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                  <strong>Phone:</strong>
                </Typography>
                <Typography variant="body2">
                  <a href="tel:+91-11-23074868" style={{ color: '#FF9800', textDecoration: 'none' }}>
                    +91-11-2307-4868
                  </a>
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
                  <strong>Address:</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: '#333333' }}>
                  Transport Bhawan, 1, Parliament Street,<br />
                  New Delhi - 110001, India
                </Typography>
              </Box>
            </Card>

            {/* Quick Links */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ color: '#00497A', fontWeight: '500', mb: 3 }}>
                Quick Links
              </Typography>
              {quickLinks.map((link, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#666666', mb: 0.5 }}>
                    {link.title}
                  </Typography>
                  <Chip
                    label={link.info}
                    size="small"
                    sx={{
                      bgcolor: link.type === 'emergency' ? '#F44336' : '#FF980015',
                      color: link.type === 'emergency' ? 'white' : '#FF9800',
                      fontWeight: '500'
                    }}
                  />
                </Box>
              ))}
            </Card>
          </Grid>
        </Grid>

        {/* Regional Offices */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500', textAlign: 'center', mb: 4 }}>
            Regional Offices
          </Typography>
          <Grid container spacing={3}>
            {officeLocations.map((office, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{
                  p: 3,
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}>
                  <Avatar sx={{ 
                    width: 50, 
                    height: 50, 
                    bgcolor: index % 2 === 0 ? '#00497A' : '#FF9800',
                    mx: 'auto',
                    mb: 2,
                    fontSize: '1.2rem',
                    fontWeight: '500'
                  }}>
                    {office.city.charAt(0)}
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#333333', fontWeight: '500', textAlign: 'center', mb: 1 }}>
                    {office.city}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666', textAlign: 'center', mb: 2 }}>
                    {office.state}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333333', mb: 1 }}>
                    {office.address}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#FF9800', mb: 1 }}>
                    {office.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#00497A', mb: 1 }}>
                    {office.email}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666666' }}>
                    {office.hours}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Department Contacts */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ color: '#00497A', fontWeight: '500', textAlign: 'center', mb: 4 }}>
            Department Contacts
          </Typography>
          <Grid container spacing={4}>
            {departmentContacts.map((contact, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  p: 4,
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }
                }}>
                  <Typography variant="h6" sx={{ color: '#00497A', fontWeight: '500', mb: 2 }}>
                    {contact.department}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#333333', fontWeight: '500', mb: 1 }}>
                    {contact.officer}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666666', mb: 2 }}>
                    {contact.designation}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#FF9800', mb: 1 }}>
                    {contact.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#00497A' }}>
                    {contact.phone}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
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
            Visit Us in Person
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Our offices are open for public consultation. Prior appointment is recommended 
            for detailed discussions about tourism projects and schemes.
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
              boxShadow: '0 4px 16px rgba(255, 152, 0, 0.3)'
            }}
          >
            Schedule Appointment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;