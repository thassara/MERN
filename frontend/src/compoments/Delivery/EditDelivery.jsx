import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import IssueDeliveryForm from './IssueDeliveryForm'; // Import the form component

const EditDelivery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api/issue-delivery/${id}`);
        setDelivery(response.data);
      } catch (error) {
        console.error('Error fetching delivery:', error);
      }
    };
    fetchDelivery();
  }, [id]);

  const handleSubmit = async (formData) => {
    // Prompt user for confirmation
    const confirmUpdate = window.confirm("Are you sure you want to update this delivery?");
    if (!confirmUpdate) {
      return; // Exit if the user cancels the action
    }

    try {
      await axios.put(`http://localhost:8070/api/issue-delivery/${id}`, formData);
      alert('Delivery updated successfully');
      navigate('/ViewAllDeliveries', { replace: true }); // Redirect after editing with replace
    } catch (error) {
      console.error('Error updating delivery:', error);
      setErrorMessage('Failed to update delivery. Please try again.');
    }
  };

  return (
    <div>
      {delivery ? (
        <IssueDeliveryForm
          delivery={delivery}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/ViewAllDeliveries', { replace: true })} // Use replace on cancel
        />
      ) : (
        <div>Loading...</div> // Show loading message until delivery data is fetched
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default EditDelivery;
