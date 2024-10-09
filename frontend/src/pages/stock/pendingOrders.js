import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../style/stock/PendingOrders.css";

function PendingOrders() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [quantity, setQuantity] = useState("");
    const [assignDate, setAssignDate] = useState(new Date());
    const [orders, setOrders] = useState([]);

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



    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate quantity to ensure it's a positive number
        if (Number(quantity) <= 0) {
            alert("Error: Quantity must be a positive number greater than zero");
            return;  // Prevent submission
        }
        
        // Find the selected item's details
        const selectedItemDetails = items.find(item => item.itemName === selectedItem);
        
        if (!selectedItemDetails) {
            alert("Please select a valid item.");
            return;
        }
        
        // Check if the entered quantity is greater than the available quantity
        if (Number(quantity) > selectedItemDetails.availableQty) {
            alert(`Error: The entered quantity for ${selectedItem} exceeds the available quantity (${selectedItemDetails.availableQty}).`);
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
                        </div>
    
                        <div className="POform-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                className="POform-control"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
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
                                <th>Order ID</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {/* Loop through the orders and display each one */}
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{new Date(order.date).toLocaleDateString()}</td> {/* Format the date */}
                                <td>{order._id}</td> {/* Order ID */}
                                <td>
                                    {/* Display package_type, qty, and Cus_note in the Order Details column */}
                                    <strong>Package Type:</strong> {order.package_type}<br />
                                    <strong>Quantity:</strong> {order.qty}<br />
                                    <strong>Customer Note:</strong> {order.Cus_note || "N/A"} {/* If Cus_note is empty, show "N/A" */}
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
