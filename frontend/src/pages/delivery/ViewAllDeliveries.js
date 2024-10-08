import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IssueDeliveryForm from './IssueDeliveryForm'; 
import '../../style/delivery/ViewAllDeliveries.css';

const ViewAllDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch deliveries from the backend on component mount
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/issue-delivery');
        setDeliveries(response.data);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };
    fetchDeliveries();
  }, []);

  const handleEdit = (delivery) => {
    setSelectedDelivery(delivery);
    setShowForm(true); // Show the form when editing
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this delivery?");

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8070/api/issue-delivery/${id}`);

        setDeliveries(deliveries.filter((delivery) => delivery._id !== id)); // Remove from UI
      } catch (error) {
        console.error('Error deleting delivery:', error);
      }
    }
  };

  const handleFormSubmit = async (newDelivery) => {
    try {
      if (selectedDelivery) {
        // Update existing delivery
         const response = await axios.put(`http://localhost:8070/api/issue-delivery/${selectedDelivery._id}`, newDelivery);
        setDeliveries(deliveries.map((delivery) =>
          delivery._id === selectedDelivery._id ? response.data : delivery
        ));
      } else {
        // Add new delivery
        const response = await axios.post('http://localhost:8070/api/issue-delivery', newDelivery);
        setDeliveries([...deliveries, response.data]);
      }
      setShowForm(false); // Hide form after saving
      setSelectedDelivery(null); // Clear selection
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container">
      <h2>View All Delivery Issues</h2>

      <button onClick={() => setShowForm(true)}>Add New Issue Delivery</button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total Quantity</th>
            <th>Total Amount</th>
            <th>Issue Date</th>
            <th>Delivered Date</th>
            <th>Status</th>
            <th>Customer ID</th>
            <th>Order ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery._id}</td>
              <td>{delivery.TotalQty}</td>
              <td>{delivery.TotalAmt}</td>
              <td>{delivery.IssueDate ? new Date(delivery.IssueDate).toLocaleDateString() : '-'}</td>
              <td>{delivery.DeliveryDate ? new Date(delivery.DeliveryDate).toLocaleDateString() : '-'}</td>
              <td>{delivery.Status}</td>
              <td>{delivery.CusId}</td>
              <td>{delivery.OrderId}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(delivery)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(delivery._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <IssueDeliveryForm
          delivery={selectedDelivery}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedDelivery(null);
          }}
        />
      )}
    </div>
  );
};

export default ViewAllDeliveries;