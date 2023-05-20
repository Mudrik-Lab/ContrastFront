import { useQuery } from "@tanstack/react-query";
import React from "react";
import { isMoblile, screenHeight, screenWidth } from "../../Utils/HardCoded";
import {
  FilterExplanation,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import Toggle from "../../components/Toggle";
import Spinner from "../../components/Spinner";
import { rawTeaxtToShow } from "../../Utils/functions";
import PageTemplate from "../../components/PageTemplate";
import { designerColors } from "../../Utils/Colors";

export default function TheoryDriven() {
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [interpretation, setInterpretation] = React.useState(true);

  const { data, isLoading } = useQuery(
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
  const values2 = [];
  const labels2 = [];
  const cleanLabels2 = [];

  data?.data.map((x, index) => {
    values1.push(x.value);
    labels1.push(x.series_name);
    x.series.map((y) => {
      values2.push(y.value);
      labels2.push(`<span id=${index} >` + y.key + "</span>");
      cleanLabels2.push(y.key);
    });
  });

  const chartsData = data?.data;
  const keysArr = [];
  chartsData?.map((theory) =>
    theory.series.map((row) => keysArr.push(row.key))
  );
  const trimedKeysArr = [...new Set(keysArr)];

  const someColors = designerColors.slice(0, trimedKeysArr.length);

  const keysColors = {};
  [...new Set(trimedKeysArr)]?.sort().map((key, index) => {
    keysColors[key] = someColors[index];
  });

  return (
    <PageTemplate
      control={
        <SideControl headline="Theory Driven Distribution Pie">
          <Text md weight="bold">
            Axis Controls
          </Text>
          <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />

          <TypeOfConsciousnessFilter
            checked={consciousness}
            setChecked={setConsciousness}
          />
          <ReportFilter checked={reporting} setChecked={setReporting} />
          <TheoryDrivenFilter
            checked={theoryDriven}
            setChecked={setTheoryDriven}
          />

          <div className="flex justify-center items-center gap-3 mt-3">
            <Text>Challenges</Text>
            <Toggle
              checked={interpretation}
              setChecked={() => setInterpretation(!interpretation)}
            />
            <Text>Supports</Text>
          </div>
          <FilterExplanation
            text="Interpretation"
            tooltip="You can choose to filter the results by experiments that support at least one theory, or challenge at least one theory. "
          />
        </SideControl>
      }
      graph={
        <div>
          <TopGraphText
            firstLine={
              "The graph depicts the cumulative distribution of experiments according to the selected parameter values over time."
            }
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <Plot
              data={[
                {
                  direction: "clockwise",
                  insidetextorientation: "radial",
                  values: values1,
                  labels: labels1.map((label) => rawTeaxtToShow(label)),
                  type: "pie",
                  textinfo: "label+number",
                  textposition: "inside",
                  domain: { x: [0.5, 0.5], y: [0.2, 0.8] },
                  marker: {
                    colors: designerColors.slice(28, 31),
                    line: { width: 1, color: "white" },
                  },
                },
                {
                  direction: "clockwise",
                  insidetextorientation: "tangential",
                  values: values2,
                  labels: labels2,
                  sort: false,
                  type: "pie",
                  textinfo: "label+value",
                  hole: 0.6,
                  textposition: "inside",
                  domain: { x: [1, 1], y: [1, 1] },
                  marker: {
                    colors: cleanLabels2.map((label) => keysColors[label]),
                    line: { width: 1, color: "white" },
                  },
                },
              ]}
              layout={{
                width: isMoblile ? screenWidth : screenWidth - 400,
                height: isMoblile ? screenWidth : screenHeight - 200,
                showlegend: false,
                font: { size: 20 },
              }}
            />
          )}
        </div>
      }
    />
  );
}
