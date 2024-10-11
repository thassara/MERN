import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../style/delivery/EditOrder.css';

const EditOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);  // New loading state
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/orders/read/${id}`);
                if (response.data) {
                    setOrder(response.data);
                    setLoading(false);  // Data fetched successfully
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching order');
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8070/orders/update/${order._id}`, order);
            navigate('/ViewAllDeliveries');
        } catch (error) {
            setError('Error updating order');
        }
    };

    // If there's an error, display an error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Show loading state while fetching the order
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-order-container">
            <h3>Issue Delivery</h3>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Customer Name:</label>
                    <input
                        type="text"
                        name="Cus_name"
                        value={order?.Cus_name || ''}  // Prevent null/undefined access
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="qty"
                        value={order?.qty || ''}  // Prevent null/undefined access
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="Location"
                        value={order?.Location || ''}  // Prevent null/undefined access
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>Issue Date:</label>
                    <input
                        type="date"
                        name="IssueDate"
                        value={order?.IssueDate ? order.IssueDate.substring(0, 10) : ''}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>Delivery Date:</label>
                    <input
                        type="date"
                        name="DeliveryDate"
                        value={order?.DeliveryDate ? order.DeliveryDate.substring(0, 10) : ''}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <button type="submit">Update Order</button>
                <button type="button" onClick={() => navigate('/view-all-deliveries')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditOrder;
