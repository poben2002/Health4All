const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const heatmapRoutes = require('./routes/heatmapRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: [
    'https://health4all-frontend.onrender.com',
    'http://localhost:5173', // For local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Add a health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Health4All API is running' });
});

app.use('/api/heatmap', heatmapRoutes);

const cityDetailsRoutes = require('./routes/cityDetailsRoutes');
app.use('/api/city-details', cityDetailsRoutes);

const citiesRoutes = require('./routes/citiesRoutes');
app.use('/api/cities', citiesRoutes);

const demographicsRoutes = require('./routes/demographicsRoutes');
app.use('/api/demographics', demographicsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
