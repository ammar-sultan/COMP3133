const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "input_countries.csv";
const canadaFile = "canada.txt";
const usaFile = "usa.txt";

if (fs.existsSync(canadaFile)) {
  fs.unlinkSync(canadaFile);
  console.log(`${canadaFile} deleted.`);
}
if (fs.existsSync(usaFile)) {
  fs.unlinkSync(usaFile);
  console.log(`${usaFile} deleted.`);
}

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    if (row.country === "Canada") {
      fs.appendFileSync(canadaFile, JSON.stringify(row) + "\n");
    } else if (row.country === "United States") {
      fs.appendFileSync(usaFile, JSON.stringify(row) + "\n");
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");
    console.log(`Filtered data written to ${canadaFile} and ${usaFile}.`);
  });
