import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';
import { login } from '../services/authService';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await login(credentials);
      console.log('Login successful:', response);
      // Redirect to admin dashboard after successful login
      window.location.href = '/admin-dashboard';
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Government Emblem" 
            className="login-emblem" 
          />
          <div className="login-title">
            <h1>MINISTRY OF TOURISM</h1>
            <h2>NORTH EASTERN <span className="highlight">REGION</span></h2>
            <h3>Admin Login Portal</h3>
          </div>
        </div>
        
        <div className="login-content">
          <LoginForm onLogin={handleLogin} isLoading={isLoading} />
          {error && <div className="error-message">{error}</div>}
        </div>
        
        <div className="login-footer">
          <p>For official use only. Unauthorized access is prohibited.</p>
          <p>© {new Date().getFullYear()} | Ministry of Tourism, Government of India</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;