const decode = require("google-polyline").decode;

const mapsClient = require("@google/maps").createClient({
  // API key is IP protected
  key: "AIzaSyDGjwBJ_d3V8kJprAOYgF9EtuvkrEkFStQ",
  Promise: Promise
});

mapsClient
  .directions({
    origin: { lat: 60.190404, lng: 24.831526 },
    destination: { lat: 60.182, lng: 24.794641 },
    mode: "bicycling",
    units: "metric"
  })
  .asPromise()
  .then(res =>
    console.log(decode(res.json.routes[0].overview_polyline.points))
  );
