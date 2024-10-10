import React, { useState } from 'react';
import axios from 'axios';
import './../../style/stock/addItemsFormV1.css'; // Assuming this is where your styles are

export default function AddItemsFormV1() {

  const [itemName, setitemName] = useState("");
  const [alrtQty, setalrtQty] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [errors, setErrors] = useState({
    itemName: "",
    alrtQty: "",
    measurement: ""
  });

  // Regex pattern to allow only letters and spaces
  const validPattern = /^[a-zA-Z\s]+$/;

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

  // Validate item name: only letters and spaces
  const validateItemName = (value) => {
    if (!validPattern.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        itemName: "Item Name should contain only letters and spaces."
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        itemName: ""
      }));
    }
  };

  // Validate alert quantity: must be a positive number
  const validateAlertQty = (value) => {
    if (isNaN(value) || value <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        alrtQty: "Alert Quantity should be a positive number."
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        alrtQty: ""
      }));
    }
  };

  // Validate measurement: only letters and spaces
  const validateMeasurement = (value) => {
    if (!validPattern.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        measurement: "Measurement should contain only letters and spaces."
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        measurement: ""
      }));
    }
  };

  const sendDetails = async (e) => {
    e.preventDefault();

    // If there are validation errors, do not submit the form
    if (errors.itemName || errors.alrtQty || errors.measurement) {
      alert("Please fix the validation errors before submitting.");
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

      // Reset form fields
      setitemName("");
      setalrtQty("");
      setMeasurement("");

    }).catch((err) => {
      alert("Error adding the item: " + err.message);
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
                onChange={(e) => {
                  setitemName(e.target.value);
                  validateItemName(e.target.value);
                }}
              />
              {errors.itemName && <div className="sterror-message">{errors.itemName}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="alertQty" className="form-label">Alert Quantity</label>
              <input
                type="number"
                className="f-control"
                id="alertQty"
                placeholder="Enter Alert Quantity"
                value={alrtQty}
                onChange={(e) => {
                  setalrtQty(e.target.value);
                  validateAlertQty(e.target.value);
                }}
                min="0"
              />
              {errors.alrtQty && <div className="sterror-message">{errors.alrtQty}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="measurement" className="form-label">Measurement</label>
              <input
                type="text"
                className="f-control"
                id="measurement"
                placeholder="Enter item measurement"
                value={measurement}
                onChange={(e) => {
                  setMeasurement(e.target.value);
                  validateMeasurement(e.target.value);
                }}
              />
              {errors.measurement && <div className="sterror-message">{errors.measurement}</div>}
            </div>

            <button type="submit" className="addItemsbtn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
