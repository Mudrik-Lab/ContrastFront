import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  Text,
} from "../../components/Reusble";
import SimpleBarChart from "../../components/SimpleBarChart";
import TagsSelect from "../../components/TagsSelect";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import autoprefixer from "autoprefixer";

export default function ParametersDistribution() {
  const [selected, setSelected] = React.useState(null);

  const { data, isSuccess } = useQuery(
    [`parameters_distribution_barv${"finding_tag"}`],
    () =>
      getExperimentsGraphs(
        "parameters_distribution_bar",
        "finding_tag",
        "Global Workspace"
      )
  );

  isSuccess && console.log(data?.data);

  const X1 = data?.data.map((row) => row.series[0].value);
  console.log(X1);

  const Y = data?.data.map((row) => row.series_name);
  console.log(Y);
  const X2 = data?.data.map((row) => row.series[1]?.value || 0);
  console.log(X2);

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
      color: "rgba(55,128,191,0.6)",
      width: 1,
    },
    type: "bar",
  };
  var trace2 = {
    x: X2,
    y: Y,
    name: "challenges",
    orientation: "h",
    marker: {
      color: "#F23D34",
      width: 3,
    },
    type: "bar",
  };

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const colourOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ];
  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  const selectOptions1 = ["Ory", "Elad", "Alon", "Dani"];
  return (
    <div className="flex ">
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
              options={colourOptions}
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
              options={colourOptions}
              placeholder="Paradigms Family"
            />
            <FilterExplanation
              text="Paradigms Family"
              tooltip="few more words about Paradigms Family"
            />
          </div>
          <div className={sectionClass}>
            <Select
              closeMenuOnSelect={true}
              placeholder="Paradigm"
              options={colourOptions}
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
          data={[trace1, trace2]}
          layout={{
            autosize: false,
            barmode: "stack",
            width: screenWidth - 388,
            height: screenHeight,
            margin: { autoexpand: true, l: 200 },
          }}
        />
      </div>
    </div>
  );
}
