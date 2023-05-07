import { useQuery } from "@tanstack/react-query";
import React from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import { colorsArray, tagsOptions } from "../../components/HardCoded";
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
import Spinner from "../../components/Spinner";

export default function ParametersDistributionPie() {
  const [selected, setSelected] = React.useState(tagsOptions[0]);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);

  const { data: configuration, isSuccess: configurationSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const { data, isLoading } = useQuery(
    [
      `parameters_distribution_pie${
        +" " +
        selected.value +
        " " +
        consciousness +
        " " +
        reporting +
        " " +
        experimentsNum +
        " " +
        theoryDriven
      }`,
    ],
    () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_pie",
        breakdown: selected.value,
        is_reporting: reporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
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
      labels2.push(`<span id=${index} >` + y.key + "</span>");
      outsideColors.push(colorsArray[index]?.slice(0, -2) + "0.7)");
    });
  });

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div>
      <Navbar />
      <div className="flex mt-12 p-2">
        <div className="side-filter-box p-2 pt-10 flex flex-col items-center ">
          <Text size={28} weight="bold" color="blue" center>
            Parameters Distribution Pie
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
            <Spacer height={10} />
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
        </div>

        <div className="pl-12">
          {isLoading ? (
            <Spinner />
          ) : (
            <Plot
              data={[
                {
                  direction: "clockwise",
                  values: values1,
                  labels: labels1,
                  type: "pie",
                  textinfo: "label+number",
                  textposition: "inside",
                  insidetextorientation: "radial",
                  hole: 0.1,
                  domain: { x: [0, 1], y: [0.125, 0.875] },
                  marker: {
                    colors: colorsArray,
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
                    colors: outsideColors,
                    line: { width: 1, color: "white" },
                  },
                },
              ]}
              layout={{
                width: 1200,
                height: 1000,
                showlegend: false,
                annotations: [{ showarrow: false, text: "" }],
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
