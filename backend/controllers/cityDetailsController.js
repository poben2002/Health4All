const cancerData = require('../data/cancer_data.json');
const povertyData = require('../data/poverty_population.json');
const raceData = require('../data/population_race.json');
const incomeData = require('../data/median_income.json');
const insuranceData = require('../data/health_insurance.json');

const getCityDetails = (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required.' });
  }

  const normalizedCity = city.trim().toLowerCase();

  const findAllEntries = (dataset, field) =>
    dataset.filter((entry) => {
      const name = entry.cat1_group || entry.hra_name || entry.hra;
      if (!name) return false;
      return name.trim().toLowerCase().includes(normalizedCity);
    });

  const avg = (values) => {
    if (values.length === 0) return null;
    const sum = values.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    return sum / values.length;
  };

  // Find matching entries
  const cancerMatches = findAllEntries(cancerData);
  const povertyMatches = findAllEntries(povertyData);
  const raceMatches = findAllEntries(raceData);
  const incomeMatches = findAllEntries(incomeData);
  const insuranceMatches = findAllEntries(insuranceData);

  if (cancerMatches.length === 0) {
    return res.status(404).json({ error: `City '${city}' not found in datasets.` });
  }

  const response = {
    city: city,
    cancer_rate: avg(cancerMatches.map(e => e["max._result"])),
    lower_bound: avg(cancerMatches.map(e => e["max._lower_bound"])),
    upper_bound: avg(cancerMatches.map(e => e["max._upper_bound"])),
    poverty_percent: avg(povertyMatches.map(e => e.percent_below_poverty)),
    median_income: avg(incomeMatches.map(e => e.median_income)),
    insured_percent: insuranceMatches.length > 0 ? 
      avg(insuranceMatches.map(e => 100 - (e.percent_uninsured || 0))) : null,
    racial_breakdown: raceMatches.length > 0 ? {
      white: avg(raceMatches.map(e => e.white_pop_pct)),
      black: avg(raceMatches.map(e => e.black_african_american_pop_pct)),
      asian: avg(raceMatches.map(e => e.asian_pop_pct)),
      native_hawaiian: avg(raceMatches.map(e => e.native_hawaiian_other_pacific_islander_pop_pct)),
      american_indian_alaska_native: avg(raceMatches.map(e => e.american_indian_alaska_native_pop_pct)),
      two_or_more_races: avg(raceMatches.map(e => e.two_or_more_races_pop_pct)),
      other: avg(raceMatches.map(e => e.other_race_pop_pct)),
      hispanic_latino: avg(raceMatches.map(e => e.hispanic_latino_pop_pct))
    } : null,
  };

  res.json(response);
};

module.exports = { getCityDetails };

