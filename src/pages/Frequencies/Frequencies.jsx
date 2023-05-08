import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  Text,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import { AlphaBetaColors } from "../../components/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import getFrequencies from "../../apiHooks/getFrequencyGraph";
import Spinner from "../../components/Spinner";

export default function Frequencies() {
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const [selectedParent, setSelectedParent] = React.useState({});
  const [experimentsNum, setExperimentsNum] = React.useState(0);

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`confuguration`],
    getConfiguration
  );

  const techniques = configSuccess
    ? configuration?.data.available_techniques_for_frequencies.map(
        (technique) => ({
          value: technique,
          label: technique,
        })
      )
    : [];

  const parentTheories = configSuccess
    ? configuration?.data.available_parent_theories.map((parentTheory) => ({
        value: parentTheory,
        label: parentTheory,
      }))
    : [];

  const { data, isLoading } = useQuery(
    [
      `frequencies${
        selectedTechniques?.join(" ") + " " + selectedParent.value ||
        "" +
          " " +
          reporting +
          " " +
          theoryDriven +
          " " +
          consciousness +
          " " +
          experimentsNum
      }`,
    ],
    () =>
      getFrequencies({
        techniques: selectedTechniques,
        theory: selectedParent.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
        min_number_of_experiments: experimentsNum,
      })
  );
  const tracesData = data?.data.map((row) => row.series);

  const graphsData = tracesData
    ?.reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => a.name - b.name);
  console.log(graphsData);
  const traces = [];
  graphsData?.map((row, index) =>
    traces.push({
      x: [row.start, row.end],
      y: [index + 1, index + 1],
      name: row.name,
      orientation: "h",
      scatter: { color: AlphaBetaColors[row.name] },
      line: {
        color: AlphaBetaColors[row.name],
        width: 6,
      },
      type: "lines",
    })
  );

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  configSuccess && !selectedTechniques && setSelectedTechniques(techniques);

  return (
    <div>
      <Navbar />
      {configSuccess && (
        <div className="flex mt-12 p-2">
          <div className="side-filter-box p-2 pt-10 flex flex-col items-center ">
            <Text size={28} weight="bold" color="blue">
              Frequencies
            </Text>

            <div className="w-[346px] shadow-xl mt-10 mx-auto overflow-y-hidden rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2 ">
              <Text md weight="bold">
                Axis Controls
              </Text>
              <RangeInput
                number={experimentsNum}
                setNumber={setExperimentsNum}
              />
              <FilterExplanation
                text="minimum number of experiments"
                tooltip="few more words about minimum number of experiments"
              />
              <div className={sectionClass}>
                <Text flexed md weight="bold">
                  Theory
                  <FilterExplanation tooltip="few more words about Thory" />
                </Text>

                <TagsSelect
                  options={parentTheories}
                  placeholder="Paradigms Family"
                  defaultValue={selectedParent.value}
                  onChange={setSelectedParent}
                />
              </div>
              <div className={sectionClass}>
                <Text flexed md weight="bold">
                  Techniques
                  <FilterExplanation tooltip="few more words about techniques" />
                </Text>
                {configSuccess && (
                  <Select
                    closeMenuOnSelect={true}
                    isMulti={true}
                    value={selectedTechniques}
                    options={techniques}
                    placeholder="Techniques"
                    onChange={setSelectedTechniques}
                  />
                )}
              </div>
              <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
                <Text md weight="bold">
                  Theory Driven
                </Text>
                <RadioInput
                  name="Thery-Driven"
                  values={[
                    { value: "driven", name: "Driven" },
                    { value: "mentioning", name: "Mentioning" },
                    { value: "either", name: "Either" },
                    { value: "post-hoc", name: "Post Hoc" },
                  ]}
                  checked={theoryDriven}
                  setChecked={setTheoryDriven}
                />
              </div>
              <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
                {/* TODO: find Headline */}
                <Text md weight="bold">
                  Reported
                </Text>
                <RadioInput
                  name="Report"
                  values={[
                    { value: "report", name: "Report" },
                    { value: "no_report", name: "No-Report" },
                    { value: "either", name: "Either" },
                    { value: "both", name: "Both" },
                  ]}
                  checked={reporting}
                  setChecked={setReporting}
                />
              </div>
              <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
                <Text md weight="bold">
                  Type of Consciousness
                </Text>
                <RadioInput
                  name="Consciousness"
                  values={[
                    { value: "state", name: "State" },
                    { value: "content", name: "Content" },

                    { value: "either", name: "Either" },
                    { value: "both", name: "Both" },
                  ]}
                  checked={consciousness}
                  setChecked={setConsciousness}
                />
              </div>
            </div>
          </div>

          <div className="pl-12">
            {isLoading ? (
              <Spinner />
            ) : (
              <Plot
                data={traces}
                layout={{
                  autosize: false,
                  barmode: "stack",

                  width: screenWidth - 388,
                  height: screenHeight,
                  showlegend: false,
                  yaxis: {
                    zeroline: false, // hide the zeroline
                    zerolinecolor: "#969696", // customize the color of the zeroline
                    zerolinewidth: 2, // customize the width of the zeroline
                  },
                  xaxis: {
                    zeroline: false, // hide the zeroline
                    zerolinecolor: "#969696", // customize the color of the zeroline
                    zerolinewidth: 2, // customize the width of the zeroline
                  },
                }}
              />
            )}
          </div>
          <div className="mt-24 " style={{ height: screenHeight - 150 }}>
            {Object.values(AlphaBetaColors).map((color, index) => (
              <div className="flex justify-start items-end gap-2" id="color">
                <div
                  className="w-5 h-5 mt-2 "
                  style={{ backgroundColor: color }}></div>
                <Text>{Object.keys(AlphaBetaColors)[index]}</Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
