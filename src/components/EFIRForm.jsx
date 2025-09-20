import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, TextField, Button, Grid, MenuItem,
  FormControl, InputLabel, Select, Paper, CircularProgress,
  Snackbar, Alert
} from '@mui/material';
import eFIRService from '../services/eFIRService';

const EFIRForm = ({ onSubmit, initialData = null, isEdit = false, relatedEntity = null }) => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    location: '',
    entity_type: '',
    related_entity_id: '',
    details: {}
  });

  // Load initial data if provided (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }));
    }
    
    // If we have a related entity (e.g., tourist or incident) but no initialData
    if (!initialData && relatedEntity) {
      const entityType = relatedEntity.passport_number ? 'tourist' : 'incident';
      
      let title = '';
      if (entityType === 'tourist') {
        title = `Missing Tourist Report - ${relatedEntity.name || 'Unknown'}`;
      } else {
        title = `Incident Report - ${relatedEntity.title || relatedEntity.type || 'Unknown'}`;
      }
      
      setFormData(prev => ({
        ...prev,
        title,
        entity_type: entityType,
        related_entity_id: relatedEntity.id,
        location: relatedEntity.last_known_location || relatedEntity.location || '',
        priority: entityType === 'tourist' ? 'high' : (relatedEntity.severity === 'critical' ? 'critical' : 'high'),
        details: {
          [entityType === 'tourist' ? 'tourist_data' : 'incident_data']: relatedEntity
        }
      }));
    }
  }, [initialData, relatedEntity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let result;
      if (isEdit && initialData?.id) {
        result = await eFIRService.updateEFIR(initialData.id, formData);
        showNotification('E-FIR updated successfully', 'success');
      } else {
        result = await eFIRService.createEFIR(formData);
        showNotification('E-FIR created successfully', 'success');
      }
      
      if (onSubmit) {
        onSubmit(result);
      }
    } catch (error) {
      console.error('Error submitting E-FIR:', error);
      showNotification(`Error: ${error.message || 'Failed to save E-FIR'}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, severity) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? 'Edit E-FIR' : 'Create New E-FIR'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
                disabled={loading}
              >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="resolved">Resolved</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                label="Priority"
                disabled={loading}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Entity Type</InputLabel>
              <Select
                name="entity_type"
                value={formData.entity_type}
                onChange={handleChange}
                label="Entity Type"
                disabled={loading || (relatedEntity !== null)}
              >
                <MenuItem value="tourist">Tourist</MenuItem>
                <MenuItem value="incident">Incident</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Related Entity ID"
              name="related_entity_id"
              value={formData.related_entity_id}
              onChange={handleChange}
              disabled={loading || (relatedEntity !== null)}
            />
          </Grid>
          
          {formData.entity_type === 'tourist' && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Tourist Details
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Seen Time"
                  name="last_seen"
                  type="datetime-local"
                  value={formData.details.last_seen || ''}
                  onChange={handleDetailsChange}
                  InputLabelProps={{ shrink: true }}
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Known Location"
                  name="last_known_location"
                  value={formData.details.last_known_location || ''}
                  onChange={handleDetailsChange}
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Appearance"
                  name="appearance"
                  value={formData.details.appearance || ''}
                  onChange={handleDetailsChange}
                  multiline
                  rows={2}
                  disabled={loading}
                />
              </Grid>
            </>
          )}
          
          {formData.entity_type === 'incident' && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Incident Details
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Incident Type"
                  name="incident_type"
                  value={formData.details.incident_type || ''}
                  onChange={handleDetailsChange}
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Incident Time"
                  name="incident_time"
                  type="datetime-local"
                  value={formData.details.incident_time || ''}
                  onChange={handleDetailsChange}
                  InputLabelProps={{ shrink: true }}
                  disabled={loading}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Incident Description"
                  name="incident_description"
                  value={formData.details.incident_description || ''}
                  onChange={handleDetailsChange}
                  multiline
                  rows={3}
                  disabled={loading}
                />
              </Grid>
            </>
          )}
          
          <Grid item xs={12}>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? <CircularProgress size={24} /> : (isEdit ? 'Update' : 'Submit')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default EFIRForm;