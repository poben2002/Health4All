const fs = require('fs').promises;
const path = require('path');

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

const demographicsController = {
    // Get population race data
    getPopulationRace: async (req, res) => {
        try {
            const data = await readJsonFile('population_race.json');
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch population race data' });
        }
    },

    // Get health insurance data
    getHealthInsurance: async (req, res) => {
        try {
            const data = await readJsonFile('health_insurance.json');
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch health insurance data' });
        }
    },

    // Get median income data
    getMedianIncome: async (req, res) => {
        try {
            const data = await readJsonFile('median_income.json');
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch median income data' });
        }
    }
};

module.exports = demographicsController; 