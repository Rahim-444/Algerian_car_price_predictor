const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

// Read JSON data from file
const jsonData = fs.readFileSync('scraped_data.json', 'utf8');
const data = JSON.parse(jsonData);

// Extract column headers from the first object
const headers = Object.keys(data[0]);

// Create CSV writer
const csvWriter = createObjectCsvWriter({
    path: 'scraped_data.csv',
    header: headers.map(header => ({ id: header, title: header }))
});

// Write data to CSV file
csvWriter.writeRecords(data)
    .then(() => console.log('CSV file has been written successfully'))
    .catch(error => console.error('Error writing CSV file:', error));
