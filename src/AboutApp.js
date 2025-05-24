import "./AboutApp.css";
import { FaCogs, FaBullseye, FaUsers, FaChartLine } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">🏆 About the App: <span className="highlight">TeamsGenerator</span></h2>
      <p className="about-intro">
        TeamsGenerator helps users create balanced soccer teams quickly and easily. Ideal for casual players, friends, or communities who want fair games without the usual team-selection debates.
      </p>

      <div className="about-cards-wrapper">
        <div className="about-card fade-in">
          <h3><FaCogs className="icon" /> Core Functionality</h3>
          <ul>
            <li><strong>Add Players:</strong> Add profiles with strengths & custom traits.</li>
            <li><strong>Automatic Team Generation:</strong> Create balanced teams instantly.</li>
            <li><strong>Score Tracking:</strong> Log results & track history.</li>
            <li><strong>Matches History:</strong> View past games and stats.</li>
            <li><strong>Cross-Platform:</strong> Works on web & mobile via React + Ionic.</li>
          </ul>
        </div>

        <div className="about-card fade-in delay-1">
          <h3><FaBullseye className="icon" /> Goal of the App</h3>
          <p>
            Make fair team-building fast and bias-free, saving time and avoiding arguments. The result? Better, more enjoyable games.
          </p>
        </div>

        <div className="about-card fade-in delay-2">
          <h3><FaUsers className="icon" /> Target Community</h3>
          <ul>
            <li>Casual football/soccer players</li>
            <li>Friends or regular groups</li>
            <li>Pickup game organizers</li>
            <li>Schools or clubs needing easy team builders</li>
          </ul>
        </div>

        <div className="about-card fade-in delay-3">
          <h3><FaChartLine className="icon" /> Potential for Expansion</h3>
          <ul>
            <li>Player stats & performance tracking</li>
            <li>Leaderboards & historical trends</li>
            <li>Custom team names, colors, logos</li>
            <li>Match sharing & player invites</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
