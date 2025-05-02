const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const heatmapRoutes = require('./routes/heatmapRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/heatmap', heatmapRoutes);

const cityDetailsRoutes = require('./routes/cityDetailsRoutes');
app.use('/api/city-details', cityDetailsRoutes);

const citiesRoutes = require('./routes/citiesRoutes');
app.use('/api/cities', citiesRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
