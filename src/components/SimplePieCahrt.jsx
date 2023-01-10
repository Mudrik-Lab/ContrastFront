import { useQuery } from "@tanstack/react-query";
import React from "react";
import useGetPie from "../apiHooks/useGetPie";
import Plot from "react-plotly.js";

export default function SimplePieCahrt() {
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

  return (
    <div className="mt-60">
      <Plot
        data={[
          {
            values: RPTData.map((category) => category.value),
            labels: RPTData.map((category) => category.name),

            hole: 0.4,
            type: "pie",
            textinfo: "label",
            textposition: "inside",
            domain: { column: 1 },
          },
        ]}
        layout={{
          width: 500,
          height: 500,
          showlegend: false,
          title: `RPT N=${RPTData.reduce((sum, a) => sum + a.value, 0)}`,
          annotations: [
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "RPT",
              x: 0.5,
              y: 0.5,
            },
          ],
        }}
      />
      <Plot
        data={[
          {
            values: GNWData.map((category) => category.value),
            labels: GNWData.map((category) => category.name),

            hole: 0.4,
            type: "pie",
            textinfo: "label",
            textposition: "inside",
            domain: { column: 1 },
          },
        ]}
        layout={{
          width: 500,
          height: 500,
          showlegend: false,
          title: `RPT N=${GNWData.reduce((sum, a) => sum + a.value, 0)}`,
          annotations: [
            {
              font: {
                size: 20,
              },
              showarrow: false,
              text: "GNW",
              x: 0.5,
              y: 0.5,
            },
          ],
        }}
      />
    </div>
  );
}
