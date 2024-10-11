import React, { useEffect, useState } from 'react';
import CustomerChart from '../components/CustomerChart';
import axios from 'axios';
import { ChevronUpIcon, ChevronDownIcon, UserIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

const Summary = () => {
  const [customers, setCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'CustomerID', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data', error);
      }
    };

    fetchData();
  }, []);

  const sortedCustomers = [...customers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 inline ml-2" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 inline ml-2" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-black-700 mb-10">
        Summary Data Customers
      </h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <CustomerChart customers={customers} />
        </div>

        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full table-auto bg-white">
            <thead>
              <tr className="bg-black text-white text-left text-sm leading-normal">
                <th className="py-3 px-6 text-center cursor-pointer" onClick={() => handleSort('CustomerID')}>
                  ID {renderSortIcon('CustomerID')}
                </th>
                <th className="py-3 px-6 text-center cursor-pointer" onClick={() => handleSort('Gender')}>
                  <UserIcon className="w-4 h-4 inline mr-2" /> Gender {renderSortIcon('Gender')}
                </th>
                <th className="py-3 px-6 text-center cursor-pointer" onClick={() => handleSort('Age')}>
                  Age {renderSortIcon('Age')}
                </th>
                <th className="py-3 px-6 text-center cursor-pointer" onClick={() => handleSort('Annual Income ($)')}>
                  <CurrencyDollarIcon className="w-4 h-4 inline mr-2" /> Annual Income ($) {renderSortIcon('Annual Income ($)')}
                </th>
                <th className="py-3 px-6 text-center cursor-pointer" onClick={() => handleSort('Spending Score (1-100)')}>
                  Spending Score {renderSortIcon('Spending Score (1-100)')}
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {sortedCustomers.map((customer) => (
                <tr key={customer._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out">
                  <td className="py-3 px-6 text-center align-middle">{customer.CustomerID}</td>
                  <td className="py-3 px-6 text-center align-middle">{customer.Gender}</td>
                  <td className="py-3 px-6 text-center align-middle">{customer.Age}</td>
                  <td className="py-3 px-6 text-center align-middle">{customer['Annual Income ($)']}</td>
                  <td className="py-3 px-6 text-center align-middle">{customer['Spending Score (1-100)']}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Summary;
