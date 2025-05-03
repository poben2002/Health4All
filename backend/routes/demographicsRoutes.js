const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Helper function to read JSON file
async function readJsonFile(filename) {
    try {
        const filePath = path.join(__dirname, '..', 'data', filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        throw error;
    }
}

// Route for population race data
router.get('/population-race', async (req, res) => {
    try {
        const data = await readJsonFile('population_race.json');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch population race data' });
    }
});

// Route for health insurance data
router.get('/health-insurance', async (req, res) => {
    try {
        const data = await readJsonFile('health_insurance.json');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch health insurance data' });
    }
});

// Route for median income data
router.get('/median-income', async (req, res) => {
    try {
        const data = await readJsonFile('median_income.json');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch median income data' });
    }
});

// Color function for circle markers based on comparison
function getMarkerColor(comparison) {
  return comparison === "higher"
    ? "#ff0000"  // Red for higher
    : comparison === "lower"
      ? "#00ff00"  // Green for lower
      : "#ffff00";  // Yellow for no difference
}

module.exports = router; 