import { useQuery } from "@tanstack/react-query";
import React from "react";
import Plot from "react-plotly.js";
import getExperimentsGraphs from "../apiHooks/getExperimentsGraphs";
import { tagsOptions } from "./HardCoded";

export default function NestedPie() {
  const { data, isSuccess } = useQuery(
    [`parameters_distribution_theories_comparison${+" " + "stam"}`],
    () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_theories_comparison",
        breakdown: tagsOptions[0].value,
        interpretation: "challenges",
      })
  );

  // for matching external pie to internal- need to add to external's data "parentName"
  // like in https://codesandbox.io/s/jmjrt?file=/src/data.js:597-619

  console.log(data?.data);

  // Define the data for the first pie chart
  var data1 = [
    {
      values: [19, 26, 55],
      labels: ["Label A", "Label B", "Label C"],
      type: "pie",
      name: "Pie Chart 1",
    },
  ];

  // Define the data for the second pie chart
  var data2 = [
    {
      values: [10, 20, 70],
      labels: ["Label D", "Label E", "Label F"],
      type: "pie",
      name: "Pie Chart 2",
    },
  ];

  // Define the layout with a common legend for both pie charts
  var layout = {
    title: "Pie Charts with Common Legend",
    legend: {
      x: 0,
      y: 1,
      traceorder: "normal",
      font: {
        family: "sans-serif",
        size: 12,
        color: "#000",
      },
      bgcolor: "#E2E2E2",
      bordercolor: "#FFFFFF",
      borderwidth: 2,
    },
  };

  return (
    <div className="mt-60">
      <Plot data={[data1, data2]} layout={layout} />

      {/* <Plot
        data={[
          {
            values: RPTData.map((category) => category.value),
            labels: RPTData.map((category) => category.name),

            hole: 0.7,
            type: "pie",
            textinfo: "label",
            textposition: "inside",
            domain: { column: 1 },
          },
          {
            values: RPTData.map((category) => category.value),
            labels: RPTData.map((category) => category.name),
            type: "pie",
            textinfo: "label",
            textposition: "inside",
            domain: {
              x: [0.2, 0.8],
              y: [0.2, 0.8],
            },
          },
        ]}
        layout={{
          width: 500,
          height: 500,
          showlegend: false,
          title: `RPT N=${RPTData.reduce((sum, a) => sum + a.value, 0)}`,
        }}
      /> */}
    </div>
  );
}
