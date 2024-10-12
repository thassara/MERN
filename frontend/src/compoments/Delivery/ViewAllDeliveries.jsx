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
            const response = await axios.get('http://localhost:8070/orders/Allread');
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

    const handleEditOrder = (orderId) => {
        navigate(`/edit-order/${orderId}`); // Navigate to the edit page
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
        if (newStatus !== 'Pending' && newStatus !== 'Delivered') {
            console.error('Invalid status:', newStatus);
            return;
        }

        try {
            await axios.put(`http://localhost:8070/api/orders/update/${orderId}`, { status: newStatus }); // Update order in backend
            setOrders(prevOrders => prevOrders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )); // Update status in local state
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredOrders = orders.filter(order => 
        (order.Cus_name && order.Cus_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.status && order.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Orders Report', 14, 16);
        doc.autoTable({
            head: [['Customer Name', 'Quantity', 'Location', 'Issue Date', 'Delivery Date', 'Status', 'Assigned Vehicle']],
            body: filteredOrders.map(order => [
                order.Cus_name,
                order.qty,
                order.Location,
                order.IssueDate ? new Date(order.IssueDate).toLocaleDateString() : '-',
                order.DeliveryDate ? new Date(order.DeliveryDate).toLocaleDateString() : '-',
                order.status,
                assignedVehicles[order._id] ? allVehicles.find(v => v._id === assignedVehicles[order._id])?.name || 'Not Assigned' : 'Not Assigned',
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

            <button onClick={generatePDF}>Generate Report</button>

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
                                    value={order.status || ''}
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
                                <button onClick={() => handleEditOrder(order._id)}>Issue Delivery</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAllDeliveries;
