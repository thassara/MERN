import React, { useState, useEffect } from 'react';  
import { useNavigate, useParams } from 'react-router-dom';  
import axios from 'axios';  
// import '../../style/Comman css/UpdateCustomer.css';  

function UpdateCustomer() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email:'',
    address:'',
    age: '',
    gender: '',
    username: ''
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Getting the customer ID from the URL parameters

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/api/customers/${id}`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/api/customers/${id}`, customerData);
      alert('Customer updated successfully!');
      navigate('/AdminChoose/DMChoose/CustomerDashBoardPage/Cusdetails'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer');
    }
  };

  return (
    <div>
      <h1>Update Customer</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={customerData.name} 
          onChange={handleChange} 
          required 
        />
            <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          value={customerData.email} 
          onChange={handleChange} 
          required 
        />
            <input 
          type="text" 
          name="address" 
          placeholder="Address" 
          value={customerData.address} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="number" 
          name="age" 
          placeholder="Age" 
          value={customerData.age} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="gender" 
          placeholder="Gender" 
          value={customerData.gender} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={customerData.username} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
