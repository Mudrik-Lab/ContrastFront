import { useQuery } from "@tanstack/react-query";
import React from "react";
import getConfuguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import { tagsOptions } from "../../components/HardCoded";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import SimplePieCahrt from "../../components/SimplePieCahrt";
import Plot from "react-plotly.js";

export default function ParametersDistributionPie() {
  const [selected, setSelected] = React.useState(tagsOptions[0]);
  const [selectedParent, setSelectedParent] = React.useState({
    value: "Global Workspace",
    label: "Global Workspace",
  });
  const [reporting, setReporting] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(1);

  const { data: configuration, isSuccess: configurationSuccess } = useQuery(
    [`parent_theories`],
    getConfuguration
  );
  const { data, isSuccess } = useQuery(
    [
      `parameters_distribution_pie${
        +" " +
        selected.value +
        " " +
        selectedParent.value +
        " " +
        reporting +
        " " +
        experimentsNum
      }`,
    ],
    () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_pie",
        breakdown: selected.value,
        theory: selectedParent.value,
        is_reporting: reporting,
        min_number_of_experiments: experimentsNum,
      })
  );

  console.log(data?.data);

  return (
    <div>
      <Navbar />
      {/* <Plot
        data={[
          {
            values: data?.data.map((category) => category.value),
            labels: data?.data.map((category) => category.series_name),
            type: "pie",
            textinfo: "label",
            textposition: "inside",
            domain: { column: 1 },
          },
        ]}
        layout={{
          width: 1000,
          height: 700,
          showlegend: true,
        }}
      /> */}

      <Plot
        data={[
          {
            values: [20, 80],
            labels: ["Layer 1", ""],
            type: "pie",

            marker: {
              colors: ["blue", "green"],
            },
            hoverinfo: "label+percent",
          },
          {
            values: [60, 40],
            labels: ["Layer 2", ""],
            type: "pie",
            hole: 0.7,
            marker: {
              colors: ["red", "orange"],
            },
            hoverinfo: "label+percent",
          },
        ]}
        layout={{
          title: "Two-Layer Pie Chart",
          annotations: [
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "Layer 1",
              x: 0.9,
              y: 0.9,
            },
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "Layer 2",
              x: 0.5,
              y: 0.5,
            },
          ],
        }}
      />
    </div>
  );
}
