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
                                    <td>{item.availableQty}</td>
                                    <td>{item.alrtQty}</td>
                                    <td>{item.measurement}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StockDashBoardOne;
