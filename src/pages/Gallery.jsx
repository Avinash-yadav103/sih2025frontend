import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, Tabs, Tab, Dialog, DialogContent, IconButton, Chip, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Gallery = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('all');

  const categories = ['All', 'Wildlife', 'Landscapes', 'Culture', 'Festivals', 'Architecture', 'People'];

  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      title: "One-horned Rhinoceros at Kaziranga",
      category: "Wildlife",
      location: "Kaziranga National Park, Assam",
      description: "The iconic one-horned rhinoceros in its natural habitat at Kaziranga National Park, a UNESCO World Heritage Site."
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
      title: "Himalayan Peaks of Arunachal Pradesh",
      category: "Landscapes",
      location: "Tawang, Arunachal Pradesh",
      description: "Breathtaking view of snow-capped Himalayan peaks in the pristine valleys of Arunachal Pradesh."
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
      title: "Hornbill Festival Celebration",
      category: "Festivals",
      location: "Kohima, Nagaland",
      description: "Vibrant cultural performances during the famous Hornbill Festival, showcasing Naga tribal heritage."
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
      title: "Living Root Bridge",
      category: "Architecture",
      location: "Cherrapunji, Meghalaya",
      description: "The remarkable living root bridges of Meghalaya, created by training tree roots over decades."
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
      title: "Umiam Lake Serenity",
      category: "Landscapes",
      location: "Shillong, Meghalaya",
      description: "The serene waters of Umiam Lake surrounded by lush green hills in the Scotland of the East."
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
      title: "Gurudongmar Lake",
      category: "Landscapes",
      location: "North Sikkim",
      description: "The sacred high-altitude lake of Gurudongmar, one of the highest lakes in the world."
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1200&q=80",
      title: "Majuli Island Culture",
      category: "Culture",
      location: "Majuli, Assam",
      description: "Traditional life and culture on Majuli Island, the world's largest river island."
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
      title: "Traditional Dancer",
      category: "People",
      location: "Manipur",
      description: "A classical Manipuri dancer performing the graceful Raas Leela dance form."
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
      title: "Loktak Lake Floating Islands",
      category: "Landscapes",
      location: "Loktak Lake, Manipur",
      description: "The unique floating islands (phumdis) of Loktak Lake, home to the endangered Sangai deer."
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      title: "Dzükou Valley Flowers",
      category: "Landscapes",
      location: "Nagaland-Manipur Border",
      description: "The valley of flowers - Dzükou Valley during blooming season with spectacular natural beauty."
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80",
      title: "Red Panda in Wild",
      category: "Wildlife",
      location: "Singalila National Park, Sikkim",
      description: "The endangered red panda in its natural habitat in the forests of Sikkim."
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
      title: "Traditional Handicrafts",
      category: "Culture",
      location: "Various NE States",
      description: "Exquisite traditional handicrafts showcasing the rich artistic heritage of Northeast India."
    },
    {
      id: 13,
      url: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=1200&q=80",
      title: "Tawang Monastery",
      category: "Architecture",
      location: "Tawang, Arunachal Pradesh",
      description: "The largest monastery in India and second largest in the world, showcasing Tibetan Buddhist architecture."
    },
    {
      id: 14,
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
      title: "Tribal Festival Gathering",
      category: "Festivals",
      location: "Mizoram",
      description: "A vibrant tribal festival showcasing the rich cultural diversity of Mizoram's indigenous communities."
    },
    {
      id: 15,
      url: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=1200&q=80",
      title: "Tea Gardens of Assam",
      category: "Landscapes",
      location: "Jorhat, Assam",
      description: "The lush green tea plantations of Assam, producing some of the world's finest tea."
    }
  ];

  const filteredImages = selectedTab === 0 
    ? galleryImages 
    : galleryImages.filter(img => img.category === categories[selectedTab]);

  const handleImageClick = (index) => {
    const filteredIndex = filteredImages.findIndex(img => img.id === filteredImages[index].id);
    setSelectedImage(filteredIndex);
    setCurrentCategory(categories[selectedTab]);
    setOpenDialog(true);
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const categoryStats = categories.slice(1).map(category => ({
    name: category,
    count: galleryImages.filter(img => img.category === category).length,
    color: ['#00497A', '#FF9800', '#00497A', '#FF9800', '#00497A', '#FF9800'][categories.indexOf(category) - 1]
  }));

  return (
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ color: '#00497A', fontWeight: '500', mb: 3 }}>
            North East India Gallery
          </Typography>
          <Box sx={{ width: '100px', height: '4px', bgcolor: '#FF9800', mx: 'auto', mb: 4 }} />
          <Typography variant="h6" sx={{ color: '#666666', maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            Discover the breathtaking beauty, rich culture, and diverse wildlife of Northeast India 
            through our curated collection of photographs.
          </Typography>
        </Box>

        {/* Category Statistics */}
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {categoryStats.map((stat, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
              <Card sx={{ 
                textAlign: 'center', 
                p: 2,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <Typography variant="h5" sx={{ color: stat.color, fontWeight: '500', mb: 1 }}>
                  {stat.count}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666666', fontWeight: '500' }}>
                  {stat.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Category Tabs */}
        <Box sx={{ mb: 6 }}>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: '#666666',
                fontWeight: '500',
                textTransform: 'none',
                fontSize: '1rem'
              },
              '& .Mui-selected': {
                color: '#00497A',
                fontWeight: '500'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#FF9800',
                height: '3px'
              }
            }}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
        </Box>

        {/* Gallery Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {filteredImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card sx={{ 
                position: 'relative',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
                },
                '&:hover .overlay': {
                  opacity: 1
                }
              }}
              onClick={() => handleImageClick(index)}
              >
                <CardMedia
                  component="img"
                  height="280"
                  image={image.url}
                  alt={image.title}
                  sx={{ objectFit: 'cover' }}
                />
                
                {/* Overlay */}
                <Box 
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0, 73, 122, 0.8)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: '0.3s',
                    p: 3,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: '500', mb: 1 }}>
                    {image.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                    📍 {image.location}
                  </Typography>
                  <Chip 
                    label={image.category} 
                    size="small" 
                    sx={{ 
                      bgcolor: '#FF9800', 
                      color: 'white',
                      fontWeight: '500'
                    }}
                  />
                </Box>

                {/* Category Chip */}
                <Chip
                  label={image.category}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(0, 73, 122, 0.9)',
                    color: 'white',
                    fontWeight: '500'
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Image Count Info */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            Showing {filteredImages.length} {selectedTab === 0 ? '' : categories[selectedTab].toLowerCase()} images
          </Typography>
        </Box>

        {/* Lightbox Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: { 
              bgcolor: 'rgba(0, 0, 0, 0.95)',
              boxShadow: 'none'
            }
          }}
        >
          <DialogContent sx={{ p: 0, position: 'relative' }}>
            {/* Close Button */}
            <IconButton
              onClick={() => setOpenDialog(false)}
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                color: 'white',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>

            {/* Previous Button */}
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                zIndex: 1
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            {/* Next Button */}
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 20,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                zIndex: 1
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* Image */}
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={filteredImages[selectedImage]?.url}
                alt={filteredImages[selectedImage]?.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain'
                }}
              />
            </Box>

            {/* Image Info */}
            <Box sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              bgcolor: 'rgba(0, 0, 0, 0.8)', 
              color: 'white', 
              p: 3 
            }}>
              <Typography variant="h6" sx={{ fontWeight: '500', mb: 1 }}>
                {filteredImages[selectedImage]?.title}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                📍 {filteredImages[selectedImage]?.location}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {filteredImages[selectedImage]?.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip 
                  label={filteredImages[selectedImage]?.category} 
                  size="small" 
                  sx={{ 
                    bgcolor: '#FF9800', 
                    color: 'white',
                    fontWeight: '500'
                  }}
                />
                <Typography variant="caption" sx={{ ml: 2, opacity: 0.7 }}>
                  {selectedImage + 1} of {filteredImages.length}
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Gallery;