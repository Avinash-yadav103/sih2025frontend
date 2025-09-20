import { fetchData, insertData, updateData, deleteData } from './api';

const TABLE_NAME = 'Zones';

/**
 * Fetch all geofence zones
 * @returns {Promise} - Promise resolving to array of zones
 */
export const fetchAllZones = async () => {
  return await fetchData(TABLE_NAME);
};

/**
 * Fetch a specific zone by ID
 * @param {string|number} id - The zone ID
 * @returns {Promise} - Promise resolving to the zone data
 */
export const fetchZoneById = async (id) => {
  const data = await fetchData(TABLE_NAME, {
    filters: [{ column: 'id', operator: 'eq', value: id }]
  });
  
  return data[0];
};

/**
 * Create a new geofence zone
 * @param {object} zoneData - The zone data to create
 * @returns {Promise} - Promise resolving to the created zone
 */
export const createZone = async (zoneData) => {
  return await insertData(TABLE_NAME, zoneData);
};

/**
 * Update an existing geofence zone
 * @param {string|number} id - The zone ID to update
 * @param {object} zoneData - The updated zone data
 * @returns {Promise} - Promise resolving to the updated zone
 */
export const updateZone = async (id, zoneData) => {
  return await updateData(TABLE_NAME, zoneData, { id });
};

/**
 * Delete a geofence zone
 * @param {string|number} id - The zone ID to delete
 * @returns {Promise} - Promise resolving to the deleted zone
 */
export const deleteZone = async (id) => {
  return await deleteData(TABLE_NAME, { id });
};

/**
 * Convert database zone format to frontend geofence format
 * @param {object} zone - Zone data from database
 * @returns {object} - Geofence object for frontend
 */
export const convertZoneToGeofence = (zone) => {
  return {
    id: zone.id || `db-${Date.now()}`,
    name: zone.name || 'Unnamed Zone',
    lat: zone.latitude || 0,
    lng: zone.longitude || 0,
    radius: zone.radius || 1.0,
    type: zone.zone_type || 'geofenced',
    penalty_bonus: zone.penalty_bonus || 0
  };
};

/**
 * Convert frontend geofence format to database zone format
 * @param {object} geofence - Geofence data from frontend
 * @returns {object} - Zone object for database
 */
export const convertGeofenceToZone = (geofence) => {
  return {
    name: geofence.name,
    latitude: geofence.lat,
    longitude: geofence.lng,
    radius: geofence.radius,
    zone_type: geofence.type,
    penalty_bonus: geofence.penalty_bonus
  };
};