import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import {
  AlphaBetaColors,
  navHeight,
  parametersOptions,
  sideWidth,
} from "../../components/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import getTimings from "../../apiHooks/getTimings";
import Spinner from "../../components/Spinner";
import { blueToYellow } from "../../Utils/functions";
import Footer from "../../components/Footer";

export default function Timings() {
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const [selectedTags, setSelectedTags] = React.useState(null);
  const [selectedParent, setSelectedParent] = React.useState({});

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`confuguration`],
    getConfiguration
  );

  const techniques = configSuccess
    ? configuration?.data.available_techniques_for_timings.map((technique) => ({
        value: technique,
        label: technique,
      }))
    : [];
  const traceColor =
    configuration?.data.available_finding_tags_types_for_timings.reduce(
      (result, key, index) => {
        result[key] = blueToYellow(
          configuration?.data.available_finding_tags_types_for_timings.length
        )[index];
        return result;
      },
      {}
    );
  const tags = configSuccess
    ? configuration?.data.available_finding_tags_types_for_timings.map(
        (tag, index) => ({
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

  const { data, isLoading } = useQuery(
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
        selectedTags +
        " " +
        experimentsNum
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

  const serieses = data?.data.map((row) => row.series);

  const graphsData = serieses
    ?.reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => a.name - b.name);

  const traces = [];
  graphsData?.map((row, index) => {
    index > 8 &&
      traces.push({
        x: [row.start, row.end],
        y: [index + 1, index + 1],
        name: row.name,
        // marker: { colorbar: { tickangle: "auto" } },

        line: {
          width: 6,
          color: traceColor[row.name],
        },
        type: "scatter",
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
      <div className="flex mt-14 p-2">
        <SideControl headline="Timings">
          <Text md weight="bold">
            Axis Controls
          </Text>
          <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />
          <FilterExplanation
            text="Minimum number of experiments"
            tooltip="few more words about Minimum number of experiments"
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
          <div className={sectionClass}>
            <Text flexed md weight="bold">
              Finding Tags
              <FilterExplanation tooltip="few more words about Finding Tags" />
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
          </div>
          <TypeOfConsciousnessFilter
            checked={consciousness}
            setChecked={setConsciousness}
          />
          <ReportFilter checked={reporting} setChecked={setReporting} />
          <TheoryDrivenFilter
            checked={theoryDriven}
            setChecked={setTheoryDriven}
          />
        </SideControl>

        <div style={{ marginLeft: sideWidth }}>
          <TopGraphText
            firstLine={
              "The chart depicts the findings in the temporal domain of the experiments in the database. Each horizontal line represents a specific component, colored according to its classification by the authors (see the legend)."
            }
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          />

          {isLoading ? (
            <Spinner />
          ) : (
            <Plot
              data={traces}
              layout={{
                autosize: false,
                barmode: "stack",

                width: screenWidth - sideWidth - 300,
                height: screenHeight - 360,
                margin: { autoexpand: true, l: 20 },
                legend: { itemwidth: 15, font: { size: 18 } },
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
        <div
          className="fixed overflow-y-scroll top-52 right-2 "
          style={{ height: screenHeight - 450 }}>
          {blueToYellow(
            configuration?.data.available_finding_tags_types_for_timings.length
          ).map((color, index) => (
            <div className="flex justify-start items-end gap-2" id="color">
              <div
                className="w-4 h-4 mt-2 "
                style={{ backgroundColor: color }}></div>
              <Text sm>{Object.keys(traceColor)[index]}</Text>
            </div>
          ))}
        </div>
      </div>

      <Footer isFixed={true} />
    </div>
  );
}