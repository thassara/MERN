import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../../style/stock/StockDashBoard.css"; 


function StockDashBoardOne() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

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

    const handleNavigate = (path) => {
        navigate(path);
    };

    // Function to return the appropriate inline style based on the comparison
    const getQuantityStyle = (availableQty, alrtQty) => {
        const difference = availableQty - alrtQty;

        if (difference <= 0) {
            return { backgroundColor: "red", color: "white", fontWeight: "bold" }; // Red for 0 or less
        } else if (difference <= 20) {
            return { backgroundColor: "orange", color: "white", fontWeight: "bold" }; // Orange for difference between 20 and 0
        }
        return {}; // Default style (no color)
    }; 

    return (
        <div className="dashboard-container">
            <h1>Stock Dashboard</h1>
            <div className="button-group">
                <button onClick={() => handleNavigate('/StockAddForm')}>Add Items</button>
                <button onClick={() => handleNavigate('/AssignItems')}>Assign Items</button>
                <button onClick={() => handleNavigate('/ContactSupplier')}>Restock</button>
                <button onClick={() => handleNavigate('/StockDetails')}>Stock Details</button>
            </div>

            
            <div className="inventory-container">
                <h3 className="inventory-title">Inventory</h3>
                <div className="search-bar-container">
                    <label htmlFor="itemName" className="form-label">Search Item</label>
                    <input
                        type="text"
                        className="form-control"
                        id="itemName"
                        placeholder="Enter Item Name"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Available Quantity</th>
                            <th scope="col">Alert Quantity</th>
                            <th scope="col">Measurement</th>
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
                                    {/* Applying inline style directly to the table cell */}
                                    <td style={getQuantityStyle(item.availableQty, item.alrtQty)}>
                                        {item.availableQty}
                                    </td>
                                    <td>{item.alrtQty}</td>
                                    <td>{item.measurement}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* Add the color legend */}
                <div className="legend-container">
                    <h5>Level</h5>
                    <div className="legend-item">
                        <span className="legend-box red-box"></span> 0 or below alert level
                    </div>
                    <div className="legend-item">
                        <span className="legend-box orange-box"></span>Close to alert level
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockDashBoardOne;
