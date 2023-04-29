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
import { ABColors, tagsOptions } from "../../components/HardCoded";
import getConfuguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import getTimings from "../../apiHooks/getTimings";

export default function Timings() {
  const [experimentsNum, setExperimentsNum] = React.useState(1);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const [selectedTags, setSelectedTags] = React.useState(null);
  const [selectedParent, setSelectedParent] = React.useState({
    value: "Global Workspace",
  });

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`confuguration`],
    getConfuguration
  );

  const techniques = configSuccess
    ? configuration?.data.available_techniques_for_timings.map((technique) => ({
        value: technique,
        label: technique,
      }))
    : [];
  const tags = configSuccess
    ? configuration?.data.available_finding_tags_types_for_timings.map(
        (tag) => ({
          value: tag,
          label: tag,
        })
      )
    : [];

  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
    })
  );

  const { data, isSuccess } = useQuery(
    [
      `timings${
        selectedTechniques?.join(" ") +
        " " +
        selectedParent.value +
        " " +
        reporting +
        " " +
        theoryDriven +
        " " +
        consciousness +
        " " +
        selectedTags
      }`,
    ],
    () =>
      getTimings({
        techniques: selectedTechniques,
        tags: selectedTags,
        theory: selectedParent.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
        min_number_of_experiments: experimentsNum,
      })
  );

  const something = data?.data.map((row) => row.series);

  const graphsData = something
    ?.reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => a.name - b.name);

  const traces = [];
  graphsData?.map((row, index) => {
    traces.push({
      x: [row.start, row.end],
      y: [index + 1, index + 1],
      name: row.name,
      orientation: "h",
      scatter: { color: ABColors[row.name] },
      line: {
        color: ABColors[row.name],
        width: 6,
      },
      type: "lines",
    });
  });

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  configSuccess && !selectedTechniques && setSelectedTechniques(techniques);
  configSuccess && !selectedTags && setSelectedTags(tags);
  return (
    <div>
      <Navbar />
      {
        <div className="flex mt-12">
          <div className="side-filter-box border p-7 pt-10 flex flex-col items-center ">
            <Text size={28} weight="bold" color="blue">
              Timings
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
                  <FilterExplanation
                    text="Techniqes"
                    tooltip="few more words about Techniqes"
                  />
                </div>
                <div className={sectionClass}>
                  <Text md weight="bold">
                    Tags
                  </Text>
                  {configSuccess && (
                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={selectedTags}
                      options={tags}
                      placeholder="Tags"
                      onChange={setSelectedTags}
                    />
                  )}
                  <FilterExplanation
                    text="Techniqes"
                    tooltip="few more words about Techniqes"
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
                title: "Frequencies",
                width: screenWidth - 388,
                height: screenHeight,
                margin: { autoexpand: true, l: 20 },
                legend: { itemwidth: 90 },
                showlegend: true,
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
      }
    </div>
  );
}