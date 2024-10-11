const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  CustomerID: Number,
  Gender: String,
  Age: Number,
  'Annual Income ($)': Number,
  'Spending Score (1-100)': Number,
  Profession: String,
  'Work Experience': Number,
  'Family Size': Number
});

const Customer = mongoose.model('Customer', customerSchema, 'customer_data');
module.exports = Customer;
