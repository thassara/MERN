import React, { useState } from 'react';
import axios from 'axios';
import './../../style/stock/addItemsFormV1.css';

export default function AddItemsFormV1() {

  const [itemName, setitemName] = useState("");
  const [alrtQty, setalrtQty] = useState("");
  const [measurement, setMeasurement] = useState("");

  // Function to check if the item already exists
  const checkItemExists = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/items/check?itemName=${itemName}`);
      return response.data.exists; 
    } catch (error) {
      alert("Error checking item existence");
      return false; 
    }
  };

  
  const sendDetails = async (e) => {
    e.preventDefault();

    // Validate if quantity is a positive number
    if (isNaN(alrtQty) || alrtQty <= 0) {
      alert("Please enter a valid, positive number for Alert Quantity.");
      return;
    }

    // Check if the item already exists
    const itemExists = await checkItemExists();

    if (itemExists) {
      alert("Item already exists! Please enter a different item name.");
      return;  
    }

    const newItems = {
      itemName: itemName,
      alrtQty: alrtQty,
      measurement: measurement
    };

    axios.post("http://localhost:8070/items/add", newItems).then(() => {
      alert("Item Added");

      setitemName("");
      setalrtQty("");
      setMeasurement("");

    }).catch((err) => {
      alert("Error adding the item: " + err);
    });
  };

  return (
    <div className="dashboard-container">
      <div className="flex-container">
        <div className="fcontainer">
          <h4 className='anItem'>Add New Item</h4>

          <form onSubmit={sendDetails}>
            <div className="mb-3">
              <label htmlFor="itemName" className="form-label">Item Name</label>
              <input
                type="text"
                className="f-control"
                id="itemName"
                placeholder="Enter Item Name"
                value={itemName} 
                onChange={(e) => setitemName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="alertQty" className="form-label">Alert Quantity</label>
              <input
                type="number"
                className="f-control"
                id="alertQty"
                placeholder="Enter Alert Quantity"
                value={alrtQty} 
                onChange={(e) => setalrtQty(e.target.value)}
                min="0"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="measurement" className="form-label">Measurement</label>
              <input
                type="text"
                className="f-control"
                id="measurement"
                placeholder="Enter item measurement"
                value={measurement} 
                onChange={(e) => setMeasurement(e.target.value)}
              />
            </div>

            <button type="submit" className="addItemsbtn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
