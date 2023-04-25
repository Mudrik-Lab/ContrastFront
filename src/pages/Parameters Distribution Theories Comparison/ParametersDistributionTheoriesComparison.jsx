import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  Text,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import { tagsOptions } from "../../components/HardCoded";
import getConfuguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";

export default function ParametersDistributionTheoriesComparison() {
  const [selected, setSelected] = React.useState({ value: "paradigm" });
  const [selectedParent, setSelectedParent] = React.useState({ value: "" });
  const { data: configuration } = useQuery(
    [`parent_theories`],
    getConfuguration
  );

  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    })
  );
  console.log(parentTheories);
  const { data, isSuccess } = useQuery(
    [`parameters_distribution_bar${selected.value}`],
    () =>
      getExperimentsGraphs(
        "parameters_distribution_bar",
        selected.value,
        "Global Workspace"
      )
  );

  const X1 = data?.data.map((row) => row.series[0].value);

  const Y = data?.data.map((row) => row.series_name);

  const X2 = data?.data.map((row) => row.series[1]?.value || 0);

  const graphsData2 = [];
  data?.data.map((row) => {
    graphsData2.push({
      x: row.series[1]?.value || 0,
      y: row.series_name,
      type: "bar",
      orientation: "h",
      name: "challenges",
    });
  });

  var trace1 = {
    x: X1,
    y: Y,
    name: "pro",
    orientation: "h",
    marker: {
      color: Math.floor(Math.random() * 16777215).toString(16),
      width: 1,
    },
    type: "bar",
  };

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div>
      {" "}
      <Navbar />
      <div className="flex mt-12">
        <div className="side-filter-box border p-7 pt-10 flex flex-col items-center ">
          <Text size={28} weight="bold" color="blue">
            Parameters Distribution
          </Text>
          <div className="w-[346px] shadow-lg mt-10 mx-auto bg-white flex flex-col items-center gap-2 px-4 py-2 ">
            <Text md weight="bold">
              Axis Controls
            </Text>
            <div className={sectionClass}>
              <RangeInput />
              <FilterExplanation
                text="minimum number of experiments"
                tooltip="few more words about minimum number of experiments"
              />
            </div>
            <div className={sectionClass}>
              <Select
                closeMenuOnSelect={true}
                placeholder="X axis category selection.."
                options={parentTheories}
              />
              <FilterExplanation
                text="Choose parameter of interest"
                tooltip="few more words about Choose parameter of interest"
              />
            </div>
            <div className={sectionClass}>
              <FilterExplanation
                text="Select results format"
                tooltip="few more words about Select results format"
              />
            </div>
            <div className={sectionClass}>
              <Text md weight="bold">
                Filter Tags
              </Text>
              <Select
                closeMenuOnSelect={true}
                isMulti={true}
                options={parentTheories}
                placeholder="Paradigms Family"
                onChange={setSelectedParent}
              />
              <FilterExplanation
                text="Paradigms Family"
                tooltip="few more words about Paradigms Family"
              />
            </div>
            <div className={sectionClass}>
              <TagsSelect
                options={tagsOptions}
                defaultValue={selected.value}
                onChange={setSelected}
              />

              <FilterExplanation
                text="Paradigm "
                tooltip="few more words about Paradigm "
              />
            </div>
          </div>
        </div>

        <div className="pl-12">
          <Plot
            data={trace1}
            layout={{
              autosize: false,
              barmode: "stack",
              width: screenWidth - 388,
              height: screenHeight,
              margin: { autoexpand: true, l: 200 },
              showlegend: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
