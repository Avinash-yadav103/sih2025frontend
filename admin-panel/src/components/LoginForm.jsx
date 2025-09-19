import { useState } from 'react';

function LoginForm({ onSubmit, buttonText = 'Login', errorMessage, customFields = [] }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    // Initialize any custom fields with empty strings
    ...customFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter your username"
        />
      </div>
      
      {/* Render any custom fields */}
      {customFields.map(field => (
        <div className="form-group" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type || 'text'}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder || `Enter your ${field.label}`}
          />
        </div>
      ))}
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
      </div>
      
      <button type="submit" className="submit-button">
        {buttonText}
      </button>
    </form>
  );
}

export default LoginForm;