import React, { useState } from 'react';

function FeedbackForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(''); // For displaying submission message
  const [error, setError] = useState(''); // For displaying error message

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }

    if (!email.trim() || !isValidEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    if (!feedback.trim() || feedback.length < 10) {
      setError('Feedback must be at least 10 characters long.');
      return;
    }

    const newFeedback = { fullName, email, feedback, rating };

    try {
      const response = await fetch('http://localhost:8070/api/feedback/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      });

      if (response.ok) {
        setMessage('Thank you, your submission has been received.');
        setError(''); // Clear error message
        setFullName(''); // Clear form fields
        setEmail('');
        setFeedback('');
        setRating(0);
      } else {
        setError('Error submitting feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error submitting feedback. Please check your connection.');
    }
  };

  const handleCancel = () => {
    setFullName('');
    setEmail('');
    setRating(0);
    setFeedback('');
    setMessage('');
    setError('');
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Give Your Feedback</h1>

      {message && (
        <p style={{ color: 'green', fontWeight: 'bold', textAlign: 'center' }}>
          {message}
        </p>
      )}
      {error && (
        <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="rating">Rate our service:</label>
          <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                style={{
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: index < rating ? '#ffcc00' : '#ccc',
                }}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            minLength="10"
            placeholder="Please provide at least 10 characters."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
