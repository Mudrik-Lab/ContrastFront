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
import getJournals from "../../apiHooks/getJournals";

export default function Journals() {
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
  const { data, isSuccess } = useQuery([`journals`], () =>
    getJournals("Global Workspace")
  );
  const graphsData = data?.data;
  console.log(graphsData);

  var trace1 = {
    x: graphsData.map((row) => row.key),
    y: graphsData.map((row) => row.value),
    type: "bar",
  };
  console.log(trace1);
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
              <RadioInput />
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

        <div className="pl-2">
          <Plot
            data={[trace1]}
            layout={{
              autosize: false,
              width: screenWidth - 388,
              height: screenHeight,
              margin: { autoexpand: true, b: 150 },
              showlegend: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
