import { useQuery } from "@tanstack/react-query";
import React from "react";
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
import { getRandomColor } from "../../Utils/functions";

export default function ParametersDistributionBar() {
  const [selected, setSelected] = React.useState(tagsOptions[0]);
  const [selectedParent, setSelectedParent] = React.useState({
    value: "Global Workspace",
  });
  const [reporting, setReporting] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(1);
  const [isStacked, setIsStacked] = React.useState(true);

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

  const { data, isSuccess } = useQuery(
    [
      `parameters_distribution_bar${
        selected.value + selectedParent.value + reporting + experimentsNum
      }`,
    ],
    () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_bar",
        breakdown: selected.value,
        theory: selectedParent.value,
        is_reporting: reporting,
        min_number_of_experiments: experimentsNum,
      })
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
    x: X1?.reverse(),
    y: Y,
    name: "pro",
    orientation: "h",
    marker: {
      color: getRandomColor(X1?.length),
      width: 100,
    },
    type: "bar",
  };
  var trace2 = {
    x: X2?.reverse(),
    y: Y,
    name: "challenges",
    orientation: "h",
    marker: {
      color: Math.floor(Math.random() * 16777215).toString(16),
      width: 100,
    },
    type: "bar",
  };

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div>
      <Navbar />
      <div className="flex mt-12">
        <div className="side-filter-box border p-7 pt-10 flex flex-col items-center ">
          <Text size={28} weight="bold" color="blue" center>
            Parameters Distribution Bar
          </Text>
          <div className="w-[346px] shadow-lg mt-10 mx-auto bg-white flex flex-col items-center gap-2 px-4 py-2 ">
            <Text md weight="bold">
              Axis Controls
            </Text>
            <div className={sectionClass}>
              <RangeInput
                number={experimentsNum}
                setNumber={setExperimentsNum}
              />
              <FilterExplanation
                text="minimum number of experiments"
                tooltip="few more words about minimum number of experiments"
              />
            </div>

            <div className={sectionClass}>
              <Text md weight="bold">
                Filter Tags
              </Text>
              <TagsSelect
                defaultValue={selectedParent.value}
                options={parentTheories}
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
                defaultValue={selected.label}
                onChange={setSelected}
              />

              <FilterExplanation
                text="Paradigm "
                tooltip="few more words about Paradigm "
              />
              <RadioInput
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
            <div className="flex gap-2">
              <label htmlFor="stacked">Is Stacked?</label>
              <input
                type="checkbox"
                name="stacked"
                checked={isStacked}
                onChange={() => setIsStacked(!isStacked)}
              />
            </div>
          </div>
        </div>

        <div className="pl-12">
          <Plot
            data={[trace1, trace2]}
            layout={{
              barmode: isStacked ? "stack" : "group",
              title: "Parameter Distribution Bar",
              width: screenWidth - 388,
              height: 35 * Y?.length + 150,
              margin: { autoexpand: true, l: 200 },
              legend: { itemwidth: 90 },
              xaxis: {
                zeroline: true,
                side: "top",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
