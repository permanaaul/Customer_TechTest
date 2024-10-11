import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, BarElement, LinearScale, Tooltip } from 'chart.js';
import { UserIcon } from '@heroicons/react/24/solid';

// Daftarkan modul yang digunakan oleh Chart.js
Chart.register(CategoryScale, BarElement, LinearScale, Tooltip);

const CustomerChart = ({ customers }) => {
  const genderData = {
    Male: customers.filter((c) => c.Gender === 'Male').length,
    Female: customers.filter((c) => c.Gender === 'Female').length,
  };

  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Customer Gender Distribution',
        data: [genderData.Male, genderData.Female],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: '#f9fafb',
        titleColor: '#111827',
        bodyColor: '#111827',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700 flex items-center">
          <UserIcon className="w-6 h-6 text-blue-600 mr-2" />
          Gender Distribution
        </h2>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};

export default CustomerChart;
