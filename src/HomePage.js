// HomePage.js
import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { getAllFeedbacks, getAllUpdates } from "./Server";
import { getFirstTwoSentences, getTimeAndDate } from "./Helpers";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [feedback, setFeedback] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
      const fetchFeedbacks = async () => {
        const feedbacks = await getAllFeedbacks();
        if(!feedbacks) return; // Handle case where no feedbacks are returned
        setFeedback(feedbacks.slice(0, 2)); // Get the latest two feedbacks
        };
        const fetchUpdates = async () => {
          const updates = await getAllUpdates();
          if(!updates) return; // Handle case where no updates are returned
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
