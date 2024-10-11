const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Customer = require('./models/Customer'); // Mengimpor model

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/customers', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Route untuk mendapatkan semua data dari MongoDB
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find(); // Mengambil semua data dari koleksi customer_data
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
