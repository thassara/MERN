import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../style/stock/PendingOrders.css";

function PendingOrders() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [quantity, setQuantity] = useState("");
    const [assignDate, setAssignDate] = useState(new Date());
    const [orders, setOrders] = useState([]);
    
    // State for validation error messages
    const [quantityError, setQuantityError] = useState("");
    const [selectedItemError, setSelectedItemError] = useState("");

    // Fetch items from the stock collection for dropdown
    useEffect(() => {
        axios.get("http://localhost:8070/items/all")
            .then((res) => setItems(res.data))
            .catch((err) => alert(err.message));
    }, []);

    // Fetch orders from the server on component mount
    useEffect(() => {
        axios.get("http://localhost:8070/orders/Allread")
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                alert("Error fetching orders: " + err.message);
            });
    }, []);

    // Validate the quantity field
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        setQuantity(value);

        if (isNaN(value) || Number(value) <= 0) {
            setQuantityError("Please enter a valid positive number.");
        } else {
            setQuantityError("");
        }
    };

    // Handle form submission with additional validations
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate item selection
        if (!selectedItem) {
            setSelectedItemError("Please select an item.");
            return;
        } else {
            setSelectedItemError("");
        }

        // Validate quantity to ensure it's a positive number
        if (Number(quantity) <= 0) {
            setQuantityError("Quantity must be a positive number greater than zero.");
            return;  // Prevent submission
        }

        // Find the selected item's details
        const selectedItemDetails = items.find(item => item.itemName === selectedItem);

        if (!selectedItemDetails) {
            setSelectedItemError("Please select a valid item.");
            return;
        }

        // Check if the entered quantity is greater than the available quantity
        if (Number(quantity) > selectedItemDetails.availableQty) {
            setQuantityError(`The entered quantity exceeds the available quantity (${selectedItemDetails.availableQty}).`);
            return;
        }

        const assignData = {
            itemName: selectedItem,
            quantity: Number(quantity),
            assignDate
        };

        axios.post("http://localhost:8070/assign_items/add", assignData)
            .then(() => {
                axios.put(`http://localhost:8070/items/updateQuantity/${selectedItem}`, { quantity: -quantity })
                    .then(() => {
                        alert("Items assigned successfully and stock updated");
                        setSelectedItem("");
                        setQuantity("");
                        setAssignDate(new Date());
                    })
                    .catch((err) => {
                        alert("Error updating stock: " + err.message);
                    });
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="pending-orders-container">
            <h1 className="title-center">Pending Orders</h1>
            
            <div className="assign-order-container">
                <div className="assign-items-container">
                    <h3>Assign Items</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="POform-group">
                            <label>Item Name</label>
                            <select
                                className="POform-control"
                                value={selectedItem}
                                onChange={(e) => setSelectedItem(e.target.value)}
                                required
                            >
                                <option value="">Select Item</option>
                                {items.map((item) => (
                                    <option key={item._id} value={item.itemName}>
                                        {item.itemName}
                                    </option>
                                ))}
                            </select>
                            {selectedItemError && <span className="sterror-message">{selectedItemError}</span>}
                        </div>
    
                        <div className="POform-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                className="POform-control"
                                value={quantity}
                                onChange={handleQuantityChange}
                                required
                            />
                            {quantityError && <span className="sterror-message">{quantityError}</span>}
                        </div>
    
                        <div className="POform-group">
                            <label htmlFor="assignDate">Assign Date</label>
                            <input
                                type="date"
                                className="POform-control"
                                id="assignDate"
                                dateFormat="MM/dd/yyyy"
                                value={assignDate}
                                onChange={(e) => setAssignDate(e.target.value)}
                                required
                            />
                        </div>
    
                        <button type="submit" className="POsubmit">Submit</button>
                    </form>
                </div>
    
                <div className="POorder-details-container">
                    <h3 className="POtitle">Order Details</h3>
                    <table className="POtable">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Package Type</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.package_type}</td>
                                <td>
                                    <strong>Quantity:</strong> {order.qty}<br />
                                    <strong>Customer Note:</strong> {order.Cus_note || "N/A"}
                                </td>
                            </tr>
                        ))}
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PendingOrders;
