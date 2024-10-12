import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../style/delivery/EditOrder.css';

const EditOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/orders/read/${id}`);
                if (response.data) {
                    setOrder(response.data);
                    setLoading(false);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching order');
                setLoading(false);
            }
        };
        fetchOrder();

        // Cleanup: reset the state when the component unmounts
        return () => {
            setOrder(null); // Clear form data when component unmounts
        };
    }, [id]);

    const validateForm = () => {
        let errors = {};

        if (!order?.Cus_name || /[^a-zA-Z\s]/.test(order.Cus_name)) {
            errors.Cus_name = 'Customer name is required and should only contain letters';
        }

        if (!order?.qty) {
            errors.qty = 'Quantity is required';
        } else if (Number(order.qty) <= 0 || /[^\d]/.test(order.qty)) {
            errors.qty = 'Quantity must be a positive number';
        }

        if (!order?.Location) {
            errors.Location = 'Location is required';
        }

        if (!order?.IssueDate) {
            errors.IssueDate = 'Issue date is required';
        }

        if (!order?.DeliveryDate) {
            errors.DeliveryDate = 'Delivery date is required';
        }

        return errors;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? '' : prevErrors[name], // Clear the error message when valid input is entered
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            await axios.put(`http://localhost:8070/orders/update/${order._id}`, order);
            setOrder(null);  // Clear form data immediately before navigating
            navigate('/ViewAllDeliveries', { replace: true });  // Use replace to prevent going back to the form
        } catch (error) {
            setError('Error updating order');
        }
    };

    const handleCancel = () => {
        setOrder(null);  // Clear the form data immediately on cancel
        navigate('/ViewAllDeliveries', { replace: true });  // Use replace to prevent going back to the form
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                        value={order?.Cus_name || ''}
                        onChange={handleFormChange}
                        className={`input ${formErrors.Cus_name ? 'input-error' : ''}`}
                        required
                    />
                    {formErrors.Cus_name && <p className="error-message">{formErrors.Cus_name}</p>}
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="qty"
                        value={order?.qty || ''}
                        onChange={handleFormChange}
                        className={`input ${formErrors.qty ? 'input-error' : ''}`}
                        required
                    />
                    {formErrors.qty && <p className="error-message">{formErrors.qty}</p>}
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name="Location"
                        value={order?.Location || ''}
                        onChange={handleFormChange}
                        className={`input ${formErrors.Location ? 'input-error' : ''}`}
                        required
                    />
                    {formErrors.Location && <p className="error-message">{formErrors.Location}</p>}
                </div>
                <div>
                    <label>Issue Date:</label>
                    <input
                        type="date"
                        name="IssueDate"
                        value={order?.IssueDate ? order.IssueDate.substring(0, 10) : ''}
                        onChange={handleFormChange}
                        className={`input ${formErrors.IssueDate ? 'input-error' : ''}`}
                        required
                    />
                    {formErrors.IssueDate && <p className="error-message">{formErrors.IssueDate}</p>}
                </div>
                <div>
                    <label>Delivery Date:</label>
                    <input
                        type="date"
                        name="DeliveryDate"
                        value={order?.DeliveryDate ? order.DeliveryDate.substring(0, 10) : ''}
                        onChange={handleFormChange}
                        className={`input ${formErrors.DeliveryDate ? 'input-error' : ''}`}
                        required
                    />
                    {formErrors.DeliveryDate && <p className="error-message">{formErrors.DeliveryDate}</p>}
                </div>
                <button type="submit">Update Order</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditOrder;
