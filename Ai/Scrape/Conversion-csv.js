const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");

// Read JSON data from file
const jsonData = fs.readFileSync("data.json", "utf8");
const data = JSON.parse(jsonData);

// Check if data is an array and not null or undefined
if (Array.isArray(data) && data.length > 0) {
    // Create CSV writer
    const csvWriter = createObjectCsvWriter({
        path: "scraped_data.csv",
        header: Object.keys(data[0]).map((header) => ({
            id: header,
            title: header,
        })),
    });

    // Write data to CSV file
    csvWriter
        .writeRecords(
            data.map((record) => {
                // Check if record is not null or undefined before processing
                if (record !== null && record !== undefined) {
                    // Check each record for null values and replace them with a default value
                    Object.keys(record).forEach((key) => {
                        if (record[key] === null || record[key] === undefined) {
                            record[key] = "N/A"; // Replace null with 'N/A'
                        }
                    });
                    return record;
                } else {
                    return {}; // Return an empty object if record is null or undefined
                }
            }),
        )
        .then(() => console.log("CSV file has been written successfully"))
        .catch((error) => console.error("Error writing CSV file:", error));
} else {
    console.error("Data is either null, undefined, or an empty array.");
}
