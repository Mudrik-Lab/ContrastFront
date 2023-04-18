import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";

import { Label, RadioInput, RangeInput, Text } from "../../components/Reusble";
import TagsSelect from "../../components/TagsSelect";
import Navbar from "../../components/Navbar";
import { tagsOptions } from "../../components/HardCoded";

export default function AcrossTheYears() {
  const [selected, setSelected] = useState({ value: "paradigm" });

  const { data, isSuccess } = useQuery(
    [`across_the_years${selected.value}`],
    () => getExperimentsGraphs("across_the_years", selected.value)
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

  return (
    <div>
      <Navbar />
      <div className="mt-12 flex ">
        <div className=" p-7 pt-10 flex flex-col items-center">
          <Text color="blue" weight="bold" size={30}>
            Across the Years
          </Text>
          <div className="w-[280px] shadow-lg mt-10 mx-auto bg-white flex flex-col items-center gap-2 px-4 py-2 ">
            <Text weight={"light"} md>
              Axis Controls
            </Text>
            <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
              <RangeInput />
              <Label>min. # of experiments</Label>
            </div>

            <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
              <RadioInput />
              <Label>choose X axis Value</Label>
            </div>
            <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
              <Text md weight={"light"}>
                Filter Tags
              </Text>
              <TagsSelect
                options={tagsOptions}
                defaultValue={selected.value}
                onChange={setSelected}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-full">
          <Plot
            data={graphsData}
            layout={{
              autosize: false,

              width: screenWidth - 338,
              height: 800,
            }}
          />
        </div>
      </div>
    </div>
  );
}
