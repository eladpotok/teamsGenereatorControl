import React, { useState, useEffect } from 'react';
import './Update.css';
import { v4 as uuidv4 } from 'uuid';
import { addUpdate, deleteUpdate, getAllUpdates, PartitionKeyOfUpdates } from './Server';
import { getFirstTwoSentences, getTimeAndDate } from './Helpers';

const Update = (props) => {
  const [versionName, setVersionName] = useState('');
  const [versionNumber, setVersionNumber] = useState('');
  const [releaseNotes, setReleaseNotes] = useState('');
  const [updates, setUpdates] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  // const [feedbacks, setFeedbacks] = useState({});
  // const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchUpdates = async () => {
      const updates = await getAllUpdates();
      setUpdates(updates);

    };

    fetchUpdates();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!versionName || !versionNumber || !releaseNotes) {
      setSubmissionStatus('error');
      clearStatus();
      return;
    }

    const newUpdate = {
      versionName,
      versionNumber,
      releaseNotes,
      partitionKey: PartitionKeyOfUpdates,
      rowKey: uuidv4(),
      timestamp: new Date().toISOString().split('T')[0],
    };

    const isSucceeded = await addUpdate(newUpdate);
    setVersionName('');
    setVersionNumber('');
    setReleaseNotes('');
    setSubmissionStatus(isSucceeded ? 'success' : 'error');
    clearStatus();
  };

  const clearStatus = () => {
    setTimeout(() => setSubmissionStatus(null), 3000);
  };

  // const handleRatingChange = (index, value) => {
  //   setRatings((prev) => ({ ...prev, [index]: value }));
  // };

  const toggleShowMore = (index) => {
    setUpdates((prev) =>
      prev.map((update, i) =>
        i === index ? { ...update, showMore: !update.showMore } : update
      )
    );
  };

  // const handleFeedbackChange = (index, value) => {
  //   setFeedbacks((prev) => ({ ...prev, [index]: value }));
  // };

  // const handleFeedbackSubmit = async (index, updateId) => {
  //   const feedback = feedbacks[index];
  //   const rating = ratings[index];
  //   if (!feedback && !rating) return;

  //   const feedbackData = {
  //     rating,
  //     feedback,
  //     partitionKey: updateId,
  //     rowKey: uuidv4(),
  //     timestamp: new Date().toISOString().split('T')[0],
  //   }

  //   const success = await submitFeedback(feedbackData);

  //   if (success) {
  //     // Reload updated feedbacks from server (simplest way)
  //     const refreshed = await getAllUpdates();
  //     setUpdates(refreshed);
  //   }

  //   setFeedbacks((prev) => ({ ...prev, [index]: '' }));
  //   setRatings((prev) => ({ ...prev, [index]: 0 }));

  // };

  const handleDeleteUpdate = async (update) => {
    const success = await deleteUpdate(update);
    if (success) {
      setUpdates((prev) => prev.filter((u) => u.rowKey !== update.rowKey));
    } else {
      alert("Failed to delete update.");
    }
  };

  return (
    <div className="update-container">
      {props.isAdmin && <div> <h2>Release Notes</h2>

      <form className="update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Version Name"
          value={versionName}
          onChange={(e) => setVersionName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Version Number (e.g. 1.0.0)"
          value={versionNumber}
          onChange={(e) => setVersionNumber(e.target.value)}
        />
        <textarea
          placeholder="Release Notes"
          value={releaseNotes}
          onChange={(e) => setReleaseNotes(e.target.value)}
        ></textarea>
        <button type="submit">Publish</button>

        {submissionStatus === 'success' && (
          <span className="status success">✅ Update published!</span>
        )}
        {submissionStatus === 'error' && (
          <span className="status error">❌ Please fill in all fields</span>
        )}
        </form>
      </div>}

      <div className="update-list">
        <h3>Previous Updates</h3>
        {updates?.length === 0 ? (
          <p>No updates yet.</p>
        ) : (
          updates?.map((update, index) => (
            <div className="update-item" key={index}>
              <div className="update-header">
                <strong>{update.versionName}</strong>
                <span>
                  <span>{update.versionNumber}</span>
                  {props.isAdmin && <button className="delete-button" onClick={() => handleDeleteUpdate(update)}>✖</button>}
                </span>
              </div>

              {update.showMore && (
                <>
                  <p className="update-notes">{update.releaseNotes}</p>
                  <p className="update-date">Published on: {getTimeAndDate(update.timestamp)}</p>

                  {/* <h4>Feedback</h4>
                  {Array.isArray(update.existingFeedbacks) && update.existingFeedbacks.length > 0 ? (
                    update.existingFeedbacks.map((fb, i) => (
                      <div key={i} className="feedback-entry">
                        <div className="feedback-stars">
                          {'★'.repeat(fb.rating || 0).padEnd(5, '☆')}
                        </div>
                        <div className="feedback-text">{fb.feedback || <em>No comment</em>}</div>
                      </div>
                    ))
                  ) : (
                    <p className="no-feedback">No feedback yet.</p>
                  )}

                  <textarea
                    className="feedback-textarea"
                    placeholder="Leave feedback..."
                    value={feedbacks[index] || ''}
                    onChange={(e) => handleFeedbackChange(index, e.target.value)}
                  />
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${ratings[index] >= star ? 'selected' : ''}`}
                        onClick={() => handleRatingChange(index, star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <button
                    className="feedback-button"
                    onClick={() => handleFeedbackSubmit(index, update.rowKey)}
                  >
                    Submit Feedback
                  </button>
                  {feedbackStatus[index] === 'success' && (
                    <span className="feedback-status success">✅ Feedback sent!</span>
                  )}
                  {feedbackStatus[index] === 'error' && (
                    <span className="feedback-status error">❌ Failed to send feedback</span>
                  )} */}
                </>
              )}
              {!update.showMore && <p className="update-preview">{`${getFirstTwoSentences(update.releaseNotes)}...`}</p>}
              <button
                className="toggle-button"
                onClick={() => toggleShowMore(index)}
              >
                {update.showMore ? 'Hide Info' : 'Show More'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Update;
