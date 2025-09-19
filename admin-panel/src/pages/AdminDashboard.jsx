import { useState, useEffect, useRef } from 'react';
import { getCurrentUser, isAuthenticated, logout } from '../services/authService';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  // Form state management
  const [formStep, setFormStep] = useState(1);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [formData, setFormData] = useState({
    // Personal details
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    password: '',
    // Document details
    idType: '',
    idNumber: '',
    kycId: '',
    emergencyContact: '',
    // Itinerary details
    tripName: '',
    startDate: '',
    endDate: '',
    itineraryDays: [
      { day: 1, plan: '' }
    ]
  });

  useEffect(() => {
    // Check if user is authenticated, redirect if not
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    
    // Set user data
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create and set file preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  // Handle itinerary day changes
  const handleDayPlanChange = (index, value) => {
    const updatedDays = [...formData.itineraryDays];
    updatedDays[index].plan = value;
    setFormData({
      ...formData,
      itineraryDays: updatedDays
    });
  };

  // Add a new day to the itinerary
  const addItineraryDay = () => {
    const newDay = {
      day: formData.itineraryDays.length + 1,
      plan: ''
    };
    
    setFormData({
      ...formData,
      itineraryDays: [...formData.itineraryDays, newDay]
    });
  };

  // Remove a day from the itinerary
  const removeItineraryDay = (index) => {
    if (formData.itineraryDays.length > 1) {
      const updatedDays = formData.itineraryDays.filter((_, i) => i !== index);
      // Update day numbers
      const renumberedDays = updatedDays.map((day, i) => ({
        ...day,
        day: i + 1
      }));
      
      setFormData({
        ...formData,
        itineraryDays: renumberedDays
      });
    }
  };

  // Move to next step
  const goToNextStep = () => {
    setFormStep(2);
  };

  // Go back to previous step
  const goToPreviousStep = () => {
    setFormStep(1);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    // Create a FormData object to handle file upload
    const submissionData = new FormData();
    
    // Add all text fields
    Object.keys(formData).forEach(key => {
      if (key !== 'itineraryDays') {
        submissionData.append(key, formData[key]);
      }
    });
    
    // Format itinerary data
    const itineraryData = {
      tripName: formData.tripName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      details: {
        days: formData.itineraryDays
      }
    };
    
    // Add itinerary data as JSON
    submissionData.append('itinerary', JSON.stringify(itineraryData));
    
    // Add file as blob if it exists
    if (selectedFile) {
      // Convert file to blob and append to form data
      const fileBlob = new Blob([selectedFile], { type: selectedFile.type });
      submissionData.append('idDocument', fileBlob, selectedFile.name);
    }
    
    console.log('Submission data prepared with file:', selectedFile?.name);
    
    // For demonstration purposes, log the FormData entries
    for (let pair of submissionData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    try {
      // In a real application, you would send this data to your API
      // const response = await apiService.registerTourist(submissionData);
      // console.log('API Response:', response);
      
      // Reset form after submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        nationality: '',
        password: '',
        idType: '',
        idNumber: '',
        kycId: '',
        emergencyContact: '',
        tripName: '',
        startDate: '',
        endDate: '',
        itineraryDays: [
          { day: 1, plan: '' }
        ]
      });
      setSelectedFile(null);
      setFilePreview('');
      setFormStep(1);
      
      // Show success message
      alert('Tourist registered successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to register tourist. Please try again.');
    }
  };

  if (!user) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard-page">
      <header className="dashboard-header">
        <div className="header-logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Government Emblem" 
            className="dashboard-emblem" 
          />
          <h1>Tourism Admin</h1>
        </div>
        <div className="header-user">
          <span className="user-name">{user.name}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav className="dashboard-nav">
            <button 
              className={activeTab === 'overview' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={activeTab === 'tourists' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('tourists')}
            >
              Register Tourist
            </button>
            <button 
              className={activeTab === 'manage' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('manage')}
            >
              Manage Tourists
            </button>
            <button 
              className={activeTab === 'alerts' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('alerts')}
            >
              Emergency Alerts
            </button>
            <button 
              className={activeTab === 'reports' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            <button 
              className={activeTab === 'settings' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
        </aside>

        <main className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="dashboard-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-cards">
                <div className="stat-card">
                  <h3>Active Tourists</h3>
                  <p className="stat-value">127</p>
                </div>
                <div className="stat-card">
                  <h3>Registered Today</h3>
                  <p className="stat-value">24</p>
                </div>
                <div className="stat-card">
                  <h3>Emergency Alerts</h3>
                  <p className="stat-value alert">3</p>
                </div>
                <div className="stat-card">
                  <h3>Total Registrations</h3>
                  <p className="stat-value">1,453</p>
                </div>
              </div>
              
              <div className="dashboard-charts">
                <div className="chart">
                  <h3>Tourist Registration Trends</h3>
                  <div className="chart-placeholder">
                    Chart will be implemented here
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tourists' && (
            <div className="dashboard-section">
              <h2>Register New Tourist</h2>
              <p className="section-description">
                Register a new tourist after completing physical KYC verification.
              </p>
              
              <div className="tourist-registration">
                <h3>Tourist Information</h3>
                
                {/* Form Progress Indicator */}
                <div className="form-progress">
                  <div className={`progress-step ${formStep === 1 ? 'active' : formStep > 1 ? 'completed' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-label">Personal Details</div>
                  </div>
                  <div className="progress-bar"></div>
                  <div className={`progress-step ${formStep === 2 ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">Itinerary Details</div>
                  </div>
                </div>
                
                <form className="registration-form" onSubmit={handleSubmit}>
                  {/* Step 1: Personal Details */}
                  {formStep === 1 && (
                    <div className="form-step-container">
                      <div className="form-section">
                        <h4>Personal Details</h4>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Full Name</label>
                            <input 
                              type="text" 
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter tourist's full name" 
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input 
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter tourist's email" 
                              required
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input 
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Enter tourist's phone" 
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Nationality</label>
                            <select
                              name="nationality"
                              value={formData.nationality}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select Nationality</option>
                              <option value="indian">Indian</option>
                              <option value="foreigner">Foreigner</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Password</label>
                            <input 
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              placeholder="Create password for the tourist" 
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Emergency Contact</label>
                            <input 
                              type="tel"
                              name="emergencyContact"
                              value={formData.emergencyContact}
                              onChange={handleInputChange}
                              placeholder="Emergency contact number" 
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-section">
                        <h4>Document Details</h4>
                        <div className="form-row">
                          <div className="form-group">
                            <label>ID Type</label>
                            <select
                              name="idType"
                              value={formData.idType}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select ID Type</option>
                              <option value="aadhar">Aadhar Card</option>
                              <option value="passport">Passport</option>
                              <option value="driving">Driving License</option>
                              <option value="voter">Voter ID</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>ID Number</label>
                            <input 
                              type="text"
                              name="idNumber"
                              value={formData.idNumber}
                              onChange={handleInputChange}
                              placeholder="Enter ID number" 
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>KYC ID</label>
                          <input 
                            type="text"
                            name="kycId"
                            value={formData.kycId}
                            onChange={handleInputChange}
                            placeholder="KYC Identifier" 
                          />
                        </div>
                        <div className="form-group">
                          <label>Upload ID Document</label>
                          <div className="file-upload">
                            <input 
                              type="file" 
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              accept="image/*,.pdf"
                              style={{ display: 'none' }}
                            />
                            <button 
                              type="button" 
                              className="file-upload-btn"
                              onClick={handleChooseFile}
                            >
                              Choose File
                            </button>
                            <span className="file-name">
                              {selectedFile ? selectedFile.name : 'No file chosen'}
                            </span>
                          </div>
                          
                          {/* File Preview */}
                          {filePreview && (
                            <div className="file-preview">
                              <img 
                                src={filePreview} 
                                alt="Document preview" 
                                className="preview-image" 
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="form-actions">
                        <button 
                          type="button" 
                          className="primary-button"
                          onClick={goToNextStep}
                        >
                          Next: Itinerary Details
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Itinerary Details */}
                  {formStep === 2 && (
                    <div className="form-step-container">
                      <div className="form-section">
                        <h4>Itinerary Details</h4>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Trip Name</label>
                            <input 
                              type="text"
                              name="tripName"
                              value={formData.tripName}
                              onChange={handleInputChange}
                              placeholder="Enter trip name" 
                              required
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Start Date</label>
                            <input 
                              type="date"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>End Date</label>
                            <input 
                              type="date"
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="itinerary-days">
                          <h5>Daily Itinerary</h5>
                          {formData.itineraryDays.map((dayData, index) => (
                            <div className="itinerary-day" key={index}>
                              <div className="day-header">
                                <h6>Day {dayData.day}</h6>
                                {formData.itineraryDays.length > 1 && (
                                  <button 
                                    type="button" 
                                    className="remove-day-btn"
                                    onClick={() => removeItineraryDay(index)}
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                              <div className="form-group">
                                <label>Plan for Day {dayData.day}</label>
                                <textarea
                                  value={dayData.plan}
                                  onChange={(e) => handleDayPlanChange(index, e.target.value)}
                                  placeholder={`Enter plans for day ${dayData.day}`}
                                  rows="3"
                                  required
                                ></textarea>
                              </div>
                            </div>
                          ))}
                          
                          <button 
                            type="button" 
                            className="add-day-btn"
                            onClick={addItineraryDay}
                          >
                            + Add Another Day
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-actions">
                        <button 
                          type="button" 
                          className="secondary-button"
                          onClick={goToPreviousStep}
                        >
                          Back to Personal Details
                        </button>
                        <button 
                          type="submit" 
                          className="primary-button"
                        >
                          Register Tourist
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="dashboard-section">
              <h2>Manage Tourists</h2>
              <p>View and manage registered tourists</p>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="dashboard-section">
              <h2>Emergency Alerts</h2>
              <p>View and respond to emergency alerts</p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="dashboard-section">
              <h2>Reports</h2>
              <p>Generate and view reports</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="dashboard-section">
              <h2>Settings</h2>
              <p>Configure your dashboard settings</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;