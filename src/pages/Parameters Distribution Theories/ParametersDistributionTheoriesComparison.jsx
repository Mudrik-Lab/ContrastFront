import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import {
  colorsArray,
  colorsNames,
  navHeight,
  parametersColors,
  parametersOptions,
  screenHeight,
  sideWidth,
} from "../../components/HardCoded";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  SideControl,
  Spacer,
  Text,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import Toggle from "../../components/Toggle";
import Spinner from "../../components/Spinner";
import { breakHeadlines, getRandomColor } from "../../Utils/functions";
import getExtraConfig from "../../apiHooks/getExtraConfig";

export default function ParametersDistributionTheoriesComparison() {
  const [selected, setSelected] = React.useState(parametersOptions[0]);
  const [selectedParent, setSelectedParent] = React.useState({
    value: "Global Workspace",
    label: "Global Workspace",
  });
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [interpretation, setInterpretation] = useState(true);

  const { data, isSuccess, isLoading } = useQuery(
    [
      `parameters_distribution_theories_comparison${
        +" " +
        selected.value +
        " " +
        consciousness +
        " " +
        reporting +
        " " +
        experimentsNum +
        " " +
        theoryDriven +
        " " +
        (interpretation ? "pro" : "challenges")
      }`,
    ],
    () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_theories_comparison",
        breakdown: selected.value,
        is_reporting: reporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
        interpretation: interpretation ? "pro" : "challenges",
      })
  );
  const chartsData = data?.data;
  const keysArr = [];
  chartsData?.map((theory) =>
    theory.series.map((row) => keysArr.push(row.key))
  );
  const trimedKeysArr = [...new Set(keysArr)];
  const someColors = colorsNames.slice(0, trimedKeysArr.length);

  const keysColors = {};
  [...new Set(trimedKeysArr)]?.sort().map((key, index) => {
    keysColors[key] = someColors[index];
  });

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex mt-12 p-2">
        <SideControl headline={" Parameters Distribution Theories Comparison"}>
          <div className="w-[346px] shadow-xl mt-10 mx-auto rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2 overflow-y-scroll">
            <div className={sectionClass}>
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
            </div>
            <div className={sectionClass}>
              <Text md flexed weight="bold">
                Parameters
                <FilterExplanation tooltip="few more words about Paradigm " />
              </Text>
              <TagsSelect
                options={parametersOptions}
                value={selected}
                onChange={setSelected}
              />
            </div>
            <div className={sectionClass}>
              <Text md weight={"bold"}>
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
            <div className={sectionClass}>
              <Text md weight={"bold"}>
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
            <div className={sectionClass}>
              <Text weight={"bold"} md>
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
            <Spacer height={10} />
            <Text md weight={"bold"}>
              Interpretation
            </Text>
            <div className="flex justify-center items-center gap-3 mt-3">
              <Text>Challenges</Text>
              <Toggle
                checked={interpretation}
                setChecked={() => setInterpretation(!interpretation)}
              />
              <Text>Pro</Text>
            </div>{" "}
            <Spacer height={200} />
          </div>
        </SideControl>

        {/* <div className="graph relative w-full mx-auto"> */}
        {/* <div className=" funny-leggend mt-28 flex flex-col gap-3 absolute 2xl:mt-8 2xl:top-20 2xl:left-1/2 transform 2xl:-translate-x-1/2  z-10">
            {Object.keys(keysColors)?.map((key) => (
              <div
                className=" p-1 w-28 flex justify-center items-center border"
                style={{ backgroundColor: keysColors[key] }}>
                <Text sm color="black" center>
                  {key}
                </Text>
              </div>
            ))}
          </div> */}
        <div
          className="four-wheels ml-20 2xl:max-w-[1200px] 2xl:mx-auto "
          style={{ marginLeft: sideWidth }}>
          {isLoading ? (
            <Spinner />
          ) : (
            keysColors &&
            chartsData.map((chart) => (
              <Plot
                data={[
                  {
                    direction: "clockwise",
                    values: chart.series.map((row) => row.value),
                    labels: chart.series.map((row) => row.key),
                    type: "pie",
                    textinfo: "label+number",
                    textposition: "inside",
                    hole: 0.4,
                    marker: {
                      colors: chart.series.map((row) => keysColors[row.key]),
                      line: { width: 1, color: "white" },
                    },
                  },
                ]}
                layout={{
                  width: 600,
                  height: 600,
                  showlegend: false,
                  margin: { r: 100, l: 100 },
                  annotations: [
                    {
                      text:
                        breakHeadlines(chart.series_name, 11) +
                        " <br />" +
                        " = " +
                        chart.value,
                      showarrow: false,

                      style: { whiteSpace: "pre-wrap" },
                      font: {
                        size: 16,
                      },
                    },
                  ],
                }}
              />
            ))
          )}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
