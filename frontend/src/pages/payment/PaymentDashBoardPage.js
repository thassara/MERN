import React, { useState, useEffect } from 'react';
import Sidebar from '../../compoments/Payment/Sidebar';
import PaymentTable from '../../compoments/Payment/PaymentTable';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../style/payment/PaymentDashBoardPage.css';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

// Register the required elements for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const PaymentDashBoardPage = () => {
  const [payments, setPayments] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:8070/payments/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const res = await axios.get('http://localhost:8070/expenses/all');
        const expensesData = res.data;
        const total = expensesData.reduce((sum, expense) => sum + Number(expense.price), 0);
        setTotalExpenses(total);
      } catch (error) {
        console.error('Error fetching expenses', error);
      }
    };

    fetchPayments();
    fetchExpenses();
  }, []);

  const onVerify = async (id) => {
    try {
      await axios.post(`http://localhost:8070/payments/verify/${id}`);
      setSuccessMessage('Email sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      console.log(`Verify payment with ID: ${id}`);
    } catch (error) {
      console.error(`Error verifying payment with ID: ${id}`, error);
      setSuccessMessage('Failed to send email.');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const onReject = (id) => {
    console.log(`Reject payment with ID: ${id}`);
  };

  const downloadPDF = (payment) => {
    const doc = new jsPDF();
    doc.text('Payment Details', 20, 10);

    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['Payment ID', payment.id],
        ['Customer Email', payment.email],
        ['Amount', payment.amount],
        ['Date', new Date(payment.createdAt).toLocaleDateString()],
        ['Payment Method', payment.method],
      ],
    });

    doc.save(`${payment.email}_payment_details.pdf`);
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ['Total Income', 'Total Expenses', 'Available Balance'],
    datasets: [
      {
        data: [2356300, totalExpenses, 2356300 - totalExpenses],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: ['Total Income', 'Total Expenses', 'Available Balance'],
    datasets: [
      {
        label: 'Amount (Rs)',
        data: [2356300, totalExpenses, 2356300 - totalExpenses],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="unique-dashboard-container">
      <Sidebar />
      <div className="unique-main-content">
        <h1 className="unique-dashboard-title">Payment Dashboard</h1>

        {/* Summary section */}
        <div className="unique-balance-summary">
          <div className="unique-summary-card">
            <h3>Total Income</h3>
            <p>Rs. 23,56300</p>
          </div>
          <div className="unique-summary-card">
            <h3>Total Expenses</h3>
            <p>Rs. {totalExpenses}</p>
          </div>
          <div className="unique-summary-card">
            <h3>Available Balance</h3>
            <p>Rs. {2356300 - totalExpenses}</p>
          </div>
        </div>

        {/* Success message display */}
        {successMessage && <p className="unique-success-message">{successMessage}</p>}

        {/* Pie Chart and Bar Chart Section */}
        <div className="unique-chart-container">
          <div className="unique-pie-chart-container">
            <Pie data={pieChartData} className="unique-pie-chart" />
          </div>
          <div className="unique-bar-chart-container">
            <Bar data={barChartData} options={barChartOptions} height={200} />
          </div>
        </div>

        {/* Payment table showing filtered data */}
        {payments.length > 0 ? (
          <PaymentTable
            payments={payments}
            onVerify={onVerify}
            onReject={onReject}
            onDownloadPDF={downloadPDF}
          />
        ) : (
          <p>No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentDashBoardPage;
