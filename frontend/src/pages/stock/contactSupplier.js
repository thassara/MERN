import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../style/stock/ContactSuppliers.css";

function ContactSuppliers() {
    // State for the form inputs
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [measurement, setMeasurement] = useState("");
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [stockItems, setStockItems] = useState([]);

    // Fetch stock item names for the dropdown
    useEffect(() => {
        axios.get("http://localhost:8070/items/all")
            .then((res) => setStockItems(res.data))
            .catch((err) => alert("Error fetching stock items: " + err.message));
    }, []);

    // Handle form submission to add restocked item
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRestockedItem = {
            itemName,
            quantity,
            measurement,
            purchaseDate,
        };

        //Add the restocked item to the restock collection
    axios.post("http://localhost:8070/restock/add", newRestockedItem)
        .then(() => {
            //Update the available quantity for the selected item
            axios.put(`http://localhost:8070/items/updateQuantity/${itemName}`, { quantity })
                .then(() => {
                    alert("Item restocked and inventory updated successfully!");
                })
                .catch((err) => {
                    alert("Error updating inventory: " + err.message);
                });
            
           
            setItemName("");
            setQuantity("");
            setMeasurement("");
            setPurchaseDate(new Date());
        })
        .catch((err) => {
            alert("Error restocking item: " + err.message);
        });
};

    return (
        <div className="contact-suppliers-container">
            <h1>Contact Suppliers</h1>

            <div className="CSflex-container">
                
                <div className="restocked-items-container">
                    <h2>Items Restocked</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="CSform-group">
                            <label htmlFor="itemName">Item Name</label>
                            <select
                                className="CSform-control"
                                id="CSitemName"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Item</option>
                                {stockItems.map((item) => (
                                    <option key={item._id} value={item.itemName}>
                                        {item.itemName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="CSform-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                type="number"
                                className="CSform-control"
                                id="CSquantity"
                                placeholder="Enter Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="CSform-group">
                            <label htmlFor="measurement">Measurement</label>
                            <input
                                type="text"
                                className="CSform-control"
                                id="CSmeasurement"
                                placeholder="Enter Measurement"
                                value={measurement}
                                onChange={(e) => setMeasurement(e.target.value)}
                                required
                            />
                        </div>
                        <div className="CSform-group">
                            <label htmlFor="purchaseDate">Purchase Date</label>
                            <input 
                            type="date" 
                            className="CSform-control" 
                            id="CSpurchaseDate" 
                            dateFormat="MM/dd/yyyy"
                            value={purchaseDate} 
                            onChange={(e) => setPurchaseDate(e.target.value)} 
                            required 
                            />
                        </div>
                        <button type="submit" className="CSbtn_submit">Submit</button>
                    </form>
                </div>

                
                <div className="supplier-details-container">
                    <h2>Supplier Details</h2>
                    <div className="CStable-responsive">
                        <table className="CStable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>A.W.D Kumara</td>
                                    <td>Ink</td>
                                    <td>
                                        <button className="CSbtn_email">Email</button>
                                        <button className="CSbtn_call">Call</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>K.M Sarath</td>
                                    <td>Papers</td>
                                    <td>
                                        <button className="CSbtn_email">Email</button>
                                        <button className="CSbtn_call">Call</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>G. Muthukuda</td>
                                    <td>Glass</td>
                                    <td>
                                        <button className="CSbtn_email">Email</button>
                                        <button className="CSbtn_call">Call</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactSuppliers;
