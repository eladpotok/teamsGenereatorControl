import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Updates from "./Update";
import Profile from "./Profile";
import "./App.css";
import AboutApp from "./AboutApp";
import Feedback from "./Feedback";
import Download from "./Download";
import HomePage from "./HomePage";

const UserContext = createContext();




export function createAboutSection() {
  const container = document.createElement('div');
  container.className = 'about-container';
  container.innerHTML = `
    <h2>🏆 About the App: <span class="highlight">TeamsGenerator</span></h2>
    <p>TeamsGenerator is a mobile and web app that helps users create balanced soccer teams quickly and easily. It's designed for casual players, friends, or local soccer communities who want fair and fun games without the usual arguments over team balance.</p>

    <h3>⚙️ Core Functionality</h3>
    <ul>
      <li><strong>Add Players:</strong> Add soccer players with skills, strengths, and custom traits. Each player gets a profile the app uses for fair balancing.</li>
      <li><strong>Automatic Team Generation:</strong> The app builds balanced teams based on player attributes.</li>
      <li><strong>Score Tracking:</strong> Track match results and build your match history.</li>
      <li><strong>Matches History:</strong> View past games. If none exist yet, a friendly message is shown.</li>
      <li><strong>Cross-Platform:</strong> Built with React and Ionic, it works as a mobile app (Play Store) and a responsive web app. It adapts based on the environment.</li>
    </ul>

    <h3>🎯 Goal of the App</h3>
    <p>The goal is to make forming fair soccer teams fast and easy, avoiding bias and saving time before the game starts. The result? Better games, more fun, and no team-selection drama.</p>

    <h3>🤝 Target Community</h3>
    <ul>
      <li>Casual football/soccer players</li>
      <li>Friends and local groups who play regularly</li>
      <li>Pickup game organizers</li>
      <li>Schools or clubs wanting a simple team builder</li>
    </ul>

    <h3>📈 Potential for Expansion</h3>
    <ul>
      <li>Player stats and performance tracking</li>
      <li>Leaderboards and historical insights</li>
      <li>Custom teams with names, colors, logos</li>
      <li>Match sharing and player invites</li>
    </ul>
  `;
  return container;
}

function Navbar(props) {

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px 30px",
        backgroundColor: "#007acc",
        color: "white",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'column'
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: 20 }}>TeamsGenerator</div>
      <div className="header-tabs" style={{ display: "flex", gap: "15px" }}>
       <Link to="/homepage" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/feedback" style={{ color: "white", textDecoration: "none" }}>
          Feedback
        </Link>
        <Link to="/updates" style={{ color: "white", textDecoration: "none" }}>
          Updates
        </Link>
        <Link to="/downloads" style={{ color: "white", textDecoration: "none" }}>
          Downloads
        </Link>
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          Profile
        </Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          About
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  // Simulated user context: change isAdmin to false to test non-admin
  const [user, setUser] = useState({ name: "Elad", isAdmin: true });
  // const location = useLocation();

  const isAdmin = localStorage.getItem("isAdmin");
  useEffect(() => {
    if (isAdmin === "true") {
      setUser({ ...user, isAdmin: true });
    } else {
      setUser({ ...user, isAdmin: false });
    }
    // eslint-disable-next-line
    }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Navbar />
        <main className="main-content" >
          <Routes>
            <Route path="/" element={<HomePage  />} />
            <Route path="homepage" element={<HomePage  />} />
            <Route path="/updates" element={<Updates isAdmin={user.isAdmin}/>} />
            <Route path="/downloads" element={<Download />} />
            <Route path="/profile" element={<Profile  />} />
            <Route path="/about" element={<AboutApp />} />
            <Route path="/feedback" element={<Feedback isAdmin={user.isAdmin}/>} />
            
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
        <footer className="footer" >
            <p>Created, Developed and Designed by Elad Peleg | © {new Date().getFullYear()} TeamsGenerator</p>
        </footer>
      </Router>
    </UserContext.Provider>
  );
}
