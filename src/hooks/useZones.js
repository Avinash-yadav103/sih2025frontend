import { useState, useEffect, useCallback } from 'react';
import { fetchAllZones, createZone, updateZone, deleteZone, convertZoneToGeofence, convertGeofenceToZone } from '../services/zoneService';

/**
 * Custom hook for managing geofence zones
 */
export const useZones = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all zones
  const fetchZones = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const zonesData = await fetchAllZones();
      setZones(zonesData.map(convertZoneToGeofence));
      return zonesData;
    } catch (err) {
      setError(err.message || 'Failed to fetch zones');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new zone
  const addZone = useCallback(async (geofenceData) => {
    setLoading(true);
    setError(null);
    try {
      const zoneData = convertGeofenceToZone(geofenceData);
      const result = await createZone(zoneData);
      if (result && result.length > 0) {
        const newGeofence = convertZoneToGeofence(result[0]);
        setZones(prev => [...prev, newGeofence]);
        return newGeofence;
      }
      throw new Error('Failed to create zone');
    } catch (err) {
      setError(err.message || 'Failed to add zone');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing zone
  const updateZoneById = useCallback(async (id, geofenceData) => {
    setLoading(true);
    setError(null);
    try {
      const zoneData = convertGeofenceToZone(geofenceData);
      const result = await updateZone(id, zoneData);
      if (result && result.length > 0) {
        const updatedGeofence = convertZoneToGeofence(result[0]);
        setZones(prev => prev.map(zone => zone.id === id ? updatedGeofence : zone));
        return updatedGeofence;
      }
      throw new Error('Failed to update zone');
    } catch (err) {
      setError(err.message || 'Failed to update zone');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a zone
  const deleteZoneById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteZone(id);
      setZones(prev => prev.filter(zone => zone.id !== id));
      return id;
    } catch (err) {
      setError(err.message || 'Failed to delete zone');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  return {
    zones,
    loading,
    error,
    fetchZones,
    addZone,
    updateZone: updateZoneById,
    deleteZone: deleteZoneById
  };
};

export default useZones;