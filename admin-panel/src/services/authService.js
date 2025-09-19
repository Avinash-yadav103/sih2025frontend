// Simple authentication service to handle login requests

// For demo purposes, using a mock login
// Replace with actual API calls in production
export async function login(credentials) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation - replace with actual API call
  if (credentials.email === 'admin@tourism.gov.in' && credentials.password === 'admin123') {
    const userData = {
      id: 'admin-001',
      name: 'Tourism Admin',
      role: 'admin',
      department: 'Ministry of Tourism',
      region: 'North East',
      token: 'mock-jwt-token-for-demo'
    };
    
    // Store auth data in localStorage
    localStorage.setItem('authUser', JSON.stringify(userData));
    
    return userData;
  } else {
    throw new Error('Invalid email or password');
  }
}

export function logout() {
  localStorage.removeItem('authUser');
  window.location.href = '/';
}

export function getCurrentUser() {
  const userData = localStorage.getItem('authUser');
  return userData ? JSON.parse(userData) : null;
}

export function isAuthenticated() {
  return !!getCurrentUser();
}

// Check if police user is authenticated
export const isPoliceAuthenticated = () => {
  return localStorage.getItem('isPoliceAuthenticated') === 'true';
};

// Get current police user
export const getCurrentPoliceUser = () => {
  const userJson = localStorage.getItem('policeUser');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing police user data', error);
    return null;
  }
};

// Police login function
export const policeLogin = async (credentials) => {
  // This is where you would make an API call to authenticate the police user
  // For demo purposes, we'll simulate a successful login
  
  // In a real app, replace this with an actual API call
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        const userData = {
          id: 'police-' + Math.floor(Math.random() * 1000),
          name: 'Officer ' + credentials.username,
          role: 'police'
        };
        
        localStorage.setItem('policeUser', JSON.stringify(userData));
        localStorage.setItem('isPoliceAuthenticated', 'true');
        resolve(userData);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

// Police logout function
export const policeLogout = () => {
  localStorage.removeItem('policeUser');
  localStorage.removeItem('isPoliceAuthenticated');
};