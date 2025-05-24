import React from "react";
import "./MarketingPage.css";

export default function MarketingPage({ releaseNotes }) {
  return (
    <>
      <header className="header">
        <h1>Teams Generator</h1>
        <nav>
          <a href="#updates">Updates</a>
          <a href="#download">Download</a>
          <a href="#profile">Profile</a>
        </nav>
      </header>

      <main>
        <section id="updates" className="updates">
          <h2>Latest Updates</h2>
          <ul>
            {releaseNotes.map(({ id, versionName, versionNumber, notes }) => (
              <li key={id} style={{ marginBottom: 15 }}>
                <strong>
                  {versionName} (v{versionNumber})
                </strong>
                <p>{notes}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* rest remains same as before */}

        <section id="download" className="download">
          <h2>Get the App</h2>
          <div className="buttons">
            <a
              href="https://play.google.com/store/apps/details?id=com.example.teamsgenerator"
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              Google Play
            </a>
            <a
              href="https://apps.apple.com/app/id1234567890"
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              App Store
            </a>
            <a href="https://teamsgenerator.example.com" target="_blank" rel="noreferrer" className="button">
              Web App
            </a>
          </div>
        </section>

        <section id="profile" className="profile">
          <h2>About Me</h2>
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="profile-pic"
          />
          <p>
            Hi, I’m Shachar, the creator of Teams Generator. I’m passionate about
            building fun and fair tools for sports lovers everywhere!
          </p>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for your feedback!");
            }}
          >
            <label>
              Your Email:
              <input type="email" required placeholder="you@example.com" />
            </label>
            <label>
              Comments:
              <textarea required placeholder="Your feedback here..." />
            </label>
            <button type="submit">Send Feedback</button>
          </form>
        </section>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Teams Generator. All rights reserved.
      </footer>
    </>
  );
}
