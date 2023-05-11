import React, { useState, useEffect } from "react";

import Plot from "react-plotly.js";
import { colorsArray, screenHeight, screenWidth } from "./HardCoded";

const Spinner = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 30);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" h-screen w-screen fixed top-0 left-0 z-10 ">
      <div className="h-full flex items-center justify-center z-60 border">
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
            width: 600,
            height: 600,
            // margin: { b: 150 },
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default Spinner;
