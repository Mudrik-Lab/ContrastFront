import { useQuery } from "@tanstack/react-query";
import React from "react";
import Plot from "react-plotly.js";
import useGetTopics from "../apiHooks/useGetTopics";

export default function SimpleBarChart() {
  const { data: topics, isSuccess } = useQuery(["topics"], useGetTopics);

  const topicsObj = topics?.data.records
    .map((record) => {
      return record.fields["X"];
    })
    .reduce((accumulator, value) => {
      accumulator[value] = ++accumulator[value] || 1;
      return accumulator;
    }, {});

  const topicsCountArr = [];
  if (topicsObj) {
    for (const [topic, number] of Object.entries(topicsObj)) {
      topicsCountArr.push({ topic, number });
    }
  }

  // topicsCountArr.sort(function (a, b) {
  //   if (a.number > b.number) {
  //     return 1;
  //   } else if (a.number < b.number) {
  //     return -1;
  //   } else {
  //     return 0;
  //   }
  // });

  return (
    <div className="w-full  m-auto flex ">
      <div className="px-4 ml-6">
        <Plot
          data={[
            {
              y: topicsCountArr.map((x) => x.topic),
              x: topicsCountArr.map((y) => y.number),
              type: "bar",
              mode: "lines",
              orientation: "h",
            },
          ]}
          layout={{
            width: 1200,
            height: 800,
            title: "Free Queries",
            colorway: ["gray"],
            hoverlabel: { bgcolor: "green" },
            yaxis: {
              tickcolor: "red",
              ticktext: [""],
              title: { position: "top center" },
            },
          }}
        />
      </div>
    </div>
  );
}
