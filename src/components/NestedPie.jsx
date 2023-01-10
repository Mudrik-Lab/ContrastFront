import { useQuery } from "@tanstack/react-query";
import React from "react";
import useGetPie from "../apiHooks/useGetPie";
import Plot from "react-plotly.js";

export default function NestedPie() {
  const { data, isSuccess } = useQuery(["comparison"], useGetPie);

  const RPTcategories = data?.data.records
    .filter((record) => {
      return record.fields["THEORY"] === "RPT";
    })
    .map((record) => {
      return record.fields["Category"];
    })
    .reduce((accumulator, value) => {
      accumulator[value] = ++accumulator[value] || 1;
      return accumulator;
    }, {});

  let RPTData = [];
  if (RPTcategories) {
    for (const [key, value] of Object.entries(RPTcategories)) {
      RPTData.push({ name: key, value });
    }
  }

  const GNWcategories = data?.data.records
    .filter((record) => {
      return record.fields["THEORY"] === "GNW";
    })
    .map((record) => {
      return record.fields["Category"];
    })
    .reduce((accumulator, value) => {
      accumulator[value] = ++accumulator[value] || 1;
      return accumulator;
    }, {});

  let GNWData = [];
  if (GNWcategories) {
    for (const [key, value] of Object.entries(GNWcategories)) {
      GNWData.push({ name: key, value });
    }
  }

  // for matching external pie to internal- need to add to external's data "parentName"
  // like in https://codesandbox.io/s/jmjrt?file=/src/data.js:597-619

  return (
    <div className="mt-60">
      <Plot
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
      />
    </div>
  );
}
