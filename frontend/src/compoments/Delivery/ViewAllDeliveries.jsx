import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import '../../style/delivery/ViewAllDeliveries.css';

const ViewAllDeliveries = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [assignedVehicles, setAssignedVehicles] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [allVehicles, setAllVehicles] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDeliveries();
        fetchVehicles();
        fetchOrders();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/issue-delivery');
            setDeliveries(response.data);
            const assigned = {};
            response.data.forEach(delivery => {
                if (delivery.assignedVehicleId) {
                    assigned[delivery._id] = delivery.assignedVehicleId;
                }
            });
            setAssignedVehicles(assigned);
        } catch (error) {
            console.error('Error fetching deliveries:', error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/vehicle');
            setAllVehicles(response.data);
            const availableVehicles = response.data.filter(vehicle => vehicle.status === 'Available');
            const filteredVehicles = availableVehicles.filter(vehicle => {
                const count = Object.values(assignedVehicles).filter(id => id === vehicle._id).length;
                return count < 3;
            });
            setVehicles(filteredVehicles);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8070/api/orders/Allread');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleVehicleAssign = async (orderId, vehicleId) => {
        const updatedAssignments = {
            ...assignedVehicles,
            [orderId]: vehicleId,
        };
        setAssignedVehicles(updatedAssignments);

        if (vehicleId) {
            const vehicleAssignments = Object.values(updatedAssignments).filter(id => id === vehicleId).length;
            if (vehicleAssignments >= 3) {
                await axios.put(`http://localhost:8070/api/vehicle/${vehicleId}`, { status: 'Unavailable' });
                fetchVehicles(); // Refresh vehicles after status update
            }
        }
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setSelectedOrder({ ...selectedOrder, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/api/orders/update/${selectedOrder._id}`, selectedOrder);
            fetchOrders(); // Refresh orders after update
            setSelectedOrder(null); // Clear selected order
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleDelete = async (deliveryId) => {
        try {
            await axios.delete(`http://localhost:8070/api/issue-delivery/${deliveryId}`);
            fetchDeliveries(); // Refresh the deliveries after deletion
        } catch (error) {
            console.error('Error deleting delivery:', error);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        // Ensure newStatus is valid
        if (newStatus !== 'Pending' && newStatus !== 'Delivered') {
            console.error('Invalid status:', newStatus);
            return;
        }

        const updatedOrder = orders.find(order => order._id === orderId);
        if (updatedOrder) {
            updatedOrder.status = newStatus; // Update to match the backend schema
            try {
                await axios.put(`http://localhost:8070/api/orders/update/${orderId}`, updatedOrder);
                fetchOrders(); // Refresh orders after status update
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    };

    // Filter deliveries based on customer name or status
    const filteredOrders = orders.filter(order => 
        (order.Cus_name && order.Cus_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.status && order.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Generate PDF for filtered orders
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Orders Report', 14, 16);
        doc.autoTable({
            head: [['Customer Name', 'Quantity', 'Location', 'Issue Date', 'Delivery Date', 'Status']],
            body: filteredOrders.map(order => [
                order.Cus_name,
                order.qty,
                order.Location,
                order.IssueDate ? new Date(order.IssueDate).toLocaleDateString() : '-',
                order.DeliveryDate ? new Date(order.DeliveryDate).toLocaleDateString() : '-',
                order.status, // Match the backend field
            ]),
        });
        doc.save('orders_report.pdf');
    };

    return (
        <div className="container">
            <h5 style={{ textAlign: 'center', fontSize: '30px', marginTop: '15px', marginBottom: '35px' }}>View All Orders</h5>

            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by Customer Name or Status"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <button onClick={() => navigate('/IssueDeliveryForm')}>Add New Issue Delivery</button>
            <button onClick={generatePDF}>Generate Report</button>

            {/* Orders Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Issue Date</th>
                        <th>Delivery Date</th>
                        <th>Status</th>
                        <th>Assigned Vehicle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.Cus_name}</td>
                            <td>{order.qty}</td>
                            <td>{order.Location}</td>
                            <td>{order.IssueDate ? new Date(order.IssueDate).toLocaleDateString() : '-'}</td>
                            <td>{order.DeliveryDate ? new Date(order.DeliveryDate).toLocaleDateString() : '-'}</td>
                            <td>
                                <select
                                    value={order.status || ''} // Update to match the backend field
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    value={assignedVehicles[order._id] || ''}
                                    onChange={(e) => handleVehicleAssign(order._id, e.target.value)}
                                >
                                    <option value="">Select Vehicle</option>
                                    {vehicles.map(vehicle => (
                                        <option key={vehicle._id} value={vehicle._id}>
                                            {vehicle.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleEditOrder(order)}>Issue Delivery</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditional Form for Editing Selected Order */}
            {selectedOrder && (
                <div className="edit-form">
                    <h3>Edit Order</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>Customer Name:</label>
                            <input type="text" name="Cus_name" value={selectedOrder.Cus_name} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <label>Quantity:</label>
                            <input type="number" name="qty" value={selectedOrder.qty} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <label>Location:</label>
                            <input type="text" name="Location" value={selectedOrder.Location} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <label>Issue Date:</label>
                            <input type="date" name="IssueDate" value={selectedOrder.IssueDate ? selectedOrder.IssueDate.substring(0, 10) : ''} onChange={handleFormChange} required />
                        </div>
                        <div>
                            <label>Delivery Date:</label>
                            <input type="date" name="DeliveryDate" value={selectedOrder.DeliveryDate ? selectedOrder.DeliveryDate.substring(0, 10) : ''} onChange={handleFormChange} required />
                        </div>
                        <button type="submit">Update Order</button>
                        <button type="button" onClick={() => setSelectedOrder(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ViewAllDeliveries;
