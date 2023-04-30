import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import {
  breakdownsShorts,
  paradigmsColors,
  parametersColors,
  tagsOptions,
} from "../../components/HardCoded";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  Text,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import Toggle from "../../components/Toggle";

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
  const { data, isSuccess } = useQuery(
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

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div>
      <Navbar />
      <div className="flex mt-12">
        <div className="side-filter-box border p-7 pt-10 flex flex-col items-center ">
          <Text center size={28} weight="bold" color="blue">
            Parameters Distribution Theories Comparison
          </Text>
          <div className="w-[346px] shadow-lg mt-10 mx-auto bg-white flex flex-col items-center gap-2 px-4 py-2 ">
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
            <div className={sectionClass}>
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
              </div>
            </div>
          </div>
        </div>

        <div className="pl-12 flex flex-wrap">
          {isSuccess &&
            data.data.map((chart) => (
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
                      colors: Object.values(parametersColors),
                      line: { width: 1, color: "white" },
                    },
                  },
                ]}
                layout={{
                  colorway: Object.values(parametersColors),
                  width: 600,
                  height: 600,
                  showlegend: false,
                  annotations: [
                    {
                      text:
                        breakdownsShorts[chart.series_name] +
                        " = " +
                        chart.value,
                      showarrow: false,
                      font: {
                        size: 20,
                      },
                      x: 0.5,
                      y: 0.5,
                    },
                  ],
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
