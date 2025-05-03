const fs = require('fs');
const path = require('path');

// Read the original cancer_data.json
const cancerDataPath = path.join(__dirname, '../data/cancer_data.json');

try {
    // Read the original data file
    const fileContent = fs.readFileSync(cancerDataPath, 'utf8');
    // Remove any comments and parse the JSON
    const cleanedContent = fileContent.replace(/\s*\/\/.*$/gm, '');
    const rawData = JSON.parse(cleanedContent);
    
    // Transform the data to match breastCancerRateData format
    const transformedData = {
        heatmap: rawData.map(item => ({
            lat: item['latitude_(generated)'],
            lng: item['longitude_(generated)'],
            value: item['max._result'],
            rate: item['max._result'],
            name: item['cat1_group'],
            comparison: item['comparison_with_kc'],
            cases: item['numerator']
        }))
    };

    // Write the transformed data directly to cancer_data.json
    fs.writeFileSync(cancerDataPath, JSON.stringify(transformedData, null, 2));
    console.log('Data transformed and saved successfully!');
    
} catch (error) {
    console.error('Error transforming data:', error);
} 