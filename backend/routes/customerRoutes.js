const express = require('express');
const { getCustomers } = require('../controllers/customerController');
const router = express.Router();

// Route untuk mendapatkan semua customer
router.get('/customers', getCustomers);

module.exports = router;
