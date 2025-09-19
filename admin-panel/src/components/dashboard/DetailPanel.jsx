import React from 'react';

function DetailPanel({ panelContent, setPanelContent, selectedTourist, setShowPanel }) {
  return (
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
  );
}

export default DetailPanel;