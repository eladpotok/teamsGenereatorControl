import React from 'react';
import './Download.css';
import { FaGooglePlay, FaApple, FaGlobe } from 'react-icons/fa';

const Download = () => {
  return (
    <div className="download-container">
      <h2 className="download-title">Get the App</h2>
      <p className="download-subtitle">Choose your platform to start using the app:</p>

      <div className="store-links">
        <a
          href="https://play.google.com/store/apps/details?id=teams.generator.new"
          target="_blank"
          rel="noopener noreferrer"
          className="store-card google"
        >
          <FaGooglePlay size={36} />
          <span>Google Play</span>
        </a>

        <a
          href="https://apps.apple.com/app/id123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="store-card apple"
          onClick={(e) => {
            e.preventDefault();
            alert("Apple App Store version is coming soon!");
          }}
        >
          <FaApple size={36} />
          <span>App Store</span>
        </a>

        <a
          href="https://teamsgenerator-dtcxgcbhdfajdybr.eastus-01.azurewebsites.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="store-card web"
        >
          <FaGlobe size={36} />
          <span>Web App</span>
        </a>
      </div>
    </div>
  );
};

export default Download;
