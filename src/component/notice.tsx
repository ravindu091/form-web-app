import React, { useState } from 'react';
import './NoticePopup.css';

const NoticePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className='roboto-medium'>Notice</h2>
        <p className='roboto-regular'>We value your privacy!</p>
        <ul className='roboto-regular'>
          <li><strong>No Data Collection:</strong> We don’t use or store any of your data.</li>
          <li><strong>No Backend Server:</strong> All processes run directly in your browser.</li>
          <li><strong>Performance Note:</strong> Speed may vary depending on your browser’s capabilities.</li>
        </ul>
        <button className='roboto-regular' onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default NoticePopup;
