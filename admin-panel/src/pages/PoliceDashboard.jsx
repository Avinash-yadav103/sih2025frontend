import { useState, useEffect, useRef } from 'react';
import '../styles/PoliceDashboard.css';

// Mock data for demonstration
import { 
  mockTourists, 
  mockAlerts, 
  mockIncidents, 
  mockUnits, 
  mockGeofences, 
  mockDevices 
} from "../mockData/policeData";

function PoliceDashboard() {
  // Authentication and user state
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('map');
  const [activeRoute, setActiveRoute] = useState('map');
  const [selectedId, setSelectedId] = useState(null);
  
  // Map related states
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapView, setMapView] = useState('clusters'); // clusters, heatmap, individual
  const [mapLayer, setMapLayer] = useState('standard'); // standard, satellite, terrain
  const [showPanel, setShowPanel] = useState(false);
  const [panelContent, setPanelContent] = useState('profile');
  const [filterValues, setFilterValues] = useState({
    riskLevel: [0, 100],
    touristType: 'all',
    deviceType: 'all',
    timeRange: 'today',
    onlyOptIn: false
  });
  
  // Data states
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [units, setUnits] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [devices, setDevices] = useState([]);
  
  // Selected items
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  
  // WebSocket connection
  const wsRef = useRef(null);
  
  useEffect(() => {
    // Check if police user is authenticated
    const isAuthenticated = localStorage.getItem('isPoliceAuthenticated') === 'true';
    if (!isAuthenticated) {
      window.location.href = '/police-login';
      return;
    }
    
    // Get police user data
    const userData = JSON.parse(localStorage.getItem('policeUser') || '{}');
    setUser(userData);
    
    // Load mock data
    setTourists(mockTourists);
    setAlerts(mockAlerts);
    setIncidents(mockIncidents);
    setUnits(mockUnits);
    setGeofences(mockGeofences);
    setDevices(mockDevices);
    
    // Initialize WebSocket connection for real-time updates
    initWebSocket();
    
    // Initialize map
    initMap();
    
    return () => {
      // Cleanup WebSocket connection
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);
  
  // Initialize WebSocket connection
  const initWebSocket = () => {
    // In a real app, this would connect to your backend WebSocket
    // wsRef.current = new WebSocket('ws://your-api-server/realtime?token=...');
    
    // Mock WebSocket events for demonstration
    const mockWS = {
      close: () => console.log('WebSocket closed'),
    };
    
    // Setup mock event listeners
    const mockEvents = [
      { type: 'location:update', interval: 10000 },
      { type: 'alert:new', interval: 30000 },
      { type: 'unit:update', interval: 8000 },
      { type: 'device:health', interval: 15000 }
    ];
    
    // Set up mock event timers
    const timers = mockEvents.map(event => {
      return setInterval(() => {
        handleRealtimeEvent(event.type, generateMockEventData(event.type));
      }, event.interval);
    });
    
    // Store mock WebSocket
    wsRef.current = mockWS;
    
    // Clean up timers
    return () => timers.forEach(timer => clearInterval(timer));
  };
  
  // Generate mock event data
  const generateMockEventData = (eventType) => {
    switch (eventType) {
      case 'location:update':
        const touristId = mockTourists[Math.floor(Math.random() * mockTourists.length)].touristId;
        return {
          touristId,
          lat: 27.33 + (Math.random() * 0.05),
          lon: 88.61 + (Math.random() * 0.05),
          speed: Math.floor(Math.random() * 10),
          ts: new Date().toISOString(),
          source: Math.random() > 0.5 ? 'app' : 'wearable'
        };
      case 'alert:new':
        if (Math.random() > 0.7) { // 30% chance to create a new alert
          return {
            alertId: `A-${Math.floor(Math.random() * 10000)}`,
            type: ['panic', 'geofence', 'anomaly', 'iot'][Math.floor(Math.random() * 4)],
            severity: Math.floor(Math.random() * 5) + 1,
            touristId: mockTourists[Math.floor(Math.random() * mockTourists.length)].touristId,
            lat: 27.33 + (Math.random() * 0.05),
            lon: 88.61 + (Math.random() * 0.05),
            ts: new Date().toISOString()
          };
        }
        return null;
      case 'unit:update':
        return {
          unitId: mockUnits[Math.floor(Math.random() * mockUnits.length)].unitId,
          lat: 27.33 + (Math.random() * 0.05),
          lon: 88.61 + (Math.random() * 0.05),
          status: ['available', 'enroute', 'on_scene', 'busy'][Math.floor(Math.random() * 4)]
        };
      case 'device:health':
        return {
          deviceId: mockDevices[Math.floor(Math.random() * mockDevices.length)].deviceId,
          touristId: mockTourists[Math.floor(Math.random() * mockTourists.length)].touristId,
          battery: Math.floor(Math.random() * 100),
          lastPing: new Date().toISOString()
        };
      default:
        return {};
    }
  };
  
  // Handle real-time events
  const handleRealtimeEvent = (eventType, data) => {
    if (!data) return;
    
    console.log(`Received ${eventType} event:`, data);
    
    switch (eventType) {
      case 'location:update':
        updateTouristLocation(data);
        break;
      case 'alert:new':
        addNewAlert(data);
        break;
      case 'unit:update':
        updateUnitStatus(data);
        break;
      case 'device:health':
        updateDeviceHealth(data);
        break;
      default:
        console.log('Unknown event type:', eventType);
    }
  };
  
  // Update tourist location on the map
  const updateTouristLocation = (data) => {
    setTourists(current => {
      return current.map(tourist => {
        if (tourist.touristId === data.touristId) {
          return {
            ...tourist,
            lat: data.lat,
            lon: data.lon,
            speed: data.speed,
            lastSeen: data.ts
          };
        }
        return tourist;
      });
    });
    
    // Update map marker if needed
    if (mapLoaded) {
      // In a real implementation, this would update the map marker
      // using a map library like Leaflet or Google Maps
      console.log('Map marker updated for tourist:', data.touristId);
    }
  };
  
  // Add a new alert
  const addNewAlert = (data) => {
    // Create new alert
    const newAlert = {
      alertId: data.alertId,
      touristId: data.touristId,
      type: data.type,
      severity: data.severity,
      lat: data.lat,
      lon: data.lon,
      ts: data.ts,
      status: 'new',
      assignedUnit: null,
      metadata: {
        battery: Math.floor(Math.random() * 100),
        deviceId: `D-${Math.floor(Math.random() * 100)}`
      }
    };
    
    setAlerts(current => [newAlert, ...current]);
    
    // Show notification for high severity alerts
    if (data.severity >= 4) {
      showAlertNotification(newAlert);
    }
  };
  
  // Update unit status
  const updateUnitStatus = (data) => {
    setUnits(current => {
      return current.map(unit => {
        if (unit.unitId === data.unitId) {
          return {
            ...unit,
            lat: data.lat,
            lon: data.lon,
            status: data.status
          };
        }
        return unit;
      });
    });
  };
  
  // Update device health
  const updateDeviceHealth = (data) => {
    setDevices(current => {
      return current.map(device => {
        if (device.deviceId === data.deviceId) {
          return {
            ...device,
            battery: data.battery,
            lastPing: data.lastPing
          };
        }
        return device;
      });
    });
  };
  
  // Show alert notification
  const showAlertNotification = (alert) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert-notification severity-' + alert.severity;
    notification.innerHTML = `
      <div class="notification-icon">!</div>
      <div class="notification-content">
        <div class="notification-title">${alert.type.toUpperCase()} ALERT</div>
        <div class="notification-body">
          Tourist ID: ${alert.touristId}<br>
          Location: ${alert.lat.toFixed(4)}, ${alert.lon.toFixed(4)}
        </div>
      </div>
      <div class="notification-actions">
        <button class="view-btn">View</button>
        <button class="dismiss-btn">×</button>
      </div>
    `;
    
    // Add to notification container
    const container = document.querySelector('.notifications-container') || document.body;
    container.appendChild(notification);
    
    // Add event listeners
    const viewBtn = notification.querySelector('.view-btn');
    const dismissBtn = notification.querySelector('.dismiss-btn');
    
    viewBtn.addEventListener('click', () => {
      setActiveRoute('alerts');
      setSelectedAlert(alert);
      notification.remove();
    });
    
    dismissBtn.addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 10000);
  };
  
  // Initialize map
  const initMap = () => {
    // This would normally use a mapping library like Leaflet, Google Maps, or Mapbox
    console.log('Initializing map...');
    
    // Simulate map loading
    setTimeout(() => {
      setMapLoaded(true);
      console.log('Map loaded');
    }, 1000);
  };

  // Assign unit to alert
  const assignUnitToAlert = (alertId, unitId) => {
    setAlerts(current => {
      return current.map(alert => {
        if (alert.alertId === alertId) {
          return {
            ...alert,
            status: 'assigned',
            assignedUnit: unitId
          };
        }
        return alert;
      });
    });
  };
  
  // Create incident from alert
  const createIncidentFromAlert = (alertId) => {
    const alert = alerts.find(a => a.alertId === alertId);
    if (!alert) return;
    
    const newIncident = {
      incidentId: `C-${Math.floor(Math.random() * 10000)}`,
      linkedAlerts: [alertId],
      touristIds: [alert.touristId],
      status: 'open',
      createdBy: user.id,
      severity: alert.severity,
      location: {
        lat: alert.lat,
        lon: alert.lon
      },
      timestamp: new Date().toISOString(),
      evidence: []
    };
    
    setIncidents(current => [newIncident, ...current]);
    
    // Update alert status
    setAlerts(current => {
      return current.map(a => {
        if (a.alertId === alertId) {
          return {
            ...a,
            status: 'incident_created'
          };
        }
        return a;
      });
    });
    
    return newIncident.incidentId;
  };
  
  // Generate E-FIR
  const generateEFIR = (incidentId) => {
    const incident = incidents.find(i => i.incidentId === incidentId);
    if (!incident) return;
    
    // In a real app, this would make an API call to generate the E-FIR
    console.log('Generating E-FIR for incident:', incidentId);
    
    // Mock E-FIR generation
    setTimeout(() => {
      // Update incident with E-FIR info
      setIncidents(current => {
        return current.map(inc => {
          if (inc.incidentId === incidentId) {
            return {
              ...inc,
              efir: {
                id: `EFIR-${Math.floor(Math.random() * 10000)}`,
                generatedAt: new Date().toISOString(),
                blockchainHash: `0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`,
                status: 'generated'
              }
            };
          }
          return inc;
        });
      });
      
      // Show success notification
      alert('E-FIR generated successfully!');
    }, 1500);
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('policeUser');
    localStorage.removeItem('isPoliceAuthenticated');
    window.location.href = '/';
  };
  
  // Navigate between routes
  const navigateTo = (route, id = null) => {
    setActiveRoute(route);
    setSelectedId(id);
    
    if (id) {
      // Load specific data based on ID and route
      switch (route) {
        case 'tourists':
          setSelectedTourist(tourists.find(t => t.touristId === id) || null);
          break;
        case 'alerts':
          setSelectedAlert(alerts.find(a => a.alertId === id) || null);
          break;
        case 'incidents':
          setSelectedIncident(incidents.find(i => i.incidentId === id) || null);
          break;
        default:
          break;
      }
    } else {
      // Reset selections when navigating to a list view
      setSelectedTourist(null);
      setSelectedAlert(null);
      setSelectedIncident(null);
      setSelectedUnit(null);
    }
  };
  
  // Handle map filter changes
  const handleFilterChange = (name, value) => {
    setFilterValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Render the component content based on active route
  const renderContent = () => {
    switch (activeRoute) {
      case 'map':
        return renderMapView();
      case 'alerts':
        return selectedId ? renderAlertDetail() : renderAlertsList();
      case 'tourists':
        return selectedId ? renderTouristProfile() : renderTouristsList();
      case 'incidents':
        return selectedId ? renderIncidentDetail() : renderIncidentsList();
      case 'dispatch':
        return renderDispatchCenter();
      case 'units':
        return renderUnitsList();
      case 'geofences':
        return renderGeofenceManager();
      case 'iot':
        return renderIoTDashboard();
      case 'reports':
        return renderReportsDashboard();
      case 'settings':
        return renderSettingsPage();
      case 'audit':
        return renderAuditLogs();
      default:
        return renderMapView();
    }
  };

  // Map View
  const renderMapView = () => (
    <div className="map-page">
      <div className="map-filters">
        <div className="filter-group">
          <label>Time Range:</label>
          <select 
            value={filterValues.timeRange}
            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
          >
            <option value="today">Today</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Risk Level:</label>
          <div className="range-slider">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={filterValues.riskLevel[1]} 
              onChange={(e) => handleFilterChange('riskLevel', [filterValues.riskLevel[0], parseInt(e.target.value)])}
            />
            <span>{filterValues.riskLevel[0]} - {filterValues.riskLevel[1]}</span>
          </div>
        </div>
        
        <div className="filter-group">
          <label>Tourist Type:</label>
          <select 
            value={filterValues.touristType}
            onChange={(e) => handleFilterChange('touristType', e.target.value)}
          >
            <option value="all">All Tourists</option>
            <option value="foreign">Foreign</option>
            <option value="domestic">Domestic</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Device Type:</label>
          <select 
            value={filterValues.deviceType}
            onChange={(e) => handleFilterChange('deviceType', e.target.value)}
          >
            <option value="all">All Devices</option>
            <option value="mobile">Mobile App</option>
            <option value="wearable">Wearable</option>
            <option value="tracker">Tracker</option>
          </select>
        </div>
        
        <div className="filter-group checkbox">
          <label>
            <input 
              type="checkbox" 
              checked={filterValues.onlyOptIn}
              onChange={(e) => handleFilterChange('onlyOptIn', e.target.checked)}
            />
            Show Only Opt-in Trackers
          </label>
        </div>
      </div>
      
      <div className="map-container">
        <div className="map-controls">
          <div className="view-controls">
            <button 
              className={mapView === 'clusters' ? 'active' : ''}
              onClick={() => setMapView('clusters')}
            >
              Clusters
            </button>
            <button 
              className={mapView === 'heatmap' ? 'active' : ''}
              onClick={() => setMapView('heatmap')}
            >
              Heatmap
            </button>
            <button 
              className={mapView === 'individual' ? 'active' : ''}
              onClick={() => setMapView('individual')}
            >
              Individual
            </button>
          </div>
          
          <div className="layer-controls">
            <button 
              className={mapLayer === 'standard' ? 'active' : ''}
              onClick={() => setMapLayer('standard')}
            >
              Standard
            </button>
            <button 
              className={mapLayer === 'satellite' ? 'active' : ''}
              onClick={() => setMapLayer('satellite')}
            >
              Satellite
            </button>
            <button 
              className={mapLayer === 'terrain' ? 'active' : ''}
              onClick={() => setMapLayer('terrain')}
            >
              Terrain
            </button>
          </div>
        </div>
        
        <div className="map-placeholder">
          {!mapLoaded ? (
            <div className="loading-map">Loading map...</div>
          ) : (
            <div className="map-content">
              <div className="map-legend">
                <h4>Legend</h4>
                <div className="legend-item">
                  <span className="risk-indicator high"></span> High Risk
                </div>
                <div className="legend-item">
                  <span className="risk-indicator medium"></span> Medium Risk
                </div>
                <div className="legend-item">
                  <span className="risk-indicator low"></span> Low Risk
                </div>
                <div className="legend-item">
                  <span className="status-icon moving"></span> Moving
                </div>
                <div className="legend-item">
                  <span className="status-icon idle"></span> Idle
                </div>
                <div className="legend-item">
                  <span className="status-icon sos"></span> SOS
                </div>
                <div className="legend-item">
                  <span className="status-icon offline"></span> Offline
                </div>
              </div>
              
              {/* This would be a real map in a production app */}
              <div className="mock-map-display">
                <p>Interactive map with {tourists.length} tourists</p>
                <p>Map view: {mapView}</p>
                <p>Map layer: {mapLayer}</p>
                <p>Click on a marker to view details</p>
                
                <div className="sample-markers">
                  {/* Just showing a few sample tourists for the mock UI */}
                  {tourists.slice(0, 5).map(tourist => (
                    <div 
                      key={tourist.touristId} 
                      className={`sample-marker risk-${tourist.safetyScore < 30 ? 'high' : tourist.safetyScore < 70 ? 'medium' : 'low'}`}
                      onClick={() => {
                        setSelectedTourist(tourist);
                        setShowPanel(true);
                        setPanelContent('profile');
                      }}
                    >
                      <span className="marker-id">{tourist.touristId}</span>
                    </div>
                  ))}
                  
                  {/* Sample alert markers */}
                  {alerts.filter(a => a.status === 'new').slice(0, 3).map(alert => (
                    <div 
                      key={alert.alertId} 
                      className={`sample-marker alert severity-${alert.severity}`}
                      onClick={() => {
                        navigateTo('alerts', alert.alertId);
                      }}
                    >
                      <span className="marker-id">!</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showPanel && (
        <div className="detail-panel">
          <div className="panel-header">
            <h3>Tourist Details</h3>
            <div className="panel-tabs">
              <button 
                className={panelContent === 'profile' ? 'active' : ''}
                onClick={() => setPanelContent('profile')}
              >
                Profile
              </button>
              <button 
                className={panelContent === 'track' ? 'active' : ''}
                onClick={() => setPanelContent('track')}
              >
                Live Track
              </button>
              <button 
                className={panelContent === 'timeline' ? 'active' : ''}
                onClick={() => setPanelContent('timeline')}
              >
                Timeline
              </button>
              <button 
                className={panelContent === 'evidence' ? 'active' : ''}
                onClick={() => setPanelContent('evidence')}
              >
                Evidence
              </button>
              <button 
                className={panelContent === 'actions' ? 'active' : ''}
                onClick={() => setPanelContent('actions')}
              >
                Actions
              </button>
            </div>
            <button className="close-panel" onClick={() => setShowPanel(false)}>×</button>
          </div>
          
          <div className="panel-content">
            {panelContent === 'profile' && selectedTourist && (
              <div className="tourist-profile">
                <h4>{selectedTourist.name}</h4>
                <div className="profile-detail">
                  <strong>Tourist ID:</strong> {selectedTourist.touristId}
                </div>
                <div className="profile-detail">
                  <strong>Digital ID Hash:</strong>
                  <span className="hash">{selectedTourist.digitalIdHash}</span>
                </div>
                <div className="profile-detail">
                  <strong>KYC:</strong> {selectedTourist.kyc.type} ({selectedTourist.kyc.number})
                </div>
                <div className="profile-detail">
                  <strong>Safety Score:</strong>
                  <div className="safety-score">
                    <div 
                      className="score-bar" 
                      style={{
                        width: `${selectedTourist.safetyScore}%`,
                        backgroundColor: selectedTourist.safetyScore < 30 ? '#ff4d4f' : 
                                         selectedTourist.safetyScore < 70 ? '#faad14' : '#52c41a'
                      }}
                    ></div>
                    <span className="score-text">{selectedTourist.safetyScore}</span>
                  </div>
                </div>
                
                <h5>Itinerary</h5>
                {selectedTourist.itinerary.map((item, idx) => (
                  <div className="itinerary-item" key={idx}>
                    <div className="date-range">
                      {new Date(item.start).toLocaleDateString()} - {new Date(item.end).toLocaleDateString()}
                    </div>
                    <div className="locations">
                      {item.locations.join(' → ')}
                    </div>
                  </div>
                ))}
                
                <h5>Emergency Contacts</h5>
                {selectedTourist.emergencyContacts.map((contact, idx) => (
                  <div className="emergency-contact" key={idx}>
                    <div>{contact.name} ({contact.relation})</div>
                    <div>{contact.phone}</div>
                  </div>
                ))}
                
                <div className="profile-detail">
                  <strong>Consent:</strong> 
                  {selectedTourist.consent.optInTracking ? 
                    <span className="consent-status granted">Tracking Enabled</span> : 
                    <span className="consent-status denied">Tracking Disabled</span>
                  }
                  <div className="timestamp">
                    Updated: {new Date(selectedTourist.consent.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
            
            {panelContent === 'track' && selectedTourist && (
              <div className="live-track">
                <div className="track-info">
                  <div className="track-detail">
                    <strong>Last Seen:</strong> {new Date(selectedTourist.lastSeen || new Date()).toLocaleString()}
                  </div>
                  <div className="track-detail">
                    <strong>Location:</strong> {selectedTourist.lat.toFixed(4)}, {selectedTourist.lon.toFixed(4)}
                  </div>
                  <div className="track-detail">
                    <strong>Speed:</strong> {selectedTourist.speed || 0} km/h
                  </div>
                </div>
                
                <div className="track-map-mini">
                  <div className="mini-map-placeholder">
                    <p>Mini map with recent path</p>
                  </div>
                </div>
                
                <div className="track-playback">
                  <h5>Playback</h5>
                  <div className="playback-controls">
                    <button>Last 1h</button>
                    <button>Last 4h</button>
                    <button>Last 24h</button>
                    <button className="custom-range-btn">Custom Range</button>
                  </div>
                  <div className="playback-timeline">
                    <input type="range" min="0" max="100" value="0" />
                  </div>
                </div>
              </div>
            )}
            
            {panelContent === 'timeline' && selectedTourist && (
              <div className="tourist-timeline">
                <div className="timeline-event">
                  <div className="event-time">09:45 AM</div>
                  <div className="event-type location-ping">Location Ping</div>
                  <div className="event-details">Gangtok, Main Market</div>
                </div>
                
                <div className="timeline-event">
                  <div className="event-time">09:30 AM</div>
                  <div className="event-type geofence">Geofence Entry</div>
                  <div className="event-details">Entered: Tourist Zone 3</div>
                </div>
                
                <div className="timeline-event">
                  <div className="event-time">09:00 AM</div>
                  <div className="event-type location-ping">Location Ping</div>
                  <div className="event-details">Gangtok, Hotel Himalayan</div>
                </div>
                
                <div className="timeline-event">
                  <div className="event-time">08:45 AM</div>
                  <div className="event-type device">Device Connection</div>
                  <div className="event-details">Wearable device connected</div>
                </div>
              </div>
            )}
            
            {panelContent === 'evidence' && selectedTourist && (
              <div className="evidence-collection">
                <p className="no-evidence">No evidence linked to this tourist.</p>
                
                <div className="evidence-actions">
                  <button className="primary-button">Request CCTV Footage</button>
                  <button className="secondary-button">Link External Evidence</button>
                </div>
              </div>
            )}
            
            {panelContent === 'actions' && selectedTourist && (
              <div className="tourist-actions">
                <div className="action-buttons">
                  <button className="action-button call">
                    <span className="icon">📞</span>
                    <span className="label">Call Tourist</span>
                  </button>
                  
                  <button className="action-button message">
                    <span className="icon">✉️</span>
                    <span className="label">Send Message</span>
                  </button>
                  
                  <button className="action-button voice">
                    <span className="icon">🔊</span>
                    <span className="label">Voice Session</span>
                  </button>
                  
                  <button className="action-button dispatch">
                    <span className="icon">🚔</span>
                    <span className="label">Dispatch Unit</span>
                  </button>
                  
                  <button className="action-button missing">
                    <span className="icon">🔍</span>
                    <span className="label">Mark as Missing</span>
                  </button>
                  
                  <button className="action-button case">
                    <span className="icon">📁</span>
                    <span className="label">Create Case</span>
                  </button>
                </div>
                
                <div className="quick-note">
                  <h5>Add Quick Note</h5>
                  <textarea placeholder="Type a note about this tourist..."></textarea>
                  <button className="primary-button">Save Note</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="dispatch-tray">
        <div className="tray-header">
          <h3>Ongoing Incidents</h3>
          <button className="tray-toggle">▼</button>
        </div>
        <div className="tray-content">
          {incidents.filter(i => i.status === 'open').slice(0, 3).map(incident => (
            <div className="incident-card" key={incident.incidentId}>
              <div className="incident-info">
                <div className="incident-id">{incident.incidentId}</div>
                <div className="incident-type">
                  {incident.linkedAlerts.length > 0 ? 
                    alerts.find(a => a.alertId === incident.linkedAlerts[0])?.type || 'Unknown' : 
                    'Manual'
                  }
                </div>
                <div className="incident-severity severity-{incident.severity}">
                  {Array(incident.severity).fill('●').join('')}
                </div>
              </div>
              <div className="tourist-ids">
                {incident.touristIds.map(id => (
                  <span key={id} className="tourist-tag">{id}</span>
                ))}
              </div>
              <div className="incident-units">
                {incident.assignedUnits ? (
                  incident.assignedUnits.map(unit => (
                    <span key={unit} className="unit-tag">{unit}</span>
                  ))
                ) : (
                  <button className="assign-unit-btn" onClick={() => navigateTo('incidents', incident.incidentId)}>
                    Assign Unit
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {incidents.filter(i => i.status === 'open').length === 0 && (
            <div className="no-incidents">
              No ongoing incidents
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Alerts List
  const renderAlertsList = () => (
    <div className="alerts-page">
      <h2>Alert Inbox</h2>
      
      <div className="filters-bar">
        <div className="filter-group">
          <label>Status:</label>
          <select>
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="assigned">Assigned</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Severity:</label>
          <select>
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Type:</label>
          <select>
            <option value="all">All</option>
            <option value="panic">Panic</option>
            <option value="geofence">Geofence</option>
            <option value="anomaly">Anomaly</option>
            <option value="iot">IoT</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Time Range:</label>
          <select>
            <option value="24h">Last 24h</option>
            <option value="7d">Last 7d</option>
            <option value="30d">Last 30d</option>
          </select>
        </div>
      </div>
      
      <div className="alerts-table">
        <table>
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Time</th>
              <th>Severity</th>
              <th>Tourist</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Assigned Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.alertId} className={alert.status === 'new' ? 'new-alert' : ''}>
                <td>{alert.alertId}</td>
                <td>{new Date(alert.ts).toLocaleString()}</td>
                <td className={`severity-cell severity-${alert.severity}`}>
                  {Array(alert.severity).fill('●').join('')}
                </td>
                <td>
                  <button 
                    className="link-button"
                    onClick={() => navigateTo('tourists', alert.touristId)}
                  >
                    {alert.touristId}
                  </button>
                </td>
                <td className={`alert-type ${alert.type}`}>{alert.type}</td>
                <td>{alert.lat.toFixed(4)}, {alert.lon.toFixed(4)}</td>
                <td className={`status-cell ${alert.status}`}>{alert.status}</td>
                <td>
                  {alert.assignedUnit ? (
                    <span className="assigned-unit">{alert.assignedUnit}</span>
                  ) : (
                    <span className="no-unit">—</span>
                  )}
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn view"
                    onClick={() => navigateTo('alerts', alert.alertId)}
                    title="View Details"
                  >
                    👁️
                  </button>
                  
                  <button 
                    className="action-btn map"
                    onClick={() => {
                      setActiveRoute('map');
                      // In a real app, this would center the map on the alert location
                    }}
                    title="View on Map"
                  >
                    🗺️
                  </button>
                  
                  <button 
                    className="action-btn assign"
                    disabled={alert.status !== 'new'}
                    onClick={() => {
                      // Show assign unit UI
                      navigateTo('alerts', alert.alertId);
                    }}
                    title="Assign Unit"
                  >
                    🚔
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Alert Detail
  const renderAlertDetail = () => {
    if (!selectedAlert) return <div>Loading alert details...</div>;
    
    const relatedTourist = tourists.find(t => t.touristId === selectedAlert.touristId);
    
    return (
      <div className="alert-detail-page">
        <div className="detail-header">
          <button className="back-button" onClick={() => navigateTo('alerts')}>
            ← Back to Alerts
          </button>
          <h2>Alert Details: {selectedAlert.alertId}</h2>
        </div>
        
        <div className="alert-info-grid">
          <div className="alert-card">
            <h3>Alert Information</h3>
            <div className="info-row">
              <div className="info-label">Type:</div>
              <div className={`info-value alert-type ${selectedAlert.type}`}>{selectedAlert.type}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Severity:</div>
              <div className={`info-value severity-${selectedAlert.severity}`}>
                {Array(selectedAlert.severity).fill('●').join('')}
              </div>
            </div>
            <div className="info-row">
              <div className="info-label">Timestamp:</div>
              <div className="info-value">{new Date(selectedAlert.ts).toLocaleString()}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Location:</div>
              <div className="info-value">{alert.lat.toFixed(4)}, {alert.lon.toFixed(4)}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Status:</div>
              <div className={`info-value status-${selectedAlert.status}`}>{selectedAlert.status}</div>
            </div>
            <div className="info-row">
              <div className="info-label">Device Info:</div>
              <div className="info-value">
                ID: {selectedAlert.metadata.deviceId}, Battery: {selectedAlert.metadata.battery}%
              </div>
            </div>
          </div>
          
          {relatedTourist && (
            <div className="tourist-card">
              <h3>Tourist Information</h3>
              <div className="tourist-header">
                <div className="tourist-name">{relatedTourist.name}</div>
                <div className="tourist-id">{relatedTourist.touristId}</div>
              </div>
              <div className="info-row">
                <div className="info-label">KYC:</div>
                <div className="info-value">{relatedTourist.kyc.type} ({relatedTourist.kyc.number})</div>
              </div>
              <div className="info-row">
                <div className="info-label">Safety Score:</div>
                <div className="info-value">
                  <div className="safety-score">
                    <div 
                      className="score-bar" 
                      style={{
                        width: `${relatedTourist.safetyScore}%`,
                        backgroundColor: relatedTourist.safetyScore < 30 ? '#ff4d4f' : 
                                         relatedTourist.safetyScore < 70 ? '#faad14' : '#52c41a'
                      }}
                    ></div>
                    <span className="score-text">{relatedTourist.safetyScore}</span>
                  </div>
                </div>
              </div>
              <div className="info-row">
                <div className="info-label">Current Trip:</div>
                <div className="info-value">
                  {relatedTourist.itinerary[0]?.locations.join(' → ')}
                </div>
              </div>
              <div className="info-row">
                <div className="info-label">Emergency Contact:</div>
                <div className="info-value">
                  {relatedTourist.emergencyContacts[0]?.name} ({relatedTourist.emergencyContacts[0]?.phone})
                </div>
              </div>
              
              <div className="card-actions">
                <button className="secondary-button" onClick={() => navigateTo('tourists', relatedTourist.touristId)}>
                  View Full Profile
                </button>
              </div>
            </div>
          )}
          
          <div className="map-card">
            <h3>Alert Location</h3>
            <div className="mini-map-container">
              {/* This would be an actual map in a production app */}
              <div className="mini-map-placeholder">
                <p>Map showing alert location</p>
                <p>Lat: {selectedAlert.lat.toFixed(4)}, Lon: {selectedAlert.lon.toFixed(4)}</p>
              </div>
            </div>
            <div className="card-actions">
              <button className="secondary-button" onClick={() => setActiveRoute('map')}>
                View on Main Map
              </button>
            </div>
          </div>
          
          <div className="dispatch-card">
            <h3>Dispatch Unit</h3>
            {selectedAlert.assignedUnit ? (
              <div className="assigned-unit-info">
                <div className="info-row">
                  <div className="info-label">Assigned Unit:</div>
                  <div className="info-value">{selectedAlert.assignedUnit}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Status:</div>
                  <div className="info-value">En Route</div>
                </div>
                <div className="info-row">
                  <div className="info-label">ETA:</div>
                  <div className="info-value">10 minutes</div>
                </div>
                
                <div className="card-actions">
                  <button className="secondary-button">Reassign Unit</button>
                  <button className="primary-button">Contact Unit</button>
                </div>
              </div>
            ) : (
              <div className="dispatch-units">
                <h4>Nearby Units</h4>
                <div className="units-list">
                  {units.filter(u => u.status === 'available').slice(0, 3).map(unit => (
                    <div className="unit-item" key={unit.unitId}>
                      <div className="unit-info">
                        <div className="unit-id">{unit.unitId}</div>
                        <div className="unit-status">{unit.status}</div>
                        <div className="unit-distance">~2.4 km away</div>
                      </div>
                      <button 
                        className="dispatch-btn"
                        onClick={() => assignUnitToAlert(selectedAlert.alertId, unit.unitId)}
                      >
                        Dispatch
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="alert-actions">
          <button 
            className="action-btn mark-false-positive"
            disabled={selectedAlert.status !== 'new'}
          >
            Mark as False Positive
          </button>
          
          <button 
            className="action-btn call-tourist"
            onClick={() => {
              // In a real app, this would initiate a call to the tourist
              alert(`Initiating call to tourist ${selectedAlert.touristId}`);
            }}
          >
            Call Tourist
          </button>
          
          <button 
            className="action-btn send-message"
            onClick={() => {
              // In a real app, this would open a message dialog
              alert(`Send message to tourist ${selectedAlert.touristId}`);
            }}
          >
            Send Message
          </button>
          
          <button 
            className="action-btn create-incident"
            disabled={selectedAlert.status !== 'new' && selectedAlert.status !== 'assigned'}
            onClick={() => {
              const incidentId = createIncidentFromAlert(selectedAlert.alertId);
              if (incidentId) {
                navigateTo('incidents', incidentId);
              }
            }}
          >
            Create Incident
          </button>
        </div>
      </div>
    );
  };
  
  // Tourist List
  const renderTouristsList = () => (
    <div className="tourists-page">
      <h2>Tourist Directory</h2>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by name, ID, phone, or passport..." 
        />
        <button className="search-btn">Search</button>
        
        <div className="advanced-filters">
          <button className="filter-toggle">Advanced Filters</button>
        </div>
      </div>
      
      <div className="tourists-table">
        <table>
          <thead>
            <tr>
              <th>Tourist ID</th>
              <th>Name</th>
              <th>KYC</th>
              <th>Safety Score</th>
              <th>Current Location</th>
              <th>Status</th>
              <th>Consent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tourists.map(tourist => (
              <tr key={tourist.touristId}>
                <td>{tourist.touristId}</td>
                <td>{tourist.name}</td>
                <td>{tourist.kyc.type} ({tourist.kyc.number})</td>
                <td>
                  <div className="safety-score table-score">
                    <div 
                      className="score-bar" 
                      style={{
                        width: `${tourist.safetyScore}%`,
                        backgroundColor: tourist.safetyScore < 30 ? '#ff4d4f' : 
                                         tourist.safetyScore < 70 ? '#faad14' : '#52c41a'
                      }}
                    ></div>
                    <span className="score-text">{tourist.safetyScore}</span>
                  </div>
                </td>
                <td>{tourist.lat ? `${tourist.lat.toFixed(4)}, ${tourist.lon.toFixed(4)}` : 'Unknown'}</td>
                <td className={`status-cell ${tourist.status || 'active'}`}>{tourist.status || 'Active'}</td>
                <td>
                  {tourist.consent.optInTracking ? 
                    <span className="consent-status granted">Enabled</span> : 
                    <span className="consent-status denied">Disabled</span>
                  }
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn view"
                    onClick={() => navigateTo('tourists', tourist.touristId)}
                    title="View Profile"
                  >
                    👁️
                  </button>
                  
                  <button 
                    className="action-btn map"
                    onClick={() => {
                      setActiveRoute('map');
                      // In a real app, this would center the map on the tourist location
                    }}
                    title="View on Map"
                  >
                    🗺️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Tourist Profile
  const renderTouristProfile = () => {
    if (!selectedTourist) return <div>Loading tourist profile...</div>;
    
    return (
      <div className="tourist-detail-page">
        <div className="detail-header">
          <button className="back-button" onClick={() => navigateTo('tourists')}>
            ← Back to Tourists
          </button>
          <h2>Tourist Profile: {selectedTourist.name}</h2>
        </div>
        
        <div className="profile-tabs">
          <button className="tab-button active">Summary</button>
          <button className="tab-button">Live Track</button>
          <button className="tab-button">Timeline</button>
          <button className="tab-button">Device & Health</button>
          <button className="tab-button">Consent & Privacy</button>
        </div>
        
        <div className="profile-content">
          <div className="profile-summary active">
            <div className="profile-header">
              <div className="tourist-basic-info">
                <h3>{selectedTourist.name}</h3>
                <div className="tourist-id">{selectedTourist.touristId}</div>
                <div className="digital-id">
                  <span className="label">Digital ID Hash:</span>
                  <span className="hash">{selectedTourist.digitalIdHash}</span>
                  <button className="verify-btn" title="Verify on Blockchain">
                    ✓
                  </button>
                </div>
              </div>
              
              <div className="tourist-safety">
                <h4>Safety Score</h4>
                <div className="safety-score large">
                  <div 
                    className="score-bar" 
                    style={{
                      width: `${selectedTourist.safetyScore}%`,
                      backgroundColor: selectedTourist.safetyScore < 30 ? '#ff4d4f' : 
                                       selectedTourist.safetyScore < 70 ? '#faad14' : '#52c41a'
                    }}
                  ></div>
                  <span className="score-text">{selectedTourist.safetyScore}</span>
                </div>
                <div className="safety-factors">
                  <div className="factor">Region Risk: Medium</div>
                  <div className="factor">Previous Incidents: None</div>
                  <div className="factor">Device Health: Good</div>
                </div>
              </div>
            </div>
            
            <div className="profile-grid">
              <div className="grid-section kyc-info">
                <h4>KYC Information</h4>
                <div className="info-row">
                  <div className="info-label">Document Type:</div>
                  <div className="info-value">{selectedTourist.kyc.type}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Document Number:</div>
                  <div className="info-value">{selectedTourist.kyc.number}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Nationality:</div>
                  <div className="info-value">Indian</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Verification Status:</div>
                  <div className="info-value status-verified">Verified</div>
                </div>
              </div>
              
              <div className="grid-section itinerary">
                <h4>Itinerary</h4>
                {selectedTourist.itinerary.map((item, idx) => (
                  <div className="itinerary-item" key={idx}>
                    <div className="date-range">
                      {new Date(item.start).toLocaleDateString()} - {new Date(item.end).toLocaleDateString()}
                    </div>
                    <div className="locations">
                      <strong>Locations:</strong> {item.locations.join(' → ')}
                    </div>
                  </div>
                ))}
                <div className="info-row">
                  <div className="info-label">Current Status:</div>
                  <div className="info-value status-active">Active Tour</div>
                </div>
              </div>
              
              <div className="grid-section emergency-contacts">
                <h4>Emergency Contacts</h4>
                {selectedTourist.emergencyContacts.map((contact, idx) => (
                  <div className="contact-item" key={idx}>
                    <div className="contact-name">{contact.name} ({contact.relation})</div>
                    <div className="contact-phone">{contact.phone}</div>
                    <button className="call-contact-btn">Call</button>
                  </div>
                ))}
              </div>
              
              <div className="grid-section consent">
                <h4>Tracking Consent</h4>
                <div className="consent-status-large">
                  {selectedTourist.consent.optInTracking ? 
                    <div className="status-granted">
                      <span className="icon">✓</span>
                      <span>Tracking Enabled</span>
                    </div> : 
                    <div className="status-denied">
                      <span className="icon">✗</span>
                      <span>Tracking Disabled</span>
                    </div>
                  }
                </div>
                <div className="info-row">
                  <div className="info-label">Last Updated:</div>
                  <div className="info-value">
                    {new Date(selectedTourist.consent.timestamp).toLocaleString()}
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-label">Consent Source:</div>
                  <div className="info-value">Mobile Application</div>
                </div>
                <div className="consent-log-link">
                  <a href="#view-log">View Consent Log</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <h4>Quick Actions</h4>
          <div className="action-buttons">
            <button className="primary-button">Send Alert</button>
            <button className="primary-button">Contact Tourist</button>
            <button className="secondary-button">View on Map</button>
            <button className="secondary-button">Create Incident</button>
            <button className="warning-button">Mark as Missing</button>
          </div>
        </div>
      </div>
    );
  };

  // Incidents List
  const renderIncidentsList = () => (
    <div className="incidents-page">
      <h2>Incidents & Cases</h2>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by Incident ID, Tourist ID, or case details..." 
        />
        <button className="search-btn">Search</button>
        
        <div className="status-filters">
          <button className="status-btn all active">All</button>
          <button className="status-btn open">Open</button>
          <button className="status-btn in-progress">In Progress</button>
          <button className="status-btn resolved">Resolved</button>
        </div>
        
        <button className="create-incident-btn">Create New Incident</button>
      </div>
      
      <div className="incidents-table">
        <table>
          <thead>
            <tr>
              <th>Incident ID</th>
              <th>Status</th>
              <th>Created</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Tourist(s)</th>
              <th>Location</th>
              <th>Assigned Units</th>
              <th>E-FIR</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.incidentId}>
                <td>{incident.incidentId}</td>
                <td className={`status-cell ${incident.status}`}>{incident.status}</td>
                <td>{new Date(incident.timestamp).toLocaleString()}</td>
                <td>
                  {incident.linkedAlerts.length > 0 ? 
                    alerts.find(a => a.alertId === incident.linkedAlerts[0])?.type || 'Unknown' : 
                    'Manual'
                  }
                </td>
                <td className={`severity-cell severity-${incident.severity}`}>
                  {Array(incident.severity).fill('●').join('')}
                </td>
                <td>
                  {incident.touristIds.map(id => (
                    <button 
                      key={id} 
                      className="link-button tourist-link"
                      onClick={() => navigateTo('tourists', id)}
                    >
                      {id}
                    </button>
                  ))}
                </td>
                <td>
                  {incident.location ? `${incident.location.lat.toFixed(4)}, ${incident.location.lon.toFixed(4)}` : 'Unknown'}
                </td>
                <td>
                  {incident.assignedUnits ? incident.assignedUnits.join(', ') : 'None'}
                </td>
                <td>
                  {incident.efir ? (
                    <span className="efir-status generated">{incident.efir.id}</span>
                  ) : (
                    <button 
                      className="generate-efir-btn"
                      onClick={() => generateEFIR(incident.incidentId)}
                    >
                      Generate
                    </button>
                  )}
                </td>
                <td className="actions-cell">
                  <button 
                    className="action-btn view"
                    onClick={() => navigateTo('incidents', incident.incidentId)}
                    title="View Details"
                  >
                    👁️
                  </button>
                  
                  <button 
                    className="action-btn map"
                    onClick={() => {
                      setActiveRoute('map');
                      // In a real app, this would center the map on the incident location
                    }}
                    title="View on Map"
                  >
                    🗺️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Incident Detail
  const renderIncidentDetail = () => {
    if (!selectedIncident) return <div>Loading incident details...</div>;
    
    return (
      <div className="incident-detail-page">
        <div className="detail-header">
          <button className="back-button" onClick={() => navigateTo('incidents')}>
            ← Back to Incidents
          </button>
          <h2>Incident Details: {selectedIncident.incidentId}</h2>
          <div className={`incident-status status-${selectedIncident.status}`}>{selectedIncident.status}</div>
        </div>
        
        <div className="incident-tabs">
          <button className="tab-button active">Summary</button>
          <button className="tab-button">Timeline</button>
          <button className="tab-button">Evidence</button>
          <button className="tab-button">E-FIR</button>
        </div>
        
        <div className="incident-content">
          <div className="incident-summary active">
            <div className="incident-grid">
              <div className="grid-section incident-details">
                <h4>Incident Details</h4>
                <div className="info-row">
                  <div className="info-label">Type:</div>
                  <div className="info-value">{selectedIncident.linkedAlerts.length > 0 ? 
                    alerts.find(a => a.alertId === selectedIncident.linkedAlerts[0])?.type || 'Unknown' : 
                    'Manual'
                  }</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Severity:</div>
                  <div className={`info-value severity-${selectedIncident.severity}`}>
                    {Array(selectedIncident.severity).fill('●').join('')}
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-label">Timestamp:</div>
                  <div className="info-value">{new Date(selectedIncident.timestamp).toLocaleString()}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Location:</div>
                  <div className="info-value">{selectedIncident.location ? `${selectedIncident.location.lat.toFixed(4)}, ${selectedIncident.location.lon.toFixed(4)}` : 'Unknown'}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Status:</div>
                  <div className={`info-value status-${selectedIncident.status}`}>{selectedIncident.status}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Tourist IDs:</div>
                  <div className="info-value">
                    {selectedIncident.touristIds.map(id => (
                      <button 
                        key={id} 
                        className="link-button"
                        onClick={() => navigateTo('tourists', id)}
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-label">Assigned Units:</div>
                  <div className="info-value">
                    {selectedIncident.assignedUnits ? selectedIncident.assignedUnits.join(', ') : 'None'}
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-label">E-FIR:</div>
                  <div className="info-value">
                    {selectedIncident.efir ? (
                      <span className="efir-status generated">{selectedIncident.efir.id}</span>
                    ) : (
                      <span className="no-efir">Not generated</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid-section actions">
                <h4>Actions</h4>
                <button 
                  className="primary-button"
                  onClick={() => {
                    // In a real app, this would open the dispatch unit dialog
                    alert('Opening dispatch unit dialog...');
                  }}
                >
                  Dispatch Unit
                </button>
                
                <button 
                  className="secondary-button"
                  onClick={() => {
                    // In a real app, this would open the incident edit form
                    alert('Opening incident edit form...');
                  }}
                >
                  Edit Incident
                </button>
                
                <button 
                  className="secondary-button"
                  onClick={() => {
                    // In a real app, this would generate the E-FIR
                    const efirId = generateEFIR(selectedIncident.incidentId);
                    if (efirId) {
                      alert(`E-FIR ${efirId} generated successfully!`);
                    }
                  }}
                >
                  Generate E-FIR
                </button>
              </div>
            </div>
          </div>
          
          <div className="incident-timeline">
            <h4>Incident Timeline</h4>
            <div className="timeline-event">
              <div className="event-time">09:45 AM</div>
              <div className="event-type">Incident Created</div>
              <div className="event-details">New incident reported by control room.</div>
            </div>
            
            <div className="timeline-event">
              <div className="event-time">09:50 AM</div>
              <div className="event-type">Tourist Notified</div>
              <div className="event-details">Tourist ID: T-12345</div>
            </div>
            
            <div className="timeline-event">
              <div className="event-time">09:55 AM</div>
              <div className="event-type">Unit Dispatched</div>
              <div className="event-details">Unit ID: U-67890</div>
            </div>
            
            <div className="timeline-event">
              <div className="event-time">10:00 AM</div>
              <div className="event-type">E-FIR Generated</div>
              <div className="event-details">E-FIR ID: EFIR-54321</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Add this loading state while we wait for user data
  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading police dashboard...</p>
      </div>
    );
  }

  return (
    <div className="police-dashboard-page">
      <header className="dashboard-header police-header">
        <div className="header-logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Government Emblem" 
            className="dashboard-emblem" 
          />
          <h1>Police Authority Portal</h1>
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
              className={activeRoute === 'map' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('map')}
            >
              <span className="nav-icon">📍</span>
              <span className="nav-text">Map</span>
            </button>
            <button 
              className={activeRoute === 'alerts' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('alerts')}
            >
              <span className="nav-icon">🔔</span>
              <span className="nav-text">Alerts</span>
            </button>
            <button 
              className={activeRoute === 'tourists' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('tourists')}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-text">Tourists</span>
            </button>
            <button 
              className={activeRoute === 'incidents' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('incidents')}
            >
              <span className="nav-icon">⚠️</span>
              <span className="nav-text">Incidents</span>
            </button>
            <button 
              className={activeRoute === 'dispatch' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('dispatch')}
            >
              <span className="nav-icon">🚚</span>
              <span className="nav-text">Dispatch</span>
            </button>
            <button 
              className={activeRoute === 'units' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('units')}
            >
              <span className="nav-icon">👮</span>
              <span className="nav-text">Units</span>
            </button>
            <button 
              className={activeRoute === 'geofences' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('geofences')}
            >
              <span className="nav-icon">🌐</span>
              <span className="nav-text">Geofences</span>
            </button>
            <button 
              className={activeRoute === 'iot' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('iot')}
            >
              <span className="nav-icon">📱</span>
              <span className="nav-text">IoT Devices</span>
            </button>
            <button 
              className={activeRoute === 'reports' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('reports')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Reports</span>
            </button>
            <button 
              className={activeRoute === 'settings' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('settings')}
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </button>
            <button 
              className={activeRoute === 'audit' ? 'nav-item active' : 'nav-item'}
              onClick={() => navigateTo('audit')}
            >
              <span className="nav-icon">🛡️</span>
              <span className="nav-text">Audit</span>
            </button>
          </nav>
        </aside>

        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default PoliceDashboard;