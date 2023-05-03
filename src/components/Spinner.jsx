import React, { useState, useEffect } from "react";

import Plot from "react-plotly.js";
import { colorsArray } from "./HardCoded";

const Spinner = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 30);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Plot
      data={[
        {
          type: "pie",
          values: [1, 3, 2, 5, 3, 4],
          hole: 0.4,
          rotation: angle,
          marker: { colors: colorsArray },
          hoverinfo: "none",
          showlegend: false,
        },
      ]}
      layout={{
        title: "Loading...",
        width: 700,
        height: 700,
        margin: { t: 150, r: 150, b: 150, l: 150 },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
      }}
    />
  );
};

export default Spinner;
