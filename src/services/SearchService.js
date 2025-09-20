import axios from 'axios';

// Placeholder for a Maps API key - in production, use environment variables
const MAPS_API_KEY = 'your-maps-api-key';

class SearchService {
  // Search places using an external API (like Google Places, Mapbox, etc.)
  static async searchPlaces(query) {
    if (!query || query.trim().length < 2) return [];
    
    try {
      // This is a placeholder for an actual API call to a maps service
      // In a real implementation, replace with your chosen maps API
      const response = await axios.get(
        `https://api.example.com/places?query=${encodeURIComponent(query)}&key=${MAPS_API_KEY}`
      );
      
      // Format the results to match our data structure
      return response.data.results.map(place => ({
        id: place.id,
        title: place.name,
        address: place.formatted_address,
        position: [place.geometry.location.lat, place.geometry.location.lng],
        category: 'place',
        icon: '📍'
      }));
    } catch (error) {
      console.error('Error searching places:', error);
      return [];
    }
  }

  // Search tourists from your backend/database
  static async searchTourists(query) {
    if (!query || query.trim().length < 2) return [];
    
    try {
      // Replace with actual API endpoint
      const response = await axios.get(
        `/api/tourists/search?query=${encodeURIComponent(query)}`
      );
      
      return response.data.map(tourist => ({
        id: tourist.id,
        title: tourist.name,
        address: tourist.currentLocation,
        position: [tourist.latitude, tourist.longitude],
        category: 'tourist',
        status: tourist.status,
        nationality: tourist.nationality,
        contact: tourist.contact,
        lastCheckIn: tourist.lastCheckIn,
        icon: '👤'
      }));
    } catch (error) {
      console.error('Error searching tourists:', error);
      return [];
    }
  }

  // Search incidents from your backend/database
  static async searchIncidents(query) {
    if (!query || query.trim().length < 2) return [];
    
    try {
      // Replace with actual API endpoint
      const response = await axios.get(
        `/api/incidents/search?query=${encodeURIComponent(query)}`
      );
      
      return response.data.map(incident => ({
        id: incident.id,
        title: incident.title,
        address: incident.location,
        position: [incident.latitude, incident.longitude],
        category: 'incident',
        severity: incident.severity,
        reportTime: incident.reportTime,
        description: incident.description,
        icon: '🚨'
      }));
    } catch (error) {
      console.error('Error searching incidents:', error);
      return [];
    }
  }

  // Search units from your backend/database
  static async searchUnits(query) {
    if (!query || query.trim().length < 2) return [];
    
    try {
      // Replace with actual API endpoint
      const response = await axios.get(
        `/api/units/search?query=${encodeURIComponent(query)}`
      );
      
      return response.data.map(unit => ({
        id: unit.id,
        title: unit.name,
        address: unit.currentLocation,
        position: [unit.latitude, unit.longitude],
        category: 'unit',
        status: unit.status,
        officers: unit.officers,
        vehicle: unit.vehicle,
        icon: '🚔'
      }));
    } catch (error) {
      console.error('Error searching units:', error);
      return [];
    }
  }

  // Search IoT devices
  static async searchIoTDevices(query) {
    if (!query || query.trim().length < 2) return [];
    
    try {
      // Replace with actual API endpoint
      const response = await axios.get(
        `/api/iot/search?query=${encodeURIComponent(query)}`
      );
      
      return response.data.map(device => ({
        id: device.id,
        title: device.name,
        address: device.location,
        position: [device.latitude, device.longitude],
        category: 'iot',
        type: device.type,
        status: device.status,
        lastPing: device.lastPing,
        icon: '📱'
      }));
    } catch (error) {
      console.error('Error searching IoT devices:', error);
      return [];
    }
  }

  // Combined search across all categories
  static async search(query, categories = ['place', 'tourist', 'incident', 'unit', 'iot']) {
    if (!query || query.trim().length < 2) return [];
    
    const searchPromises = [];
    
    if (categories.includes('place')) {
      searchPromises.push(this.searchPlaces(query));
    }
    
    if (categories.includes('tourist')) {
      searchPromises.push(this.searchTourists(query));
    }
    
    if (categories.includes('incident')) {
      searchPromises.push(this.searchIncidents(query));
    }
    
    if (categories.includes('unit')) {
      searchPromises.push(this.searchUnits(query));
    }
    
    if (categories.includes('iot')) {
      searchPromises.push(this.searchIoTDevices(query));
    }
    
    try {
      const results = await Promise.all(searchPromises);
      return results.flat();
    } catch (error) {
      console.error('Error performing combined search:', error);
      return [];
    }
  }

  // For testing purposes - returns mocked data without API calls
  static getMockSearchResults(query) {
    if (!query || query.trim().length < 2) return [];
    
    const normalizedQuery = query.toLowerCase();
    
    const mockData = [
      // Places
      {
        id: 'place1',
        title: 'Gangtok Market',
        address: 'MG Road, Gangtok, Sikkim',
        position: [27.3389, 88.6138],
        category: 'place',
        icon: '📍'
      },
      {
        id: 'place2',
        title: 'Darjeeling Mall',
        address: 'The Mall, Darjeeling, West Bengal',
        position: [27.0410, 88.2663],
        category: 'place',
        icon: '📍'
      },
      
      // Tourists
      {
        id: 'tourist1',
        title: 'John Smith',
        address: 'Near Tsomgo Lake',
        position: [27.3792, 88.7513],
        category: 'tourist',
        status: 'Active',
        nationality: 'American',
        contact: '+1-555-123-4567',
        lastCheckIn: '2 hours ago',
        icon: '👤'
      },
      {
        id: 'tourist2',
        title: 'Akira Tanaka',
        address: 'MG Road, Gangtok',
        position: [27.3389, 88.6138],
        category: 'tourist',
        status: 'Alert',
        nationality: 'Japanese',
        contact: '+81-555-123-4567',
        lastCheckIn: '12 hours ago',
        icon: '👤'
      },
      
      // Incidents
      {
        id: 'incident1',
        title: 'Missing Tourist Report',
        address: 'Tiger Hill, Darjeeling',
        position: [27.0547, 88.2477],
        category: 'incident',
        severity: 'High',
        reportTime: '1 hour ago',
        description: 'Tourist not reported back from trekking',
        icon: '🚨'
      },
      {
        id: 'incident2',
        title: 'Theft Report',
        address: 'Hotel Himalaya, Gangtok',
        position: [27.3300, 88.6163],
        category: 'incident',
        severity: 'Medium',
        reportTime: '3 hours ago',
        description: 'Passport and valuables stolen from hotel room',
        icon: '🚨'
      },
      
      // Units
      {
        id: 'unit1',
        title: 'Patrol Unit 7',
        address: 'MG Road Checkpoint',
        position: [27.3380, 88.6145],
        category: 'unit',
        status: 'On duty',
        officers: '3 officers',
        vehicle: 'Jeep #4221',
        icon: '🚔'
      },
      
      // IoT Devices
      {
        id: 'iot1',
        title: 'CCTV Camera #12',
        address: 'Gangtok Market Entrance',
        position: [27.3391, 88.6138],
        category: 'iot',
        type: 'CCTV',
        status: 'Active',
        lastPing: '2 minutes ago',
        icon: '📱'
      }
    ];
    
    return mockData.filter(item => 
      item.title.toLowerCase().includes(normalizedQuery) || 
      item.address.toLowerCase().includes(normalizedQuery)
    );
  }
}

export default SearchService;