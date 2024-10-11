import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Cusdetails = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/customers/all');
        setCustomers(response.data);
      } catch (err) {
        setError('Error fetching customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8070/api/customers/${customerId}`);
      setCustomers(customers.filter(customer => customer._id !== customerId));
      alert('Customer deleted successfully');
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete customer');
    }
  };

  const handleUpdate = (customerId) => {
    window.location.href = `/update-customer/${customerId}`;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Customer Name", "Username", "Email", "Address", "Age"];
    const tableRows = [];

    customers.forEach(customer => {
      const customerData = [
        customer.name,
        customer.username,
        customer.email,
        customer.address,
        customer.age,
      ];
      tableRows.push(customerData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Customer Report", 14, 15);
    doc.save("customer_report.pdf");
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Customer Details</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={generatePDF}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498DB',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Generate Report
        </button>
        <input
          type="text"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4' }}>Customer Name</th>
            <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4' }}>Username</th>
            <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4' }}>Email</th>
            <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4' }}>Address</th>
            <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4' }}>Age</th>
            <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#f4f4f4' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer._id}>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.name || 'N/A'}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.username}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.email}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.address}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>{customer.age}</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                <button
                  onClick={() => handleUpdate(customer._id)}
                  style={{
                    padding: '5px 10px',
                    marginRight: '10px',
                    backgroundColor: '#2ECC71',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#E74C3C',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cusdetails;
