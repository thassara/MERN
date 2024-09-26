import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignMachine = () => {
  const [orderQueue, setOrderQueue] = useState({ orderId: '', machineId: '' });
  const [infoOrders, setInfoOrders] = useState([]);
  const [loading, setLoading] = useState(false); // For loading state

  // Fetch all orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get('http://localhost:8070/orderqueues/Allread');
        setInfoOrders(response.data);
        setLoading(false); // End loading
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false); // End loading on error
      }
    };
    fetchOrders();
  }, []);

  // Handling form input changes
  const handleOrderInputChange = (e) => {
    setOrderQueue({
      ...orderQueue,
      [e.target.name]: e.target.value,
    });
  };

  // Assigning order to machine
  const handleAssignOrder = async (e) => {
    e.preventDefault();
    if (orderQueue.orderId && orderQueue.machineId) {
      const orderData = {
        orderid: orderQueue.orderId, // Matching the backend schema field
        machineid: orderQueue.machineId, // Matching the backend schema field
      };
      try {
        setLoading(true); // Start loading
        const response = await axios.post('http://localhost:8070/orderqueues/add', orderData); // Correct route
        alert('Order assigned successfully!');
        setInfoOrders([...infoOrders, response.data]); // Update the orders list
        setOrderQueue({ orderId: '', machineId: '' });
        setLoading(false); // End loading
      } catch (error) {
        console.error('Error assigning order:', error);
        alert('Error assigning order.');
        setLoading(false); // End loading on error
      }
    }
  };

  // Removing an order
  const handleRemoveOrder = async (id, index) => {
    try {
      setLoading(true); // Start loading
      await axios.delete(`http://localhost:8070/orderqueues/delete/${id}`);
      alert('Order removed successfully!');
      const updatedOrders = [...infoOrders];
      updatedOrders.splice(index, 1); // Remove the deleted order from the list
      setInfoOrders(updatedOrders); // Update the orders list
      setLoading(false); // End loading
    } catch (error) {
      console.error('Error removing order:', error);
      alert('Error removing order.');
      setLoading(false); // End loading on error
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.manageOrderQueue}>
        <h2>Assign Machine to Order</h2>
        <form onSubmit={handleAssignOrder} style={styles.box}>
          <div style={styles.details}>
            <div>
              <label>Order ID:</label>
              <input
                type="text"
                name="orderId"
                value={orderQueue.orderId}
                onChange={handleOrderInputChange}
                style={styles.inputField}
              />
            </div>
            <div>
              <label>Machine ID:</label>
              <input
                type="text"
                name="machineId"
                value={orderQueue.machineId}
                onChange={handleOrderInputChange}
                style={styles.inputField}
              />
            </div>
          </div>
          <button type="submit" style={styles.assignButton} disabled={loading}>
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </form>
      </div>

      <div style={styles.infoSection}>
        <h2>Assigned Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : infoOrders.length === 0 ? (
          <p>No orders assigned yet.</p>
        ) : (
          infoOrders.map((order, index) => (
            <div key={order._id} style={styles.infoBox}>
              <div>
                <strong>Order ID:</strong> {order.orderid}
              </div>
              <div>
                <strong>Machine ID:</strong> {order.machineid}
              </div>
              <button onClick={() => handleRemoveOrder(order._id, index)} style={styles.removeButton} disabled={loading}>
                {loading ? 'Removing...' : 'Remove'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '20px',
  },
  manageOrderQueue: {
    flexBasis: '45%',
    backgroundColor: '#e0e0e0',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  infoSection: {
    flexBasis: '45%',
    backgroundColor: '#e0e0e0',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  box: {
    backgroundColor: '#d3d3d3',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  assignButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  infoBox: {
    backgroundColor: '#d3d3d3',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputField: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px',
    width: '100%',
  },
};

export default AssignMachine;
