// Mock data for Police Dashboard

// Mock Tourists
export const mockTourists = [
  {
    touristId: "T-12345",
    name: "John Doe",
    digitalIdHash: "0xabc123def456789abcdef123456789abcdef123456789abcdef123456789abcd",
    kyc: { type: "passport", number: "X12345" },
    itinerary: [
      {
        start: "2025-09-01",
        end: "2025-09-10",
        locations: ["Gangtok", "Zuluk"]
      }
    ],
    emergencyContacts: [
      { name: "Jane Doe", phone: "+91-9876543210", relation: "wife" }
    ],
    safetyScore: 72,
    consent: { optInTracking: true, timestamp: "2025-09-05T12:00:00Z" },
    lat: 27.3314,
    lon: 88.6134,
    lastSeen: "2025-09-10T04:23:11Z",
    speed: 5
  },
  {
    touristId: "T-12346",
    name: "Alice Smith",
    digitalIdHash: "0xdef456789abcdef123456789abcdef123456789abcdef123456789abcdef1234",
    kyc: { type: "national_id", number: "ID9876" },
    itinerary: [
      {
        start: "2025-09-03",
        end: "2025-09-15",
        locations: ["Shillong", "Cherrapunji", "Dawki"]
      }
    ],
    emergencyContacts: [
      { name: "Bob Smith", phone: "+91-9876543211", relation: "husband" }
    ],
    safetyScore: 85,
    consent: { optInTracking: true, timestamp: "2025-09-03T10:30:00Z" },
    lat: 27.3394,
    lon: 88.6214,
    lastSeen: "2025-09-10T04:30:11Z",
    speed: 0
  },
  {
    touristId: "T-12347",
    name: "Robert Johnson",
    digitalIdHash: "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234",
    kyc: { type: "driving_license", number: "DL12345" },
    itinerary: [
      {
        start: "2025-09-05",
        end: "2025-09-12",
        locations: ["Guwahati", "Kaziranga"]
      }
    ],
    emergencyContacts: [
      { name: "Susan Johnson", phone: "+91-9876543212", relation: "wife" }
    ],
    safetyScore: 45,
    consent: { optInTracking: false, timestamp: "2025-09-05T09:15:00Z" },
    lat: 27.3274,
    lon: 88.6334,
    lastSeen: "2025-09-10T03:45:11Z",
    speed: 10
  },
  {
    touristId: "T-12348",
    name: "Maria Garcia",
    digitalIdHash: "0x456789abcdef123456789abcdef123456789abcdef123456789abcdef123456",
    kyc: { type: "passport", number: "P98765" },
    itinerary: [
      {
        start: "2025-09-02",
        end: "2025-09-20",
        locations: ["Tawang", "Bomdila", "Dirang"]
      }
    ],
    emergencyContacts: [
      { name: "Carlos Garcia", phone: "+91-9876543213", relation: "brother" }
    ],
    safetyScore: 92,
    consent: { optInTracking: true, timestamp: "2025-09-02T14:20:00Z" },
    lat: 27.3414,
    lon: 88.6034,
    lastSeen: "2025-09-10T04:15:11Z",
    speed: 0
  },
  {
    touristId: "T-12349",
    name: "David Wang",
    digitalIdHash: "0x789abcdef123456789abcdef123456789abcdef123456789abcdef12345678",
    kyc: { type: "passport", number: "CN56789" },
    itinerary: [
      {
        start: "2025-09-07",
        end: "2025-09-14",
        locations: ["Kohima", "Dzukou Valley"]
      }
    ],
    emergencyContacts: [
      { name: "Li Wang", phone: "+91-9876543214", relation: "wife" }
    ],
    safetyScore: 25,
    consent: { optInTracking: true, timestamp: "2025-09-07T11:45:00Z" },
    lat: 27.3354,
    lon: 88.6114,
    lastSeen: "2025-09-10T04:10:11Z",
    speed: 12
  }
];

// Mock Alerts
export const mockAlerts = [
  {
    alertId: "A-98765",
    touristId: "T-12345",
    type: "panic",
    severity: 5,
    lat: 27.3314,
    lon: 88.6134,
    ts: "2025-09-10T04:23:11Z",
    status: "new",
    assignedUnit: null,
    metadata: { battery: 9, deviceId: "D-99" }
  },
  {
    alertId: "A-98764",
    touristId: "T-12347",
    type: "geofence",
    severity: 3,
    lat: 27.3274,
    lon: 88.6334,
    ts: "2025-09-10T03:45:11Z",
    status: "assigned",
    assignedUnit: "U-1001",
    metadata: { battery: 45, deviceId: "D-97" }
  },
  {
    alertId: "A-98763",
    touristId: "T-12349",
    type: "anomaly",
    severity: 4,
    lat: 27.3354,
    lon: 88.6114,
    ts: "2025-09-10T02:10:11Z",
    status: "resolved",
    assignedUnit: "U-1002",
    metadata: { battery: 23, deviceId: "D-95" }
  },
  {
    alertId: "A-98762",
    touristId: "T-12348",
    type: "iot",
    severity: 2,
    lat: 27.3414,
    lon: 88.6034,
    ts: "2025-09-09T22:15:11Z",
    status: "new",
    assignedUnit: null,
    metadata: { battery: 5, deviceId: "D-92" }
  }
];

