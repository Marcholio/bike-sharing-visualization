const csv = require("csvtojson");
const fs = require("fs");

Promise.all([
  csv().fromFile("../data/raw/Stations_2018.csv"),
  csv().fromFile("../data/raw/OD_2018-04.csv")
]).then(([stations, april]) => {
  const stationsByCode = stations.reduce(
    (acc, cur) => Object.assign(acc, { [cur.code]: cur }),
    {}
  );
  fs.writeFile(
    "../visualization/src/data/starting-points.json",
    JSON.stringify(
      april.map(d => ({
        lat: stationsByCode[d.start_station_code].latitude,
        lng: stationsByCode[d.start_station_code].longitude
      }))
    ),
    res => console.log(res)
  );
});
