import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OrderUpdateForm = () => {
  const navigate = useNavigate();
    const { id } = useParams(); 
    const [orderData, setOrderData] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [qty, setQty] = useState(''); 
    const [packageType, setPackageType] = useState('');
    const [Cus_note, setCus_note] = useState(''); 

    const validateForm = () => {
      if (!customerName) {
        window.alert('Please enter your name.');
        return false;
      }
      if (!customerEmail || !/\S+@\S+\.\S+/.test(customerEmail)) {
        window.alert('Please enter a valid email.');
        return false;
      }
      if (qty < 1) {
        window.alert('Quantity must be at least 1.');
        return false;
      }
      if (!packageType) {
        window.alert('Please select a package type.');
        return false;
      }
      if (!Cus_note) {
        window.alert('Please add a customer note.');
        return false;
      }
      return true;
    };
  
    const handleNext = () => {
      if (!validateForm()) {
        return; 
      }}

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/orders/read/${id}`);
                const data = response.data;
                setOrderData(data);
                setCustomerName(data.Cus_name);
                setCustomerEmail(data.Cus_email);
                setQty(data.qty); 
                setPackageType(data.package_type);
                setCus_note(data.Cus_note); 
            } catch (error) {
                console.error("Error fetching order data", error);
            }
        };

        fetchOrderData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/orders/update/${id}`, {
                Cus_name: customerName,
                Cus_email: customerEmail,
                qty: qty, 
                package_type: packageType,
                Cus_note: Cus_note, 
            });
            console.log("Update response:", response.data); 
            alert("Order updated successfully!"); 
            navigate('/OrderDashBoardPage'); 
        } catch (error) {
            console.error("Error updating order", error);
            alert("Failed to update the order. Please try again.");
        }
    };
    
    if (!orderData) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
          <style>
            {`
            body{background-color:#e6eee4;}
            .Or_addcard {
              box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
              transition: 0.3s;
              width: 50%; 
              max-width: 1200px; 
              margin: 0 auto; 
              padding: 2rem; 
              background-color: #fff; 
              border-radius: 8px;
              text-align: center;
              margin-bottom:2rem;
              margin-top:2rem;
            }
    
            .Or_addhead {
              text-align: center;
            }
    
            .or_addform {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top:50px;
            }
    
            .or_form-group {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 1rem;
              width: 100%;
              max-width: 600px;
            }
    
            .or_addleable {
              flex: 1;
              margin-right: 1rem;
              text-align: right;
              font-weight: bold;
            }
    
            .or_form-group input, select, textarea {
              flex: 2;
              padding: 0.5rem;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
    
            .or_addtextarea {
              height: 100px;
              resize: vertical;
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
            `}
          </style>
          <div className="Or_addcard">
            <h2 className="Or_addhead">Update Your Order</h2>
            <form className='or_addform' onSubmit={handleUpdate}>
              <div className="or_form-group">
                <label className='or_addleable' htmlFor="customerName">Customer Name:</label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>
              <div className="or_form-group">
                <label className='or_addleable' htmlFor="customerEmail">Your Email:</label>
                <input
                  type="email"
                  id="customerEmail"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>
              <div className="or_form-group">
                <label className='or_addleable' htmlFor="qty">Quantity:</label> 
                <input
                  type="text"
                  id="qty"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                />
              </div>
            
              <div className="or_form-group">
                <label className='or_addleable' htmlFor="packageType">Package Type:</label>
                <select
                  id="packageType"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  required
                >
                  <option value="">Select a package</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="or_form-group">
                <label className='or_addleable' htmlFor="Cus_note">Customer Note:</label>
                <textarea className='or_addtextarea'
                  id="Cus_note"
                  value={Cus_note}
                  onChange={(e) => setCus_note(e.target.value)}
                />
              </div>
              <input type="submit" className="or_addbuttonx" value="Update Order"/>
            </form>
          </div>
        </div>
      );
};

export default OrderUpdateForm;