// Mock Incidents
export const mockIncidents = [
  {
    incidentId: "C-33333",
    linkedAlerts: ["A-98765"],
    touristIds: ["T-12345"],
    status: "open",
    createdBy: "officer_21",
    severity: 5,
    location: {
      lat: 27.3314,
      lon: 88.6134
    },
    timestamp: "2025-09-10T04:25:00Z",
    evidence: [
      {
        type: "image",
        url: "https://example.com/evidence/img123.jpg",
        hash: "0xabc123def456"
      }
    ]
  },
  {
    incidentId: "C-33334",
    linkedAlerts: ["A-98764"],
    touristIds: ["T-12347"],
    status: "in_progress",
    createdBy: "officer_22",
    severity: 3,
    location: {
      lat: 27.3274,
      lon: 88.6334
    },
    timestamp: "2025-09-10T03:50:00Z",
    assignedUnits: ["U-1001"],
    evidence: []
  },
  {
    incidentId: "C-33335",
    linkedAlerts: ["A-98763"],
    touristIds: ["T-12349"],
    status: "resolved",
    createdBy: "officer_23",
    severity: 4,
    location: {
      lat: 27.3354,
      lon: 88.6114
    },
    timestamp: "2025-09-10T02:20:00Z",
    assignedUnits: ["U-1002", "U-1003"],
    evidence: [
      {
        type: "video",
        url: "https://example.com/evidence/vid456.mp4",
        hash: "0xdef456789abc"
      },
      {
        type: "audio",
        url: "https://example.com/evidence/aud789.mp3",
        hash: "0x123456789def"
      }
    ],
    efir: {
      id: "EFIR-54321",
      generatedAt: "2025-09-10T03:15:00Z",
      blockchainHash: "0x789abcdef123456789abcdef123456789abcdef123456789abcdef123456789a",
      status: "generated"
    }
  }
];

// Mock Units
export const mockUnits = [
  {
    unitId: "U-1001",
    type: "patrol",
    officers: ["OFF-123", "OFF-124"],
    status: "available",
    lat: 27.3304,
    lon: 88.6144
  },
  {
    unitId: "U-1002",
    type: "emergency",
    officers: ["OFF-125", "OFF-126"],
    status: "enroute",
    lat: 27.3334,
    lon: 88.6134
  },
  {
    unitId: "U-1003",
    type: "patrol",
    officers: ["OFF-127"],
    status: "on_scene",
    lat: 27.3354,
    lon: 88.6114
  },
  {
    unitId: "U-1004",
    type: "k9",
    officers: ["OFF-128", "OFF-129"],
    status: "busy",
    lat: 27.3324,
    lon: 88.6124
  },
  {
    unitId: "U-1005",
    type: "medical",
    officers: ["OFF-130", "OFF-131"],
    status: "available",
    lat: 27.3314,
    lon: 88.6224
  }
];

// Mock Geofences
export const mockGeofences = [
  {
    id: "GF-001",
    name: "Restricted Zone Alpha",
    type: "restricted",
    riskLevel: "high",
    coordinates: [
      { lat: 27.3300, lon: 88.6100 },
      { lat: 27.3300, lon: 88.6200 },
      { lat: 27.3400, lon: 88.6200 },
      { lat: 27.3400, lon: 88.6100 }
    ],
    activeSchedule: {
      allDay: true,
      days: [1, 2, 3, 4, 5, 6, 7]
    },
    notificationRules: {
      alertOnEnter: true,
      alertOnExit: false,
      autoEscalate: true
    }
  },
  {
    id: "GF-002",
    name: "Tourist Zone Beta",
    type: "monitored",
    riskLevel: "medium",
    coordinates: [
      { lat: 27.3200, lon: 88.6000 },
      { lat: 27.3200, lon: 88.6100 },
      { lat: 27.3300, lon: 88.6100 },
      { lat: 27.3300, lon: 88.6000 }
    ],
    activeSchedule: {
      allDay: false,
      startTime: "08:00",
      endTime: "18:00",
      days: [1, 2, 3, 4, 5]
    },
    notificationRules: {
      alertOnEnter: false,
      alertOnExit: true,
      autoEscalate: false
    }
  },
  {
    id: "GF-003",
    name: "Danger Zone Delta",
    type: "danger",
    riskLevel: "critical",
    radius: 500, // meters
    center: { lat: 27.3500, lon: 88.6300 },
    activeSchedule: {
      allDay: true,
      days: [1, 2, 3, 4, 5, 6, 7]
    },
    notificationRules: {
      alertOnEnter: true,
      alertOnExit: true,
      autoEscalate: true
    }
  }
];

// Mock IoT Devices
export const mockDevices = [
  {
    deviceId: "D-99",
    type: "wearable",
    touristId: "T-12345",
    battery: 9,
    signal: "poor",
    lastPing: "2025-09-10T04:23:11Z",
    firmwareVersion: "1.2.3",
    status: "active"
  },
  {
    deviceId: "D-97",
    type: "mobile",
    touristId: "T-12347",
    battery: 45,
    signal: "good",
    lastPing: "2025-09-10T03:45:11Z",
    firmwareVersion: "2.0.1",
    status: "active"
  },
  {
    deviceId: "D-95",
    type: "tracker",
    touristId: "T-12349",
    battery: 23,
    signal: "fair",
    lastPing: "2025-09-10T02:10:11Z",
    firmwareVersion: "1.1.7",
    status: "offline"
  },
  {
    deviceId: "D-92",
    type: "wearable",
    touristId: "T-12348",
    battery: 5,
    signal: "poor",
    lastPing: "2025-09-09T22:15:11Z",
    firmwareVersion: "1.2.3",
    status: "low_battery"
  },
  {
    deviceId: "D-91",
    type: "mobile",
    touristId: "T-12346",
    battery: 87,
    signal: "excellent",
    lastPing: "2025-09-10T04:30:11Z",
    firmwareVersion: "2.0.1",
    status: "active"
  }
];