import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StockDashBoardOne() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [paymentStatus, setPaymentStatus] = useState(() => {
        // Initialize the status from localStorage if it exists, otherwise use an empty object
        const savedStatus = localStorage.getItem("paymentStatus");
        return savedStatus ? JSON.parse(savedStatus) : {};
    });

    // Fetch items from the backend
    useEffect(() => {
        axios.get("http://localhost:8070/items/all")
            .then((res) => {
                const fetchedItems = res.data.map(item => {
                    if (item.availableQty <= item.alrtQty) {
                        alert(`Alert: ${item.itemName} has reached or is below its alert quantity!`);
                    }
                    if (item.availableQty < 0) {
                        alert(`Error: Available quantity of ${item.itemName} cannot be less than 0!`);
                    }
                    return item;
                });
                setItems(fetchedItems);
            })
            .catch((err) => alert(err.message));
    }, []);

    // Function to return the appropriate inline style based on the comparison
    const getQuantityStyle = (availableQty, alrtQty) => {
        const difference = availableQty - alrtQty;
        if (difference <= 0) {
            return { color: "red", fontWeight: "bold" };
        } else if (difference <= 5) {
            return { color: "orange" };
        } else {
            return { color: "green" };
        }
    };

    // Handle payment done action
    const handlePaymentDone = (itemId) => {
        alert("Payment done status sent to the Stock Manager");
        setPaymentStatus((prevStatus) => {
            const updatedStatus = {
                ...prevStatus,
                [itemId]: "Payment Done"
            };
            localStorage.setItem("paymentStatus", JSON.stringify(updatedStatus)); // Save status in localStorage
            return updatedStatus;
        });
    };

    const handleNavigate = () => {
        navigate('/Handlepayment'); // Example path, replace with your desired path
    };

    // Function to apply color styling based on payment status
    const getStatusStyle = (status) => {
        return status === "Payment Done"
            ? { color: "green", fontWeight: "bold" }
            : { color: "red", fontWeight: "bold" };
    };

    return (
        <div className="dashboard-container">
            <h1>Stock Manager's Re-Fill Stock Details</h1>

            <div className="inventory-container">
                <h3 className="inventory-title">Inventory</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col"> Quantity</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items
                            .filter((item) => {
                                if (search === "") return item;
                                return item.itemName.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((item) => (
                                <tr key={item._id}>
                                    <td>{item.itemName}</td>
                                    <td style={getQuantityStyle(item.availableQty, item.alrtQty)}>
                                        {item.availableQty}
                                    </td>
                                    <td style={getStatusStyle(paymentStatus[item._id])}>
                                        {paymentStatus[item._id] || "Payment Not Done"}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-success" 
                                            onClick={() => handlePaymentDone(item._id)}
                                        >
                                            Payment Done
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* Add button below the table */}
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button 
                        onClick={handleNavigate} 
                        className="btn btn-danger"
                        style={{ backgroundColor: "red", color: "white" }}
                    >
                        Financial obligations for the payment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StockDashBoardOne;
