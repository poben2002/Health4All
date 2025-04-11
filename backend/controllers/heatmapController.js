const data = require('../data/sampleHeatmap.json');

const getHeatmapData = (req, res) => {
  res.json(data);
};

module.exports = { getHeatmapData };
