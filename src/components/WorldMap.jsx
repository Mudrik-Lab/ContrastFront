import React from "react";
import Plot from "react-plotly.js";

export default function WorldMap() {
  var data = [
    {
      type: "scattergeo",
      mode: "markers",
      locations: ["FRA", "DEU", "RUS", "ESP"],
      marker: {
        size: [20, 10, 15, 10],
        color: [10, 20, 40, 50],
        cmin: 0,
        cmax: 50,
        colorscale: "Grays",
        line: {
          color: "black",
        },
      },
      name: "europe data",
    },
  ];

  var layout = {
    geo: {
      scope: "world",
      resolution: 50,
      landcolor: "rgb(217, 217, 217)",
    },
    width: 2000,
    height: 1000,
    title: "World is big enuogh",
  };

  return <Plot data={data} layout={layout} />;
}
