// src/components/PieChart.js

import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ totalIncome, totalExpenses }) => {
  // Calculate available balance
  const availableBalance = totalIncome - totalExpenses;

  // Data for the pie chart
  const data = {
    labels: ['Total Income', 'Total Expenses', 'Available Balance'],
    datasets: [
      {
        data: [totalIncome, totalExpenses, availableBalance],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h2>Financial Overview</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
