import { useQuery } from "@tanstack/react-query";
import React from "react";
import Plot from "react-plotly.js";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
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

  topicsCountArr.sort(function (a, b) {
    if (a.number > b.number) {
      return -1;
    } else if (a.number < b.number) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div className="w-full h-screen m-auto flex flex-col">
      <BarChart
        barSize={"100%"}
        width={1000}
        height={500}
        data={topicsCountArr}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 150,
        }}
      >
        {/* <CartesianGrid strokeDasharray="10 10" /> */}
        <XAxis
          dataKey="topic"
          angle={60}
          dx={15}
          dy={50}
          minTickGap={-200}
          axisLine={false}
          tick={{
            textAlign: "left",
            fontSize: 10,
          }}
        >
          {/* <Label value="topics" offset={0} position="insideBottom" /> */}
        </XAxis>
        <YAxis dataKey="number" />
        <Tooltip cursor contentStyle={{ color: "red" }} />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="number" fill="#1F77B4" />
      </BarChart>
      <Plot
        data={[
          {
            x: topicsCountArr.map((x) => x.topic),
            y: topicsCountArr.map((y) => y.number),
            type: "bar",
            mode: "lines",
          },
        ]}
        layout={{ width: 1200, height: 800, title: "Free Queries" }}
      />
    </div>
  );
}
