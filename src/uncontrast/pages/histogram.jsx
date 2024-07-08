import { useQuery } from "@tanstack/react-query";
import React from "react";
import Plot from "react-plotly.js";
import getEffectsDistribution from "../../apiHooks/getEffectsDistribution";
import { screenHeight, screenWidth } from "../../Utils/HardCoded";

function Histogram() {
  const graphsData = [
    {
      x: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 280, 320, 460],
      y: [18, 10, 15, 8, 1, 5, 5, 1, 3, 2, 3, 1, 7, 3],

      name: "Positive",
      histnorm: "count",
      marker: {
        color: "#159DEA",
      },
      opacity: 0.5,
      // xbins: {
      //   start: 0,
      //   end: 479.5,
      //   size: 20,
      // },
      type: "bar",
    },
  ];

  return (
    <div>
      <Plot
        data={ory}
        layout={{
          bargap: 0.02,
          bargroupgap: 0.02,
          barmode: "overlay",
          xaxis: {
            title: "Range",
          },
          yaxis: {
            title: "Number of experiments",
            tickmode: "linear",
          },
          autosize: false, // Use true to let Plotly automatically size the plot

          legend: {
            x: 10,
            xanchor: "left",
            y: 1,
            font: {
              size: 16,
              color: "#000000",
            },
          },
          hoverlabel: {
            namelength: 40,
            font: {
              family: "Arial",
              size: 12,
              color: "#FFFFFF",
            },
          },
        }}
      />
    </div>
  );
}

export default Histogram;
