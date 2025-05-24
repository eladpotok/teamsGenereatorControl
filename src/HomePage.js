// HomePage.js
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { getAllFeedbacks, getAllUpdates } from "./Server";
import { getFirstTwoSentences, getTimeAndDate } from "./Helpers";
import { Link } from "react-router-dom";

const mockFeedback = [
  {
    id: 1,
    user: "John D.",
    message: "Great app! Helped us a lot organizing our weekly games.",
    date: "2025-05-20",
  },
  {
    id: 2,
    user: "Leah M.",
    message: "Love the new update, especially the match history feature.",
    date: "2025-05-19",
  },
];

const mockUpdates = [
  {
    id: 1,
    title: "New Match History Feature",
    description: "You can now view all your previous matches in a timeline!",
    date: "2025-05-18",
  },
  {
    id: 2,
    title: "Team Balancing Improvements",
    description: "The team generation algorithm has been upgraded for better fairness.",
    date: "2025-05-17",
  },
];

export default function HomePage() {
  const [feedback, setFeedback] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
      const fetchFeedbacks = async () => {
        const feedbacks = await getAllFeedbacks();
        setFeedback(feedbacks.slice(0, 2)); // Get the latest two feedbacks
        };
        const fetchUpdates = async () => {
          const updates = await getAllUpdates();
          setUpdates(updates.slice(0, 2)); // Get the latest two updates
        };
        
      fetchFeedbacks();
      fetchUpdates();

  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to <span className="highlight">TeamsGenerator</span></h1>

      <section className="section-card">
        <h2 className="section-title">🗣️ Latest Feedback</h2>
        <div className="card-list">
          {feedback.map((f) => (
            <Link to="/feedback" style={{ color: "white", textDecoration: "none" }} >
              <div className="card feedback-card" key={f.id}>
                <p className="card-user">{f.name}</p>
                <p className="card-message">"{f.feedback}"</p>
                <p className="card-date">{getTimeAndDate(f.timestamp)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card">
        <h2 className="section-title">🆕 Recent Updates</h2>
        <div className="card-list">
          {updates.map((u) => (
            <Link to="/updates" style={{ color: "white", textDecoration: "none" }} >
              <div className="card update-card" key={u.id}>
                <h3 className="card-title">{u.versionName}</h3>
                <p className="card-description">{`${getFirstTwoSentences(u.releaseNotes)}...`}</p>
                <p className="card-date">{getTimeAndDate(u.timestamp)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
