const csv = require("csvtojson");
const fs = require("fs");

csv()
  .fromFile("../data/raw/Stations_2018.csv")
  .then(data =>
    fs.writeFile(
      "../visualization/src/data/stations.json",
      JSON.stringify(data.map(d => ({ lat: d.latitude, lng: d.longitude }))),
      console.log
    )
  );
