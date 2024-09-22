import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    // Retrieve orderData from local storage
    const initialOrderData = JSON.parse(localStorage.getItem('orderData')) || {};
    // Initialize state variables
    const [customerName, setCustomerName] = useState(initialOrderData.customerName || '');
    const [customerEmail, setCustomerEmail] = useState(initialOrderData.customerEmail || '');
    const [quantity, setQuantity] = useState(initialOrderData.quantity || '');
    const [packageType, setPackageType] = useState(initialOrderData.packageType || '');
    const [customerNote, setCustomerNote] = useState(initialOrderData.customerNote || '');

    // Function to handle form submission
    const sendData = (e) => {
        e.preventDefault();

        // Create order object to send to the backend
        const order = {
            customerName,
            customerEmail,
            quantity,
            packageType,
            customerNote,
        };

        // Log the order data to verify its structure before sending
        console.log('Order Data:', order);

        // Make POST request to add the order
        axios.post("http://localhost:8080/orders/add", order)
            .then((response) => {
                alert("Order added successfully!");
                console.log(response.data);
                
                // Optionally, you can reset the form fields after successful submission
                setCustomerName('');
                setCustomerEmail('');
                setQuantity('');
                setPackageType('');
                setCustomerNote('');
                
                // Clear the orderData from localStorage if necessary
                localStorage.removeItem('orderData');
            })
            .catch((err) => {
                alert("Order not added: " + err.message);
                console.error(err);
            });
    };

    return (
        <div>
            <style>
                {`
                .Or_addcard {
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                    transition: 0.3s;
                    width: 50%; 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    padding: 2rem; 
                    background-color: #fff; 
                    border-radius: 8px;
                    margin-bottom: 4.3rem;
                    margin-top: 4.3rem;
                    text-align: center;
                }

                .or_addbuttonx {
                    padding: 0.7rem 1.5rem;
                    border: none;
                    background-color: #7289d5;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .or_addbuttonx:hover {
                    background-color: #385cd2;
                }

                .or_row {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    margin-bottom: 1rem;
                    width: 100%;
                    max-width: 600px;
                }

                .or_title {
                    flex: 1;
                    font-weight: bold;
                    text-align: right;
                    margin-right: 1rem;
                }

                .or_colon {
                    margin-right: 1rem;
                }

                .or_value {
                    flex: 2;
                    text-align: left;
                }

                .or_all {
                    margin-left: 200px;
                }
                `}
            </style>
            <div className="Or_addcard">
                <h2>Order Details</h2>
                <div className='or_all'>
                    <div className="or_row">
                        <div className="or_title">Your Name</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <input 
                                type="text" 
                                value={customerName} 
                                onChange={(e) => setCustomerName(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Customer Email</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <input 
                                type="email" 
                                value={customerEmail} 
                                onChange={(e) => setCustomerEmail(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Quantity</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)} 
                                required
                                min="1"
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Package Type</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <input 
                                type="text" 
                                value={packageType} 
                                onChange={(e) => setPackageType(e.target.value)} 
                                required
                            />
                        </div>
                    </div>
                    <div className="or_row">
                        <div className="or_title">Customer Note</div>
                        <div className="or_colon">:</div>
                        <div className="or_value">
                            <textarea 
                                value={customerNote} 
                                onChange={(e) => setCustomerNote(e.target.value)} 
                                rows="3"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button className="or_addbuttonx" onClick={sendData}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;
