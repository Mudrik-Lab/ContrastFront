import { useQuery } from "@tanstack/react-query";
import React from "react";
import Plot from "react-plotly.js";
import getEffectsDistribution from "../../apiHooks/getEffectsDistribution";
import { screenHeight, screenWidth } from "../../Utils/HardCoded";

function Histogram() {
  const {
    data: histData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [
      "distribution_of_effects_across_parameters",
      1,
      1,
      "number_of_stimuli",
    ],
    queryFn: () =>
      getEffectsDistribution({
        min_number_of_experiments: 1,
        binSize: 1,
        continuous_breakdown: "number_of_stimuli",
        isUncontrast: true,
      }),
  });

  var trace1 = {
    x: histData?.data[1].series.map((x) => x.key),
    y: histData?.data[1].series.map((y) => y.value),
    name: "control",
    autobinx: false,
    histnorm: "count",
    marker: {
      color: "rgba(255, 100, 102, 0.7)",
      line: {
        color: "rgba(255, 100, 102, 1)",
        width: 1,
      },
    },
    opacity: 0.5,
    type: "histogram",
  };
  // var trace2 = {
  //   x: x2,
  //   y: y2,
  //   autobinx: false,
  //   marker: {
  //     color: "rgba(100, 200, 102, 0.7)",
  //     line: {
  //       color: "rgba(100, 200, 102, 1)",
  //       width: 1,
  //     },
  //   },
  //   name: "experimental",
  //   opacity: 0.75,
  //   type: "histogram",
  //   xbins: {
  //     end: 4,
  //     size: 0.06,
  //     start: -3.2,
  //   },
  // };
  var data = [trace1];
  var layout = {
    bargap: 0.05,
    bargroupgap: 0.2,
    barmode: "overlay",
    title: "Sampled Results",
    xaxis: { title: "Value" },
    yaxis: { title: "Count" },
    width: screenWidth,
    height: screenHeight,
  };

  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
}

export default Histogram;
