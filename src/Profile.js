import React from 'react';
import './Profile.css';
import { FaUser, FaEnvelope, FaCogs } from 'react-icons/fa';
import ProfileImg from './Assets/profile.jpg'; // Assuming you have a profile image in the Assets folder

const Profile = () => {
  const user = {
    name: 'Elad Peleg',
    email: 'potokelad@gmail.com',
    role: 'Software Developer & Product Owner',
    joined: 'March 2024',
    about: `More than 15 years of experience in developing apps and software—both web and standalone. 
    Passionate about technology, integrating it seamlessly into daily life. 
    Sports enthusiast, especially football, which inspired the creation of this app.
    Always eager to learn, mentor others, and lead projects from vision to impact.`,
  };

  return (
    <div className="profile-container">
      {/* <h2 className="profile-title">Your Profile</h2> */}
      <div className="profile-card">
        <div className="profile-avatar">
          <img src={ProfileImg} alt="Profile" className="profile-image" />
        </div>
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p className="profile-role">{user.role}</p>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <a href="mailto:potokelad@gmail.com" className="profile-email">
                <p style={{display: 'flex', alignItems: 'center'}}>
                    <FaEnvelope className="icon" />
                    <p style={{marginTop: '-1px'}}>{user.email}</p>
                </p>
            </a>
            </div>
          {/* <p><FaCogs className="icon" /> Joined: {user.joined}</p> */}
          <p>
            <a
                href="https://www.linkedin.com/in/elad-peleg-887169b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="profile-linkedin"
            >
                <i className="fab fa-linkedin"></i> LinkedIn Profile
            </a>
          </p>
        </div>
      </div>

      <div className="about-section">
        <h4>About Me</h4>
        <p>{user.about}</p>
      </div>
    </div>
  );
};

export default Profile;
