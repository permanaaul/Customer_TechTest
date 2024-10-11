const Customer = require('../models/Customer');

// Controller untuk mendapatkan semua data customer
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getCustomers };
