import { useQuery } from "@tanstack/react-query";
import React from "react";
import Plot from "react-plotly.js";
import getEffectsDistribution from "../../apiHooks/getEffectsDistribution";
import { screenHeight, screenWidth } from "../../Utils/HardCoded";

function Histogram() {
  const data = [
    {
      series_name: "Mixed",
      series: [
        {
          key: "20.00",
          value: 3,
        },
        {
          key: "40.00",
          value: 1,
        },
        {
          key: "60.00",
          value: 4,
        },
        {
          key: "80.00",
          value: 1,
        },
        {
          key: "100.00",
          value: 1,
        },
        {
          key: "140.00",
          value: 1,
        },
        {
          key: "320.00",
          value: 2,
        },
      ],
    },
    {
      series_name: "Negative",
      series: [
        {
          key: "20.00",
          value: 3,
        },
        {
          key: "40.00",
          value: 8,
        },
        {
          key: "60.00",
          value: 6,
        },
        {
          key: "80.00",
          value: 2,
        },
        {
          key: "100.00",
          value: 4,
        },
        {
          key: "140.00",
          value: 1,
        },
        {
          key: "160.00",
          value: 4,
        },
        {
          key: "180.00",
          value: 7,
        },
        {
          key: "360.00",
          value: 1,
        },
      ],
    },
    {
      series_name: "Positive",
      series: [
        {
          key: "20.00",
          value: 18,
        },
        {
          key: "40.00",
          value: 10,
        },
        {
          key: "60.00",
          value: 15,
        },
        {
          key: "80.00",
          value: 8,
        },
        {
          key: "100.00",
          value: 1,
        },
        {
          key: "120.00",
          value: 5,
        },
        {
          key: "140.00",
          value: 5,
        },
        {
          key: "160.00",
          value: 1,
        },
        {
          key: "180.00",
          value: 3,
        },
        {
          key: "200.00",
          value: 2,
        },
        {
          key: "220.00",
          value: 3,
        },
        {
          key: "280.00",
          value: 1,
        },
        {
          key: "320.00",
          value: 7,
        },
        {
          key: "460.00",
          value: 3,
        },
      ],
    },
  ];
  const graphsData = [
    // {
    //   x: [20, 40, 60, 80, 100, 140, 320],
    //   y: [3, 1, 4, 1, 1, 1, 2],
    //   name: "Mixed",
    //   histnorm: "count",
    //   marker: {
    //     color: "#088515",
    //   },
    //   opacity: 0.5,
    //   xbins: {
    //     start: 0,
    //     end: 339.5,
    //     size: "20",
    //   },
    //   type: "histogram",
    // },
    // {
    //   x: [20, 40, 60, 80, 100, 140, 160, 180, 360],
    //   y: [3, 8, 6, 2, 4, 1, 4, 7, 1],
    //   name: "Negative",
    //   histnorm: "count",
    //   marker: {
    //     color: "#CA535A",
    //   },
    //   opacity: 0.5,
    //   xbins: {
    //     start: 0,
    //     end: 379.5,
    //     size: "20",
    //   },
    //   type: "histogram",
    // },
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
        data={graphsData}
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
