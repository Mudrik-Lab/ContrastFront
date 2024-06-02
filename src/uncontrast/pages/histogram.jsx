import React from "react";
import Plot from "react-plotly.js";

function Histogram() {
  //   var x1 = [];
  //   var x2 = [];
  //   var y1 = [];
  //   var y2 = [];
  //   for (var i = 1; i < 500; i++) {
  //     var k = Math.random();
  //     x1.push(k * 5);
  //     x2.push(k * 10);
  //     y1.push(k);
  //     y2.push(k * 2);
  //   }
  //   var trace1 = {
  //     x: x1,
  //     y: y1,
  //     name: "control",
  //     autobinx: false,
  //     histnorm: "count",
  //     marker: {
  //       color: "rgba(255, 100, 102, 0.7)",
  //       line: {
  //         color: "rgba(255, 100, 102, 1)",
  //         width: 1,
  //       },
  //     },
  //     opacity: 0.5,
  //     type: "histogram",
  //     xbins: {
  //       end: 2.8,
  //       size: 0.06,
  //       start: 0.5,
  //     },
  //   };
  //   var trace2 = {
  //     x: x2,
  //     y: y2,
  //     autobinx: false,
  //     marker: {
  //       color: "rgba(100, 200, 102, 0.7)",
  //       line: {
  //         color: "rgba(100, 200, 102, 1)",
  //         width: 1,
  //       },
  //     },
  //     name: "experimental",
  //     opacity: 0.75,
  //     type: "histogram",
  //     xbins: {
  //       end: 4,
  //       size: 0.06,
  //       start: -3.2,
  //     },
  //   };
  //   var data = [trace1, trace2];
  //   var layout = {
  //     bargap: 0.05,
  //     bargroupgap: 0.2,
  //     barmode: "overlay",
  //     title: "Sampled Results",
  //     xaxis: { title: "Value" },
  //     yaxis: { title: "Count" },
  //   };

  //   return (
  //     <div>
  //       <Plot data={data} layout={layout} />
  //     </div>
  //   );
  // }

  const data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];

  // Calculate histogram data
  const calculateHistogramData = (data, binSize) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const numBins = Math.ceil((max - min) / binSize);
    const binEdges = Array(numBins + 1)
      .fill(0)
      .map((_, i) => min + i * binSize);

    const bins = Array(numBins).fill(0);
    data.forEach((value) => {
      const binIndex = Math.floor((value - min) / binSize);
      bins[binIndex]++;
    });

    const binMiddles = binEdges
      .slice(0, -1)
      .map((edge, i) => (edge + binEdges[i + 1]) / 2);

    return { bins, binMiddles };
  };

  const binSize = 10; // You can adjust this value
  const { bins, binMiddles } = calculateHistogramData(data, binSize);

  return (
    <Plot
      data={[
        {
          x: data,
          type: "bar",
          opacity: 0.5, // Make the bars semi-transparent
          marker: { color: "red" },
        },
        {
          x: binMiddles,
          y: bins,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "blue" },
          line: { shape: "spline" }, // Smooth lines
        },
      ]}
      layout={{
        title: "Combined Bar and Line Histogram",
        xaxis: { title: "Values" },
        yaxis: { title: "Frequency" },
      }}
    />
  );
}

export default Histogram;
