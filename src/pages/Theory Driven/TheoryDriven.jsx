import { useQuery } from "@tanstack/react-query";
import React from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
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

export default function TheoryDriven() {
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [interpretation, setInterpretation] = React.useState(true);

  const { data, isSuccess } = useQuery(
    [
      `theory_driven_distribution_pie${
        +" " +
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
        graphName: "theory_driven_distribution_pie",
        is_reporting: reporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
        interpretation: interpretation ? "pro" : "challenges",
      })
  );

  const values1 = [];
  const labels1 = [];
  const outsideColors = [];
  const values2 = [];
  const labels2 = [];

  data?.data.map((x, index) => {
    values1.push(x.value);
    labels1.push(x.series_name);
    x.series.map((y) => {
      values2.push(y.value);
      labels2.push(breakdownsShorts[y.key] + index);
      outsideColors.push(paradigmsColors[index]?.slice(0, -2) + "0.7)");
    });
  });

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div>
      <Navbar />
      <div className="flex mt-12">
        <div className="side-filter-box border p-7 pt-10 flex flex-col items-center ">
          <Text size={28} weight="bold" color="blue" center>
            Parameters Distribution Pie
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

        <div className="pl-12"></div>
        <Plot
          data={[
            {
              direction: "clockwise",
              values: values1,
              labels: labels1,
              type: "pie",
              textinfo: "label+number",
              textposition: "inside",
              domain: { x: [0, 1], y: [0.125, 0.875] },
              marker: {
                colors: paradigmsColors,
                line: { width: 1, color: "white" },
              },
            },
            {
              direction: "clockwise",
              values: values2,
              labels: labels2,
              sort: false,
              type: "pie",
              textinfo: "label+value",
              hole: 0.75,
              textposition: "inside",
              domain: { x: [0, 1], y: [0, 1] },
              marker: {
                line: { width: 1, color: "white" },
              },
            },
          ]}
          layout={{
            width: 1500,
            height: 1000,
            showlegend: false,

            annotations: [{ showarrow: false, text: "" }],
          }}
        />
      </div>
    </div>
  );
}
