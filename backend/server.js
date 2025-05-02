// backend/server.js

const express = require('express');
const app = express();
const heatmapRoutes = require('./routes/heatmapRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api', heatmapRoutes);

// Optional: Root route for testing
app.get('/', (req, res) => {
  res.send('Health4All backend is running.');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
