import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";

import { Label, RadioInput, RangeInput, Text } from "../../components/Reusble";
import TagsSelect from "../../components/TagsSelect";
import Navbar from "../../components/Navbar";
import { parametersOptions } from "../../components/HardCoded";
import getAcrossTheYears from "../../apiHooks/getAcrossTheYearsGraph";
import Spinner from "../../components/Spinner";

export default function AcrossTheYears() {
  const [selected, setSelected] = useState(parametersOptions[0]);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);

  const { data, isSuccess, isLoading } = useQuery(
    [
      `across_the_years${
        selected.value +
        " " +
        reporting +
        " " +
        experimentsNum +
        " " +
        consciousness
      }`,
    ],
    () =>
      getAcrossTheYears({
        breakdown: selected.value,
        is_reporting: reporting,
        min_number_of_experiments: experimentsNum,
        type_of_consciousness: consciousness,
      })
  );

  // TODO: ask what should b the default breakdown

  const graphsData = [];
  data?.data.map((row) => {
    graphsData.push({
      x: row.series.map((a) => a.year),
      y: row.series.map((a) => a.value),
      type: "scatter",
      name: row.series_name,
      mode: "lines+markers",
    });
  });
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  screenHeight;

  return (
    <div>
      <Navbar />
      <div className="mt-12 flex ">
        <div className=" side-filter-box p-2 pt-10 flex flex-col items-center ">
          <Text color="blue" weight="bold" size={30}>
            Across the Years
          </Text>
          <div className="w-[346px] shadow-xl mt-10 mx-auto rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2  ">
            <Text weight="bold" md>
              Axis Controls
            </Text>
            <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
              <RangeInput
                number={experimentsNum}
                setNumber={setExperimentsNum}
              />
              <Label>min. # of experiments</Label>
            </div>

            <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
              <Text md weight={"light"}>
                Filter Tags
              </Text>
              <TagsSelect
                options={parametersOptions}
                value={selected}
                onChange={setSelected}
              />
            </div>
            <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
              {/* TODO: find Headline */}
              <Text md weight={"light"}>
                Reported
              </Text>
              <RadioInput
                name="Report"
                values={[
                  { value: "report", name: "Report" },
                  { value: "no_report", name: "No-Report" },
                  { value: "both", name: "Both" },
                  { value: "either", name: "Either" },
                ]}
                checked={reporting}
                setChecked={setReporting}
              />
            </div>
            <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
              {/* TODO: find Headline */}
              <Text md weight={"light"}>
                Type of Consciousness
              </Text>
              <RadioInput
                name="Consciousness"
                values={[
                  { value: "state", name: "State" },
                  { value: "content", name: "Content" },
                  { value: "both", name: "Both" },
                  { value: "either", name: "Either" },
                ]}
                checked={consciousness}
                setChecked={setConsciousness}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-full">
          {isLoading ? (
            <Spinner />
          ) : (
            <Plot
              data={graphsData}
              layout={{
                autosize: false,
                showlegend: true,
                legend: {
                  x: 1,
                  xanchor: "left",
                  y: 1,
                  font: {
                    size: 18,
                    color: "#000000",
                  },
                },
                hoverlabel: {
                  namelength: 40,
                  font: {
                    family: "Arial",
                    size: 12,
                    color: "#FFFFFF",
                  },
                },
                width: screenWidth - 338,
                height: screenHeight - 100,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
