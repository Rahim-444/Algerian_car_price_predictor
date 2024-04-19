import json
import csv

# Define input JSON file path
json_file_path = "data.json"

# Define output CSV file path
csv_file_path = "cars_data.csv"

# Read JSON data from file
cars = []
with open(json_file_path, 'r', encoding='utf-8') as json_file:
    for line in json_file:
        cars.append(json.loads(line))

# Get all unique keys from all dictionaries
fieldnames = set()
for car in cars:
    fieldnames.update(car.keys())

# Write data to CSV file
with open(csv_file_path, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(cars)

print("CSV file generated successfully:", csv_file_path)

