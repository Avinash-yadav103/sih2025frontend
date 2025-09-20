import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="header" style={{ marginBottom: '20px' }}>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;