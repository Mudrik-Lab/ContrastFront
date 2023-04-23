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
import { tagsOptions } from "../../components/HardCoded";
import getConfuguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import getFrequencies from "../../apiHooks/getFrequencyGraph";

export default function Frequencies() {
  const techniques = [
    { value: "EEG", label: "EEG" },
    { value: "Intracranial EEG", label: "Intracranial EEG" },
    { value: "MEG", label: "MEG" },
    { value: "EEG+TMS", label: "EEG + TMS" },
    { value: "Computational Modelling", label: "Computational Modelling" },
    { value: "EEG+Intracranial EEG", label: "EEG + Intracranial EEG" },
  ];
  const [experimentsNum, setExperimentsNum] = React.useState(1);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [selectedTechniques, setSelectedTechniques] =
    React.useState(techniques);
  const [selectedParent, setSelectedParent] = React.useState({
    value: null,
  });

  const colors = {
    Alpha: "#C2549D",
    Beta: "#EB5A88",
    Gamma: "#EF7576",
    Delta: "#4D3991",
    Theta: "#8949A2",
  };

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
      `frequencies${
        selectedTechniques.join(" ") +
        " " +
        selectedParent.value +
        " " +
        reporting +
        " " +
        theoryDriven +
        " " +
        consciousness
      }`,
    ],
    () =>
      getFrequencies({
        techniques: selectedTechniques,
        theory: selectedParent.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
      })
  );

  const something = data?.data.map((row) => row.series);

  const graphsData = something
    ?.reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => a.name - b.name);

  const traces = [];
  graphsData?.map((row, index) =>
    traces.push({
      x: [row.start, row.end],
      y: [index + 1, index + 1],
      name: "pro",
      orientation: "h",
      scatter: { color: colors[row.name] },
      line: {
        color: colors[row.name],
        width: 6,
      },
      type: "lines",
    })
  );

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div>
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
            <div className="w-full border-b border-t py-5 flex flex-col items-center gap-3 ">
              {/* TODO: find Headline */}
              <Text md weight={"light"}>
                Theory Driven
              </Text>
              <div className={sectionClass}>
                <Text md weight="bold">
                  Techniqes
                </Text>
                <Select
                  closeMenuOnSelect={true}
                  isMulti={true}
                  value={selectedTechniques}
                  options={techniques}
                  placeholder="Techniques"
                  onChange={setSelectedTechniques}
                />
                <FilterExplanation
                  text="Paradigms Family"
                  tooltip="few more words about Paradigms Family"
                />
              </div>
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
                Headline
              </Text>

              <TagsSelect
                options={parentTheories}
                placeholder="Paradigms Family"
                defaultValue={selectedParent.value}
                onChange={setSelectedParent}
              />
              <FilterExplanation
                text="Paradigms Family"
                tooltip="few more words about Paradigms Family"
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
                  { value: "either", name: "Either" },
                  { value: "both", name: "Both" },
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
          <Plot
            data={traces}
            layout={{
              autosize: false,
              barmode: "stack",
              title: "Parameter Distribution",
              width: screenWidth - 388,
              height: screenHeight,
              margin: { autoexpand: true, l: 200 },
              legend: { itemwidth: 90 },
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
        </div>
      </div>
    </div>
  );
}
