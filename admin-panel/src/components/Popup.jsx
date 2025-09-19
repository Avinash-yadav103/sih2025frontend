import { useEffect } from 'react';
import '../styles/Popup.css';

const Popup = ({ type, message, isOpen, onClose, autoCloseTime = 3000 }) => {
  useEffect(() => {
    if (isOpen && autoCloseTime) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseTime]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className={`popup ${type}`}>
        <div className="popup-icon">
          {type === 'success' && <span>✓</span>}
          {type === 'error' && <span>✗</span>}
          {type === 'info' && <span>i</span>}
        </div>
        <div className="popup-content">
          <p>{message}</p>
        </div>
        <button className="popup-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Popup;