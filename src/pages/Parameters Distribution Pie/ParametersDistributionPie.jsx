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

  const values1 = [];
  const labels1 = [];
  const ids1 = [];
  const ids2 = [];
  const values2 = [];
  const labels2 = [];

  data?.data.map((x, index) => {
    values1.push(x.value);
    labels1.push(x.series_name);
    ids1.push(index);
    x.series.map((y) => {
      values2.push(y.value);
      labels2.push(y.key + index);
    });
  });
  console.log({ labels2, values2 });
  return (
    <div>
      <Navbar />
      <Plot
        data={[
          {
            direction: "clockwise",
            values: values1,
            labels: labels1,
            ids: ids1,
            type: "pie",
            textinfo: "label+number",
            textposition: "inside",
            insidetextorientation: "radial",
            domain: { column: 1 },
            marker: { line: { width: 1, color: "white" } },
          },
          {
            direction: "clockwise",
            values: values2,
            labels: labels2,
            ids: ids1,
            sort: false,
            type: "pie",
            textinfo: "label+value",
            hole: 0.7,
            textposition: "inside",
            domain: { column: 10 },
            marker: { line: { width: 1, color: "white" } },
          },
        ]}
        layout={{
          width: 1900,
          height: 1100,
          showlegend: false,

          annotations: [{ showarrow: false }, { showarrow: false }],
        }}
      />
      {/* <Plot
        data={[
          {
            values: [20, 30, 50],
            labels: ["A", "B", "C"],
            type: "pie",
            ids: ["A", "B", "C"], // Set the ids to the label values
            name: "Pie 1",

            marker: { line: { width: 1 } },
          },
          {
            values: [10, 30, 60],
            labels: ["X", "Y", "Z"],
            type: "pie",
            ids: ["X", "Y", "Z"], // Set the ids to the label values
            name: "Pie 2",
            hole: 0.9,
            // marker: { line: { width: 1 } },
          },
        ]}
        layout={{
          width: 1000,
          height: 600,
          title: "Two-Layer Pie Chart",
          showlegend: true,
          grid: { rows: 1, columns: 2 },
          annotations: [
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "Pie 1",
              x: 0.18,
              y: 0.5,
            },
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "Pie 2",
              x: 0.82,
              y: 0.5,
            },
          ],
        }}
      /> */}
    </div>
  );
}
