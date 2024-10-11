import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:8070/api/feedback');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/api/feedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (response.ok) {
        setMessage('Feedback accepted');
        fetchFeedbacks(); // Refresh list after update
      } else {
        setMessage('Error accepting feedback');
      }
    } catch (error) {
      console.error('Error accepting feedback:', error);
      setMessage('Error accepting feedback');
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/api/feedback/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Feedback rejected and deleted');
        fetchFeedbacks(); // Refresh list after deletion
      } else {
        setMessage('Error rejecting feedback');
      }
    } catch (error) {
      console.error('Error rejecting feedback:', error);
      setMessage('Error rejecting feedback');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text('Feedback Report', 14, 20);
    
    // Define table columns and rows
    const tableColumn = ["Customer Name", "Email", "Feedback", "Rating", "Status"];
    const tableRows = feedbacks.map(feedback => [
      feedback.fullName,
      feedback.email,
      feedback.feedback,
      feedback.rating,
      feedback.status
    ]);

    // Create table
    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    
    // Save the PDF
    doc.save('feedback_report.pdf');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Feedback List</h2>
        {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button 
            onClick={generatePDF}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Generate PDF Report
          </button>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '10px',
                width: '200px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginRight: '10px'
              }}
            />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f4f4f4' }}>Customer Name</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f4f4f4' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f4f4f4' }}>Feedback</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f4f4f4' }}>Rating</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f4f4f4' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f4f4f4' }}>Approve</th>
              <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f4f4f4' }}>Reject</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks
              .filter(feedback =>
                feedback.fullName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(feedback => (
                <tr key={feedback._id}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{feedback.fullName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{feedback.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{feedback.feedback}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{feedback.rating}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{feedback.status}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <button
                      onClick={() => handleAccept(feedback._id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#2ecc71',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Accept
                    </button>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <button
                      onClick={() => handleReject(feedback._id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FeedbackList;
