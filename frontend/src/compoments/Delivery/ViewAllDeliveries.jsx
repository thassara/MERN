
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../style/delivery/ViewAllDeliveries.css';

const ViewAllDeliveries = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [assignedVehicles, setAssignedVehicles] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [allVehicles, setAllVehicles] = useState([]);
    const navigate = useNavigate(); // Initialize the navigate hook

    useEffect(() => {
        fetchDeliveries();
        fetchVehicles();
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

    const handleVehicleAssign = async (deliveryId, vehicleId) => {
        const updatedAssignments = {
            ...assignedVehicles,
            [deliveryId]: vehicleId,
        };

        setAssignedVehicles(updatedAssignments);

        if (vehicleId) {
            const vehicleAssignments = Object.values(updatedAssignments).filter(id => id === vehicleId).length;
            if (vehicleAssignments >= 3) {
                await axios.put(`http://localhost:8070/api/vehicle/${vehicleId}`, { status: 'Unavailable' });
                fetchVehicles();
            }
        }
    };

    const handleEdit = (delivery) => {
        // Navigate to the IssueDeliveryForm with the delivery ID for editing
        navigate(`/IssueDeliveryForm`, { state: { delivery } });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the delivery?`);

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8070/api/issue-delivery/${id}`);
                setDeliveries(deliveries.filter(delivery => delivery._id !== id));
            } catch (error) {
                console.error('Error deleting delivery:', error);
            }
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Filtered Delivery Issues Report', 14, 20);

        const tableColumn = ["Order ID", "Total Quantity", "Total Amount", "Issue Date", "Delivered Date", "Status", "Location", "Assigned Vehicle"];
        const tableRows = [];

        deliveries.forEach(delivery => {
            const assignedVehicleName = assignedVehicles[delivery._id]
                ? allVehicles.find(v => v._id === assignedVehicles[delivery._id])?.name || 'Vehicle Unavailable'
                : 'No vehicle assigned';

            const deliveryData = [
                delivery.OrderId,
                delivery.TotalQty,
                delivery.TotalAmt,
                delivery.IssueDate ? new Date(delivery.IssueDate).toLocaleDateString() : '-',
                delivery.DeliveryDate ? new Date(delivery.DeliveryDate).toLocaleDateString() : '-',
                delivery.Status,
                delivery.Location,
                assignedVehicleName,
            ];
            tableRows.push(deliveryData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('filtered_delivery_issues_report.pdf');
    };

    const filteredDeliveries = deliveries.filter((delivery) =>
        (delivery.OrderId && typeof delivery.OrderId === 'string' ? delivery.OrderId.toLowerCase() : '')
            .includes(searchTerm.toLowerCase()) ||
        (delivery.Status && typeof delivery.Status === 'string' ? delivery.Status.toLowerCase() : '')
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h2>View All Delivery Issues</h2>

            <div className="search-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by Order ID or Status"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Button to navigate to the add delivery form */}
            <button onClick={() => navigate('/IssueDeliveryForm')}>Add New Issue Delivery</button>

            <button onClick={generatePDF}>Generate Report</button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total Quantity</th>
                        <th>Total Amount</th>
                        <th>Issue Date</th>
                        <th>Delivered Date</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Assigned Vehicle</th>
                        <th>Assign Vehicle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDeliveries.map((delivery) => (
                        <tr key={delivery._id}>
                            <td>{delivery.OrderId}</td>
                            <td>{delivery.TotalQty}</td>
                            <td>{delivery.TotalAmt}</td>
                            <td>{delivery.IssueDate ? new Date(delivery.IssueDate).toLocaleDateString() : '-'}</td>
                            <td>{delivery.DeliveryDate ? new Date(delivery.DeliveryDate).toLocaleDateString() : '-'}</td>
                            <td>{delivery.Status}</td>
                            <td>{delivery.Location}</td>
                            <td>
                                {assignedVehicles[delivery._id]
                                    ? allVehicles.find(v => v._id === assignedVehicles[delivery._id])?.name || 'Vehicle Unavailable'
                                    : 'No vehicle assigned'}
                            </td>
                            <td>
                                <select
                                    value={assignedVehicles[delivery._id] || ''}
                                    onChange={(e) => handleVehicleAssign(delivery._id, e.target.value)}
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
                            <button className="btn-edit" onClick={() => navigate(`/edit-delivery/${delivery._id}`)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(delivery._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAllDeliveries;