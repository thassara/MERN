import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../style/stock/allStock.css";

export default function AllStock() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [editItem, setEditItem] = useState(null); 
    const [updatedItem, setUpdatedItem] = useState({ 
        itemName: "",
        alrtQty: 0,
        measurement: ""
    });

    useEffect(() => {
        function getItems() {
            axios.get("http://localhost:8070/items/all").then((res) => {
                setItems(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getItems();
    }, []);

    function deleteItem(id) {
        axios.delete(`http://localhost:8070/items/delete/${id}`).then(() => {
            alert("Item Deleted");
        }).catch((err) => {
            alert(err.message);
        });
    }

    function handleEdit(item) {
        setEditItem(item); 
        setUpdatedItem({
            itemName: item.itemName,
            alrtQty: item.alrtQty,
            measurement: item.measurement
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUpdatedItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function saveChanges() {
        axios.put(`http://localhost:8070/items/update/${editItem._id}`, updatedItem)
            .then(() => {
                alert("Item updated successfully");
                // Refresh the items list
                setItems(items.map(item => item._id === editItem._id ? { ...item, ...updatedItem } : item));
                // Close the modal
                setEditItem(null);
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    return (
        <div className="stock-dashboard-container">
            <div className="form-container">
                <h3 className="mngItems">Manage Items</h3>
                <div className="mb-3">
                    <label htmlFor="Item Name" className="form-label">Search Item</label>
                    <input
                        type="text"
                        className="search-control"
                        id="itemName"
                        placeholder="Enter Item Name"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <table className="alltable">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Alert Quantity</th>
                            <th scope="col">Measurement</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.filter((val) => {
                            if (search === "") {
                                return val;
                            } else if (val.itemName.toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                        }).map((item) => (
                            <tr key={item._id}>
                                <td>{item.itemName}</td>
                                <td>{item.alrtQty}</td>
                                <td>{item.measurement}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteItem(item._id)}>Delete</button>
                                    <button className="btn btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                
                {editItem && (
                    <div className="edit-modal">
                        <div className="modal-content">
                            <h4>Edit Item</h4>
                            <label>Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                value={updatedItem.itemName}
                                onChange={handleChange}
                                className="form-control"
                            />
                            <label>Alert Quantity</label>
                            <input
                                type="number"
                                name="alrtQty"
                                value={updatedItem.alrtQty}
                                onChange={handleChange}
                                className="form-control"
                            />
                            <label>Measurement</label>
                            <input
                                type="text"
                                name="measurement"
                                value={updatedItem.measurement}
                                onChange={handleChange}
                                className="form-control"
                            />
                            <button className="btn btn-success mt-3" onClick={saveChanges}>Save Changes</button>
                            <button className="btn btn-secondary mt-3" onClick={() => setEditItem(null)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
