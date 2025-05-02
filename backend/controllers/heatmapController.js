// backend/controllers/heatmapController.js
const fs = require('fs');
const path = require('path');

// Load fullData.json once at startup
const fullDataPath = path.join(__dirname, '../data/cancer_data.json');
let heatmapData = [];

try {
  const fileContent = fs.readFileSync(fullDataPath, 'utf8');
  heatmapData = JSON.parse(fileContent);
} catch (error) {
  console.error('Error reading fullData.json:', error);
}

// Helper: filter function based on query params
function applyFilters(data, query) {
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
exports.getHeatmapData = (req, res) => {
  const filteredData = applyFilters(heatmapData, req.query);
  res.json({ heatmap: filteredData });
};
