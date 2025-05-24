import React, { useEffect, useState } from 'react';
import './Feedback.css';
import { v4 as uuidv4 } from 'uuid';
import { deleteFeedback, getAllFeedbacks, PartitionKeyOfFeedbacks, submitFeedback } from './Server';

const Feedback = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(3);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refreshFeedback, setRefreshFeedback] = useState(false);

    useEffect(() => {
        const fetchFeedbacks = async () => {
        const feedbacks = await getAllFeedbacks();
        setFeedbacks(feedbacks);

        console.log('Fetched feedbacks:', feedbacks);
        };

        fetchFeedbacks();
    }, [refreshFeedback]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.length > 250) {
      setError('Feedback cannot exceed 250 characters.');
      setSuccess('');
      return;
    }

    if (!name.trim() || !email.trim() || !text.trim()) {
      setError('Please fill out all fields.');
      setSuccess('');
      return;
    }

    if (rating === 0) {
      setError('Please provide a rating.');
      setSuccess('');
      return;
    }

    const newFeedback = {
      name,
      email,
      feedback: text,
      rating,
      partitionKey: PartitionKeyOfFeedbacks,
      rowKey: uuidv4(),
      timestamp: new Date().toISOString().split('T')[0],
    };

    const sucess = await submitFeedback(newFeedback);
    if(sucess) {
        setName('');
        setEmail('');
        setText('');
        setRating(3);
        setError('');
        setSuccess('Feedback submitted successfully!');
        setRefreshFeedback(!refreshFeedback);
    }
    else {
        setError('Failed to submit feedback. Please try again.');
        setSuccess('');
    }
  };

    const handleDeleteFeedback = async (feedback) => {
      const success = await deleteFeedback(feedback);
      if (success) {
        setFeedbacks((prev) => prev.filter((u) => u.rowKey !== feedback.rowKey));
      } else {
        alert("Failed to delete feedback.");
      }
    };
  

  return (
    <div className="feedback-container">
      <h2>Leave Feedback</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {/* <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="General">General</option>
            <option value="Bug">Bug</option>
            <option value="Feature Request">Feature Request</option>
          </select>
        </label> */}

        <label>
          Feedback:
          <textarea
            value={text}
            placeholder="Write your feedback..."
            onChange={(e) => setText(e.target.value)}
            maxLength={300}
          />
        </label>

        <div className="feedback-tip">
          {text.length}/250 characters
        </div>

        <label style={{display: 'flex'}}>
          <div>Rating:</div>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'selected' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </label>

        {error && <div className="feedback-error">{error}</div>}
        {success && <div className="feedback-success">{success}</div>}

        <button type="submit">Submit</button>
      </form>

      <div className="feedback-list">
        {feedbacks?.map((fb, index) => (
          <div className="feedback-entry" key={index}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <strong>{fb.name} ({fb.email})</strong>
                {props.isAdmin && <button className="delete-feedback-button" onClick={() => handleDeleteFeedback(fb)}>✖</button>}
            </div>
            - <em>{fb.type}</em>
            <div className="rating-stars">
              {'★'.repeat(fb.rating).padEnd(5, '☆')}
            </div>
            <p>{fb.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
