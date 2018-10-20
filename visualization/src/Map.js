import React from "react";
import { GoogleApiWrapper, Map, HeatMap } from "google-maps-react";

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

const data = require("./data/starting-points.json");

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
      data: data.filter(d => d.start <= 0 && d.end <= 0),
      start: 300
    };
  }

  componentDidMount() {
    setInterval(() => {
      console.log(
        Math.ceil(this.state.start / 60) +
          ":" +
          (this.state.start % 60) +
          " - " +
          this.state.data.length
      );
      this.setState({
        data: data
          .filter(d => d.start <= this.state.start && d.end >= this.state.start)
          .concat([...new Array(50)].map(d => ({ lat: 45, lng: -74 }))),
        start: this.state.start + 1
      });
    }, 500);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: 45.4907962, lng: -73.6155126 }}
        zoom={12}
      >
        <HeatMapComponent data={this.state.data} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDGjwBJ_d3V8kJprAOYgF9EtuvkrEkFStQ",
  libraries: ["visualization"]
})(MapContainer);
