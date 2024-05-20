import React from "react";
import Plot from "react-plotly.js";

const HistogramChart = () => {
  var x1 = [];
  var x2 = [];
  var y1 = [];
  var y2 = [];
  for (var i = 1; i < 100; i++) {
    let k = Math.random();
    x1.push(k * 5);
    x2.push(k * 10);
    y1.push(k);
    y2.push(k * 2);
  }
  console.log({ x1: x1, y1: y1 }, { x2, y2 });
  var trace1 = {
    x: x1,
    y: y1,
    name: "control",
    // autobinx: false,
    // histnorm: "count",
    marker: {
      color: "rgba(255, 100, 102, 0.7)",
      line: {
        color: "rgba(255, 100, 102, 1)",
        width: 1,
      },
    },
    opacity: 0.5,
    type: "histogram",
    xbins: {
      size: 1,
    },
  };
  var trace2 = {
    x: x2,
    y: y2,
    // autobinx: false,
    marker: {
      color: "rgba(100, 200, 102, 0.7)",
    },
    name: "experimental",
    opacity: 0.75,
    type: "histogram",
    xbins: {
      size: 1,
    },
  };
  var data = [trace1, trace2];
  var layout = {
    bargap: 0.05,
    bargroupgap: 0.2,
    barmode: "overlay",
    title: "Sampled Results",
    xaxis: { title: "Value" },
    yaxis: { title: "Count" },
    width: 1300,
    height: 1000,
  };

  return <Plot data={data} layout={layout} />;
};

export default HistogramChart;
