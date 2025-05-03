// backend/controllers/heatmapController.js
const fs = require('fs');
const path = require('path');
const breastCancerData = require('../data/breastCancerRateData.json');

// Helper: filter function based on query params
function applyFilters(data, query) {
  if (!query || Object.keys(query).length === 0) {
    return data;
  }
  
  return data.filter(entry => {
    if (query.zipCode && entry.zip_code !== query.zipCode) return false;
    if (query.minOverallCancerRate && entry.overall_cancer_rate < Number(query.minOverallCancerRate)) return false;
    if (query.maxPovertyRate && entry.poverty_rate > Number(query.maxPovertyRate)) return false;
    if (query.maxUninsuredRate && entry.uninsured_rate > Number(query.maxUninsuredRate)) return false;
    if (query.maxNoHighschoolRate && entry.no_highschool_rate > Number(query.maxNoHighschoolRate)) return false;
    if (query.maxMinorityPercent && entry.minority_percent > Number(query.maxMinorityPercent)) return false;
    return true;
  });
}

// Controller function
const getHeatmapData = (req, res) => {
  const filteredData = applyFilters(breastCancerData.heatmap, req.query);
  res.json({ heatmap: filteredData });
};

module.exports = { getHeatmapData };
