import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import {
  breakdownsShorts,
  colorsArray,
  parametersColors,
  tagsOptions,
} from "../../components/HardCoded";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  Spacer,
  Text,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import Toggle from "../../components/Toggle";
import Spinner from "../../components/Spinner";

export default function ParametersDistributionTheoriesComparison() {
  const [selected, setSelected] = React.useState(tagsOptions[0]);
  const [selectedParent, setSelectedParent] = React.useState({
    value: "Global Workspace",
    label: "Global Workspace",
  });
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [interpretation, setInterpretation] = useState(true);

  const { data: configuration, isSuccess: configurationSuccess } = useQuery(
    [`parameters_distribution_theories_comparison`],
    getConfiguration
  );
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
  chartsData?.map((chart) => {
    chart.series.forEach((row) => (row.color = parametersColors[row.key]));
  });

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  const screenWidth = window.screen.availWidth;
  return (
    <div>
      <Navbar />
      <div className="flex mt-12">
        <div className="side-filter-box p-2 pt-10 flex flex-col items-center ">
          <Text center size={28} weight="bold" color="blue">
            Parameters Distribution Theories Comparison
          </Text>
          <div className="w-[346px] shadow-xl mt-10 mx-auto rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2 ">
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
              <Text md weight="bold">
                Theory
              </Text>

              <TagsSelect
                options={tagsOptions}
                value={selected}
                onChange={setSelected}
              />

              <FilterExplanation
                text="Paradigm "
                tooltip="few more words about Paradigm "
              />
            </div>
            <div className={sectionClass}>
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
            <div className={sectionClass}>
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
            <div className={sectionClass}>
              <Text md>Theory Driven</Text>
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
            <Text md weight={"light"}>
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
            <Spacer height={10} />
          </div>
        </div>

        <div className=" relative">
          <div className="funny-leggend flex flex-col gap-3 absolute top-36 left-[585px] z-10">
            {Object.keys(parametersColors).map((name) => (
              <div
                className="h-16 w-32 flex justify-center items-center "
                style={{ backgroundColor: parametersColors[name] }}>
                <Text sm color="white" center>
                  {name}
                </Text>
              </div>
            ))}
          </div>
          <div className="mx-auto  ">
            {isLoading ? (
              <Spinner />
            ) : (
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
                        colors: chart.series.map((row) => row.color),
                        line: { width: 1, color: "white" },
                      },
                    },
                  ]}
                  layout={{
                    colorway: Object.values(parametersColors),
                    width: 650,
                    height: 650,
                    showlegend: false,
                    margin: { r: 100, l: 100 },
                    annotations: [
                      {
                        text:
                          chart.series_name + " <br />" + " = " + chart.value,
                        showarrow: false,
                        bgcolor: "#ffffff",
                        opacity: 0.8,
                        style: { whiteSpace: "pre-wrap" },
                        font: {
                          size: 18,
                        },
                        x: 0.5,
                        y: 0.5,
                      },
                    ],
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
