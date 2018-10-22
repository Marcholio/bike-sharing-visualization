import React from "react";
import { GoogleApiWrapper, Map, HeatMap } from "google-maps-react";

const darkTheme = require("./dark-theme.json");

const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)"
];

const data = require("./data/mid-points.json");

const step = 10;
const startTime = 300;

const HeatMapComponent = props => {
  return (
    <HeatMap
      key={Date.now()}
      gradient={gradient}
      opacity={0.8}
      positions={props.data}
      radius={30}
      map={props.map}
      google={props.google}
    />
  );
};

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data.filter(d => d.time >= startTime && d.time < startTime + step),
      time: startTime
    };
  }

  componentDidMount() {
    setInterval(() => {
      console.log(
        Math.floor(this.state.time / 60) +
          ":" +
          (this.state.time % 60) +
          " - " +
          this.state.data.length
      );
      this.setState({
        data: data
          .filter(
            d => d.time >= this.state.time && d.time < this.state.time + step
          )
          .concat([...new Array(50)].map(d => ({ lat: 45, lng: -74 }))),
        time: (this.state.time + step) % (24 * 60)
      });
    }, 1000);
  }

  render() {
    const isNight =
      Math.ceil(this.state.time / 60) < 8 ||
      Math.ceil(this.state.time / 60) > 20;
    return (
      <div>
        <div id={"clock"}>
          {Math.floor(this.state.time / 60)}:
          {`${this.state.time % 60 < 10 ? "0" : ""}${this.state.time % 60}`}
        </div>
        <Map
          key={isNight}
          google={this.props.google}
          initialCenter={{ lat: 45.51809, lng: -73.58809 }}
          zoom={13}
          styles={isNight ? darkTheme : null}
        >
          <HeatMapComponent data={this.state.data} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDGjwBJ_d3V8kJprAOYgF9EtuvkrEkFStQ",
  libraries: ["visualization"]
})(MapContainer);
