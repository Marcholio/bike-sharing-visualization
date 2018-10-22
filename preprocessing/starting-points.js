const csv = require("csvtojson");
const fs = require("fs");
const moment = require("moment");

const getMinutesOfDay = date =>
  moment(date).diff(moment(date).startOf("day"), "minutes");

const getMidPoints = (d, startStation, endStation) => {
  console.log(d.start_date);
  const minutes = Math.round(d.duration_sec / 60);
  const latStep = (endStation.latitude - startStation.latitude) / (minutes - 1);
  const lngStep =
    (endStation.longitude - startStation.longitude) / (minutes - 1);

  let curLat = parseFloat(startStation.latitude);
  let curLng = parseFloat(startStation.longitude);

  let curTime = getMinutesOfDay(d.start_date);

  return [...new Array(minutes)].map(() => {
    const dataPoint = {
      lat: curLat,
      lng: curLng,
      time: curTime
    };
    curLat += latStep;
    curLng += lngStep;

    curTime += 1;

    return dataPoint;
  });
};

Promise.all([
  csv().fromFile("../data/raw/Stations_2018.csv"),
  csv().fromFile("../data/raw/OD_2018-04.csv"),
  csv().fromFile("../data/raw/OD_2018-05.csv"),
  csv().fromFile("../data/raw/OD_2018-06.csv"),
  csv().fromFile("../data/raw/OD_2018-07.csv"),
  csv().fromFile("../data/raw/OD_2018-08.csv")
]).then(([stations, april, may, june, july, august]) => {
  const stationsByCode = stations.reduce(
    (acc, cur) => Object.assign(acc, { [cur.code]: cur }),
    {}
  );
  fs.writeFile(
    "../visualization/src/data/mid-points.json",
    JSON.stringify(
      april
        .concat(may, june, july, august)
        .filter(() => Math.random() > 0.99)
        .reduce(
          (acc, cur) =>
            acc.concat(
              getMidPoints(
                cur,
                stationsByCode[cur.start_station_code],
                stationsByCode[cur.end_station_code]
              )
            ),
          []
        )
    ),
    res => console.log(res)
  );
});
