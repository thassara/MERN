import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignMachine = () => {
  const [orderQueue, setOrderQueue] = useState({ orderId: '', machineId: '' });
  const [infoOrders, setInfoOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]); // New state for storing order details from order.js
  const [loading, setLoading] = useState(false);

  // Fetch all orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8070/orderqueues/Allread');
        setInfoOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8070/orders/Allread'); // Fetch order details from order.js
        setOrderDetails(response.data); // Set the response to state
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrders();
    fetchOrderDetails();

    // Load completed orders from localStorage
    const storedCompletedOrders = localStorage.getItem('completedOrders');
    if (storedCompletedOrders) {
      setCompletedOrders(JSON.parse(storedCompletedOrders));
    }
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
        orderid: orderQueue.orderId,
        machineid: orderQueue.machineId,
      };
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8070/orderqueues/add', orderData);
        alert('Order assigned successfully!');
        setInfoOrders([...infoOrders, response.data]);
        setOrderQueue({ orderId: '', machineId: '' });
        setLoading(false);
      } catch (error) {
        console.error('Error assigning order:', error);
        alert('Error assigning order.');
        setLoading(false);
      }
    }
  };

  // Removing an order
  const handleRemoveOrder = async (id, index) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8070/orderqueues/delete/${id}`);
      alert('Order removed successfully!');
      const updatedOrders = [...infoOrders];
      updatedOrders.splice(index, 1);
      setInfoOrders(updatedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error removing order:', error);
      alert('Error removing order.');
      setLoading(false);
    }
  };

  // Marking an order as completed without removing it from the assigned orders form
  const handleMarkAsCompleted = (order) => {
    const isAlreadyCompleted = completedOrders.some(
      (completedOrder) => completedOrder._id === order._id
    );
    
    if (!isAlreadyCompleted) {
      const updatedCompletedOrders = [...completedOrders, order];
      setCompletedOrders(updatedCompletedOrders);
      localStorage.setItem('completedOrders', JSON.stringify(updatedCompletedOrders));
      alert('Order marked as completed.');
    } else {
      alert('This order is already marked as completed.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Assign Machine to Order Form */}
      <div style={styles.manageOrderQueue}>
        <h2>Assign Machine to Order</h2>
        <form onSubmit={handleAssignOrder} style={styles.box}>
          <div style={styles.details}>
            <div>
              <label>Order Name:</label>
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

      {/* Assigned Orders */}
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
                <strong>Order Name:</strong> {order.orderid}
              </div>
              <div>
                <strong>Machine ID:</strong> {order.machineid}
              </div>
              <button onClick={() => handleMarkAsCompleted(order)} style={styles.completedButton} disabled={loading}>
                 Completed
              </button>
              <button onClick={() => handleRemoveOrder(order._id, index)} style={styles.removeButton} disabled={loading}>
                {loading ? 'Removing...' : 'Remove'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Completed Orders Section */}
      <div style={styles.infoSection}>
        <h2>Completed Orders</h2>
        {completedOrders.length === 0 ? (
          <p>No completed orders yet.</p>
        ) : (
          completedOrders.map((order, index) => (
            <div key={order._id} style={styles.infoBox}>
              <div>
                <strong>Order Name:</strong> {order.orderid}
              </div>
              <div>
                <strong>Machine ID:</strong> {order.machineid}
              </div>
              <div>
                <strong>Status:</strong> Completed
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Details Table */}
      <div style={styles.orderDetailsTable}>
        <h2>Order Details</h2>
        <table style={styles.table}>
          <thead>
            <tr>
             
              <th>Customer Name</th>
              <th>Email</th>
              <th>Package Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.length === 0 ? (
              <tr>
                <td colSpan="7">No orders found.</td>
              </tr>
            ) : (
              orderDetails.map((order) => (
                <tr key={order._id}>
                 
                  <td>{order.Cus_name}</td>
                  <td>{order.Cus_email}</td>                 
                  <td>{order.package_type}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
  completedButton: {
    backgroundColor: '#28a745',
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
  orderDetailsTable: {
    flexBasis: '45%',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
};

export default AssignMachine;
