import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

function PoliceLoginPage() {
  const [loginError, setLoginError] = useState('');

  const handlePoliceLogin = async (credentials) => {
    try {
      // This would be replaced with your actual police auth API call
      console.log('Attempting police login with:', credentials);
      
      // Simulate API call (replace with actual authentication)
      // await authService.policeLogin(credentials);
      
      // For demo purposes, let's simulate a successful login after a delay
      setTimeout(() => {
        // Store auth token or user info in localStorage/sessionStorage
        localStorage.setItem('policeUser', JSON.stringify({
          id: 'police-123',
          name: 'Officer ' + credentials.username,
          role: 'police'
        }));
        localStorage.setItem('isPoliceAuthenticated', 'true');
        
        // Redirect to police dashboard
        window.location.href = '/police-dashboard';
      }, 1000);
      
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page police-login-page">
      <div className="login-container">
        <div className="login-header">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Government Emblem" 
            className="login-emblem" 
          />
          <h1>Police Authority Login</h1>
        </div>
        
        <div className="login-form-container">
          <LoginForm 
            onSubmit={handlePoliceLogin} 
            buttonText="Login as Police Authority"
            errorMessage={loginError}
            customFields={[
              {
                name: 'policeId',
                label: 'Police ID',
                type: 'text',
                placeholder: 'Enter your Police ID',
                required: true
              }
            ]}
          />
        </div>
        
        <div className="login-footer">
          <p>This is a secure government portal. Unauthorized access is prohibited.</p>
          <a href="/" className="back-link">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default PoliceLoginPage;