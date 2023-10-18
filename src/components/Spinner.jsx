import React, { useState, useEffect } from "react";
import { designerColors } from "../Utils/Colors";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

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
      <div className="h-full flex items-center justify-center z-50 border">
        <Plot
          data={[
            {
              type: "pie",
              values: [1, 3, 2, 5, 3, 4],
              hole: 0.4,
              rotation: angle,
              marker: { colors: designerColors },
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
          config={{ displayModeBar: false }}
        />
      </div>
    </div>
  );
};

export default Spinner;
