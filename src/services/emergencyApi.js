import axios from 'axios';

// Default base URL read from env; can be changed at runtime with setBaseUrl
// Use environment override when provided, otherwise default to the ngrok URL the user supplied
const DEFAULT_NGROK = 'https://b755ae68e462.ngrok-free.app';
let baseURL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' && window.__EMERGENCY_API_BASE_URL) || DEFAULT_NGROK;

let api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export function setBaseUrl(url) {
  if (!url) return;
  // normalize: remove trailing slash if present
  baseURL = url.replace(/\/+$/, '');
  api = axios.create({ baseURL, timeout: 10000, headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
}

function transformActivation(item) {
  if (!item) return null;
  const id = item.incidentId || item.id || item.incident_id || null;
  const time = item.activationTimestamp || item.activation_time || item.reported_date || (item.location && item.location.timestamp) || null;
  const touristId = item.userId || item.user_id || (item.user && item.user.id) || null;
  const touristName = item.userName || item.username || (item.user && (item.user.name || item.user.fullName)) || touristId || 'Unknown';
  const severity = (item.userVitals && item.userVitals.stressLevel) || item.severity || 'medium';

  return {
    id,
    status: item.status || 'UNKNOWN',
    type: item.type || (item.activationMethod ? 'panic' : 'emergency'),
    time,
    location: item.location || {},
    deviceStatus: item.deviceStatus || {},
    userVitals: item.userVitals || {},
    touristId,
    touristName,
    severity,
    dataStreamActive: !!item.dataStreamActive,
    raw: item
  };
}

export async function fetchActivations(params = {}) {
  try {
  // build full path to avoid hitting the host root (ngrok landing page)
  // switched to the new '/alerts' endpoint as requested
  const path = '/alerts';
  let resp = await api.get(path, { params });
    const contentType = (resp.headers && resp.headers['content-type']) || '';

    // If the server responded with HTML (ngrok landing page or human UI), retry with ?format=json
    if (typeof resp.data === 'string' || contentType.includes('text/html')) {
      // attempt JSON fallback
      try {
  resp = await api.get(path, { params: { ...params, format: 'json' } });
      } catch (retryErr) {
        // rethrow original for clarity
        throw new Error('activation-data returned HTML; retry with ?format=json failed: ' + (retryErr.message || retryErr));
      }
    }

    const body = resp.data || {};
    const activations = (body.activations || []).map(transformActivation).filter(Boolean);
    return { total: body.totalActivations || activations.length, activations, raw: body };
  } catch (err) {
    // Re-throw to let caller handle UI errors
    throw err;
  }
}

export async function fetchIncident(id) {
  try {
    if (!id) throw new Error('Missing incident id');
    // backend provides /incidents/:id
    // ensure path starts with / to force API path
    const resp = await api.get(`/incidents/${id}`);
    return transformActivation(resp.data);
  } catch (err) {
    // try fallback: list incidents and find
    try {
      const resp = await api.get('/incidents');
      const found = (resp.data || []).find(i => (i.id || i.incidentId) === id || i.incidentId === id);
      return transformActivation(found);
    } catch (err2) {
      throw err;
    }
  }
}

export async function fetchDataPoints({ incidentId, limit = 50 } = {}) {
  if (!incidentId) return [];
  try {
    const path = '/api/emergency/data-points';
    const resp = await api.get(path, { params: { incidentId, limit } });
    const body = resp.data || {};
    return body.dataPoints || [];
  } catch (err) {
    throw err;
  }
}

export default {
  fetchActivations,
  fetchIncident,
  fetchDataPoints,
  setBaseUrl,
  api
};
