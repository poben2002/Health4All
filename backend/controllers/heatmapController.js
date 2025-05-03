const data = require('../data/breastCancerRateData.json');

const getHeatmapData = (req, res) => {
  res.json(data);
};

module.exports = { getHeatmapData };
