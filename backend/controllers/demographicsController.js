const fs = require('fs').promises;
const path = require('path');

const getDemographicData = async (req, res) => {
    try {
        console.log('Fetching demographic data...');
        // Read all demographic data files
        const [populationRace, healthInsurance, medianIncome, povertyPopulation] = await Promise.all([
            fs.readFile(path.join(__dirname, '../data/population_race.json'), 'utf8'),
            fs.readFile(path.join(__dirname, '../data/health_insurance.json'), 'utf8'),
            fs.readFile(path.join(__dirname, '../data/median_income.json'), 'utf8'),
            fs.readFile(path.join(__dirname, '../data/poverty_population.json'), 'utf8')
        ]);

        // Parse all data
        console.log('Parsing data files...');
        const raceData = JSON.parse(populationRace);
        const healthData = JSON.parse(healthInsurance);
        const incomeData = JSON.parse(medianIncome);
        const povertyData = JSON.parse(povertyPopulation);

        console.log('Sample race data:', raceData[0]);
        console.log('Sample health data:', healthData[0]);
        console.log('Sample income data:', incomeData[0]);
        console.log('Sample poverty data:', povertyData[0]);

        // Transform data into the format expected by the frontend
        const transformedData = {};

        // Process each area's data
        console.log('Transforming data...');
        raceData.forEach(area => {
            const healthInfo = healthData.find(h => h.hra_name === area.hra_name);
            const incomeInfo = incomeData.find(i => i.hra_name === area.hra_name);
            const povertyInfo = povertyData.find(p => p.hra_name === area.hra_name);

            if (!healthInfo || !incomeInfo || !povertyInfo) {
                console.log('Missing data for area:', area.hra_name);
                console.log('Health info found:', !!healthInfo);
                console.log('Income info found:', !!incomeInfo);
                console.log('Poverty info found:', !!povertyInfo);
            }

            transformedData[area.hra_name] = {
                race: {
                    white: parseFloat(area.white_pop_pct.toFixed(1)),
                    asian: parseFloat(area.asian_pop_pct.toFixed(1)),
                    black: parseFloat(area.black_african_american_pop_pct.toFixed(1)),
                    hispanic: parseFloat(area.hispanic_latino_pop_pct.toFixed(1)),
                    multiracial: parseFloat(area.two_or_more_races_pop_pct.toFixed(1))
                },
                health: {
                    uninsured: parseFloat(
                        healthInfo?.percent_uninsured.toFixed(1) || 0
                    )
                },
                income: {
                    median: parseFloat(
                        incomeInfo?.median_income || 0
                    )
                },
                poverty: {
                    rate: parseFloat(
                        povertyInfo?.percent_below_poverty.toFixed(1) || 0
                    )
                }
            };
        });

        console.log('Number of areas with data:', Object.keys(transformedData).length);
        console.log('Sample transformed data:', Object.entries(transformedData)[0]);

        res.json(transformedData);
    } catch (error) {
        console.error('Error reading demographic data:', error);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Failed to fetch demographic data' });
    }
};

module.exports = {
    getDemographicData
}; 