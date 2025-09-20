import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Box, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Autocomplete
} from '@mui/material';
import { createEFIR } from '../services/eFIRService';
import supabase from '../utils/supabase';

const INCIDENT_TYPES = [
  'THEFT',
  'ASSAULT',
  'HARASSMENT',
  'MISSING_PERSON',
  'MEDICAL_EMERGENCY',
  'DISTRESS_SIGNAL',
  'LOST_DOCUMENTS',
  'OTHER'
];

const SEVERITY_LEVELS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'CRITICAL', label: 'Critical' }
];

const EFIRForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    tourist_id: '',
    incident_type: '',
    description: '',
    location: '',
    severity: 'MEDIUM',
    reporter_details: {
      name: '',
      contact: '',
      relation: ''
    }
  });
  
  const [touristOptions, setTouristOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [loadingTourists, setLoadingTourists] = useState(false);
  const [touristSearch, setTouristSearch] = useState('');
  
  // Fetch tourists for autocomplete
  useEffect(() => {
    const fetchTourists = async () => {
      if (!touristSearch.trim()) return;
      
      setLoadingTourists(true);
      try {
        const { data, error } = await supabase
          .from('tourists')
          .select('id, name, passport_number, nationality')
          .or(`name.ilike.%${touristSearch}%, passport_number.ilike.%${touristSearch}%`)
          .limit(10);
          
        if (error) throw error;
        
        setTouristOptions(data.map(tourist => ({
          id: tourist.id,
          label: `${tourist.name} (${tourist.nationality || 'Unknown'}, ID: ${tourist.passport_number || 'Unknown'})`
        })));
      } catch (error) {
        console.error('Error fetching tourists:', error);
        setNotification({
          open: true,
          message: 'Failed to fetch tourists. Please try again.',
          severity: 'error'
        });
      } finally {
        setLoadingTourists(false);
      }
    };
    
    const timer = setTimeout(() => {
      fetchTourists();
    }, 500); // Debounce search
    
    return () => clearTimeout(timer);
  }, [touristSearch]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested fields (reporter_details)
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleTouristChange = (event, newValue) => {
    setSelectedTourist(newValue);
    if (newValue) {
      setFormData({
        ...formData,
        tourist_id: newValue.id
      });
    } else {
      setFormData({
        ...formData,
        tourist_id: ''
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.tourist_id || !formData.incident_type || !formData.description || !formData.location) {
      setNotification({
        open: true,
        message: 'Please fill all required fields',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    try {
      const result = await createEFIR({
        ...formData,
        is_automatic: false // This is a manually created E-FIR
      });
      
      setNotification({
        open: true,
        message: 'E-FIR created successfully!',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        tourist_id: '',
        incident_type: '',
        description: '',
        location: '',
        severity: 'MEDIUM',
        reporter_details: {
          name: '',
          contact: '',
          relation: ''
        }
      });
      setSelectedTourist(null);
      
      // Notify parent component
      if (onSubmitSuccess) {
        onSubmitSuccess(result);
      }
    } catch (error) {
      console.error('Error creating E-FIR:', error);
      setNotification({
        open: true,
        message: 'Failed to create E-FIR. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New E-FIR
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Tourist Selection */}
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              id="tourist-autocomplete"
              options={touristOptions}
              loading={loadingTourists}
              value={selectedTourist}
              onChange={handleTouristChange}
              onInputChange={(e, value) => setTouristSearch(value)}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Select Tourist" 
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingTourists ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          
          {/* Incident Type */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Incident Type</InputLabel>
              <Select
                name="incident_type"
                value={formData.incident_type}
                onChange={handleInputChange}
                label="Incident Type"
              >
                {INCIDENT_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Severity */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Severity</InputLabel>
              <Select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                label="Severity"
              >
                {SEVERITY_LEVELS.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Location */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </Grid>
          
          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          
          {/* Reporter Details Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Reporter Details
            </Typography>
          </Grid>
          
          {/* Reporter Name */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Reporter Name"
              name="reporter_details.name"
              value={formData.reporter_details.name}
              onChange={handleInputChange}
            />
          </Grid>
          
          {/* Reporter Contact */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Reporter Contact"
              name="reporter_details.contact"
              value={formData.reporter_details.contact}
              onChange={handleInputChange}
            />
          </Grid>
          
          {/* Reporter Relation */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Relation to Tourist"
              name="reporter_details.relation"
              value={formData.reporter_details.relation}
              onChange={handleInputChange}
            />
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Submitting...' : 'Submit E-FIR'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      
      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default EFIRForm;