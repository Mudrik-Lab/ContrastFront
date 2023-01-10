import React from "react";
import Plot from "react-plotly.js";

export default function PlotlyBarChart() {
  return (
    <div>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines",
            marker: { color: "red" },
          },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 1200, height: 800, title: "A Fancy Plot" }}
      />
    </div>
  );
}
