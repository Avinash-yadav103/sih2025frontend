import React from 'react';

function DispatchTray({ incidents, navigateTo, alerts }) {
  return (
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
              <div className={`incident-severity severity-${incident.severity}`}>
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
  );
}

export default DispatchTray;