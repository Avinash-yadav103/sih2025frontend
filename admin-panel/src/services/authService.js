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