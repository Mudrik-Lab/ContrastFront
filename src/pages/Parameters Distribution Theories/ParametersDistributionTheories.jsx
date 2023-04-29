import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import getConfuguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import {
  breakdownsShorts,
  paradigmsColors,
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

export default function ParametersDistributionTheories() {
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
    getConfuguration
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

  isSuccess && console.log(data);

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
                    // insidetextorientation: "radial",
                    marker: {
                      colors: paradigmsColors,
                      line: { width: 1, color: "white" },
                    },
                  },
                ]}
                layout={{
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
        {/* <Plot
        data={[
          {
            type: "sunburst",
            labels: [
              "Global Workspace0",
              "First Order & Predictive Processing0",
              "Integrated Information0",
              "Higher Order Thought0",
              "Global Workspace1",
              "First Order & Predictive Processing1",
              "Integrated Information1",
              "Integrated Information2",
              "Global Workspace2",
              "First Order & Predictive Processing2",
              "First Order & Predictive Processing3",
              "Integrated Information3",
              "Global Workspace3",
              "Higher Order Thought3",
              "Global Workspace4",
              "First Order & Predictive Processing4",
              "Integrated Information4",
              "Higher Order Thought4",
              "Global Workspace5",
              "Integrated Information5",
              "First Order & Predictive Processing5",
              "Global Workspace6",
              "First Order & Predictive Processing6",
              "Integrated Information6",
              "Global Workspace7",
              "First Order & Predictive Processing7",
              "Higher Order Thought7",
              "Integrated Information7",
              "Global Workspace8",
              "First Order & Predictive Processing8",
              "Integrated Information8",
              "First Order & Predictive Processing9",
              "Global Workspace9",
              "Integrated Information9",
              "Global Workspace10",
              "Integrated Information10",
              "First Order & Predictive Processing10",
              "Global Workspace11",
              "Integrated Information11",
              "First Order & Predictive Processing12",
              "Global Workspace12",
              "Integrated Information12",
              "Global Workspace13",
              "Integrated Information13",
              "Integrated Information14",
            ],
            parents: [
              "Stimulus Degradation",
              "Stimulus Degradation",
              "Stimulus Degradation",
              "Stimulus Degradation",
              "Masking",
              "Masking",
              "Masking",
              "Anesthesia",
              "Anesthesia",
              "Anesthesia",
              "Direct Stimulation",
              "Direct Stimulation",
              "Direct Stimulation",
              "Direct Stimulation",
              "Attentional Manipulation",
              "Attentional Manipulation",
              "Attentional Manipulation",
              "Attentional Manipulation",
              "Disorders of Consciousness",
              "Disorders of Consciousness",
              "Disorders of Consciousness",
              "Expectation",
              "Expectation",
              "Expectation",
              "Abnormal Contents of Consciousness",
              "Abnormal Contents of Consciousness",
              "Abnormal Contents of Consciousness",
              "Abnormal Contents of Consciousness",
              "Competition (Binocular)",
              "Competition (Binocular)",
              "Competition (Binocular)",
              "Illusions",
              "Illusions",
              "Illusions",
              "Cognitive Tasks",
              "Cognitive Tasks",
              "Cognitive Tasks",
              "Familiarity",
              "Familiarity",
              "Sedation",
              "Sedation",
              "Sedation",
              "Case Study",
              "Case Study",
              "Psychedelic Drugs",
            ],
            textinfo: "label+number",
            ids: values2,
            outsidetextfont: { size: 20, color: "#377eb8" },
            leaf: { opacity: 0.4 },
            marker: { line: { width: 2 } },
          },
        ]}
        layout={{
          width: 1000,
          height: 600,
          title: "Two-Layer Pie Chart",
        }}
      /> */}
      </div>
    </div>
  );
}
