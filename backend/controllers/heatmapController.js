const path = require('path');
const fs = require('fs');

const getHeatmapData = (req, res) => {
  const filePath = path.join(__dirname, '../data/king_county_heatmap.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to load data' });
    }
    res.json(JSON.parse(data));
  });
};

module.exports = { getHeatmapData };
