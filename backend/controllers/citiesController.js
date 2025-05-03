const cancerData = require('../data/cancer_data.json');

const getCities = (req, res) => {
  const cityNames = cancerData.map(entry => {
    const fullName = entry.cat1_group;
    if (!fullName) return null;

    // Only take the part before "-"
    const baseName = fullName.split('-')[0].trim();
    return baseName;
  }).filter(Boolean); // Remove nulls

  // Remove duplicates
  const uniqueCities = [...new Set(cityNames)];

  res.json({ cities: uniqueCities.sort() });
};

module.exports = { getCities };
