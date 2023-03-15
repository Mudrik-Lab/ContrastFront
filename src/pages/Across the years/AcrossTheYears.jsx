import { useQuery } from "@tanstack/react-query";
import React from "react";
import Plot from "react-plotly.js";
import useGetExperimentsGraphs from "../../apiHooks/useGetExperimentsGraphs";

import {
  Label,
  RadioInput,
  RangeInput,
  Select,
  Text,
} from "../../components/Reusble";
import SimpleBarChart from "../../components/SimpleBarChart";
import TagsSelect from "../../components/TagsSelect";

export default function AcrossTheYears() {
  const [selected, setSelected] = React.useState(["tag", "TAG"]);

  const { data, isSuccess } = useQuery(["across_the_years"], () =>
    useGetExperimentsGraphs("across_the_years", "paradigm")
  );
  isSuccess && console.log(data);

  const tagsOptions = [
    { value: "Paradigms Family", label: "Paradigms Family", isFixed: false },
    { value: "Paradigms", label: "Paradigms", isDisabled: false },
    { value: "Population", label: "Population" },
    { value: "Task", label: "Task" },
    { value: "Stimuli Category", label: "Stimuli Category" },
    { value: "Modality", label: "Modality" },
    {
      value: "Consciousness Measure (Phase)",
      label: "Consciousness Measure (Phase)",
    },
    {
      value: "Consciousness Measure (Type)",
      label: "Consciousness Measure (Type)",
    },
    { value: "Report vs. No Report", label: "Report vs. No Report" },
    { value: "Findings (Tags)", label: "Findings (Tags)" },
    { value: "Measures", label: "Measures" },
    { value: "Theory Driven", label: "Theory Driven" },
    { value: "Findings", label: "Findings" },
    {
      value: "State Consciousness vs. Content Consciousness",
      label: "State Consciousness vs. Content Consciousness",
    },
  ];
  return (
    <div className="flex ">
      <div className="border p-7 pt-10 flex flex-col items-center">
        <Text lg>Across the Years</Text>
        <div className="w-72 shadow-lg mt-10 mx-auto bg-white flex flex-col items-center gap-2 px-4 py-2 ">
          <Text weight={"light"} md>
            Axis Controls
          </Text>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <RangeInput />
            <Label>min. # of experiments</Label>
          </div>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <Select />
            <Label>choose Y axis Value</Label>
          </div>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <RadioInput />
            <Label>choose X axis Value</Label>
          </div>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <Text md weight={"light"}>
              Filter Tags
            </Text>
            <TagsSelect options={tagsOptions} placeholder="Add Filter Tags" />
          </div>
        </div>
      </div>

      <div>
        <Plot
          data={[
            {
              x: [1, 20, 300],
              y: [2, 62, 350],
              type: "scatter",
              name: "ory's",
              mode: "lines+markers",
            },
            {
              x: [1, 12, 300],
              y: [2, 60, 30],
              type: "scatter",
              mode: "lines+markers",
            },
            {
              x: [1, 3, 4],
              y: [2, 6, 1200],
              type: "scatter",
              mode: "lines+markers",
            },
            {
              x: [1, 20, 40],
              y: [2, 60, 90],
              type: "scatter",
              mode: "lines+markers",
            },
          ]}
          layout={{ autosize: true, title: "Across The Years" }}
        />
      </div>
    </div>
  );
}
