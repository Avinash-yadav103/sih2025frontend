import React from 'react';

function MapView({ 
  mapRef, 
  mapLoaded, 
  mapView, 
  setMapView, 
  mapLayer, 
  setMapLayer, 
  filterValues, 
  handleFilterChange, 
  tourists, 
  alerts, 
  showPanel, 
  setShowPanel, 
  panelContent, 
  setPanelContent, 
  selectedTourist, 
  incidents, 
  navigateTo 
}) {
  return (
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
              
              <div className="mock-map-display">
                <p>Interactive map with {tourists.length} tourists</p>
                <p>Map view: {mapView}</p>
                <p>Map layer: {mapLayer}</p>
                <p>Click on a marker to view details</p>
                
                <div className="sample-markers">
                  {tourists.slice(0, 5).map(tourist => (
                    <div 
                      key={tourist.touristId} 
                      className={`sample-marker risk-${tourist.safetyScore < 30 ? 'high' : tourist.safetyScore < 70 ? 'medium' : 'low'}`}
                      onClick={() => {}}
                    >
                      <span className="marker-id">{tourist.touristId}</span>
                    </div>
                  ))}
                  
                  {alerts.filter(a => a.status === 'new').slice(0, 3).map(alert => (
                    <div 
                      key={alert.alertId} 
                      className={`sample-marker alert severity-${alert.severity}`}
                      onClick={() => {}}
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
      
      {showPanel && <DetailPanel 
        panelContent={panelContent} 
        setPanelContent={setPanelContent} 
        selectedTourist={selectedTourist}
        setShowPanel={setShowPanel} 
      />}
      
      <DispatchTray incidents={incidents} navigateTo={navigateTo} alerts={alerts} />
    </div>
  );
}

export default MapView;