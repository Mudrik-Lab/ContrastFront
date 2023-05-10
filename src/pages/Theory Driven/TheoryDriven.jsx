import { useQuery } from "@tanstack/react-query";
import React from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import {
  colorsArray,
  colorsNames,
  navHeight,
  screenHeight,
  screenWidth,
  sideWidth,
} from "../../components/HardCoded";
import {
  RadioInput,
  RangeInput,
  ReportFilter,
  SideControl,
  Spacer,
  Text,
  TheoryDrivenFilter,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import Toggle from "../../components/Toggle";
import Spinner from "../../components/Spinner";
import { ToggleSwitch } from "flowbite-react";
import { rawTeaxtToShow } from "../../Utils/functions";

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
  const outsideColors = [];
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
      outsideColors.push(colorsArray[index]?.slice(0, -2) + "0.7)");
    });
  });

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
  console.log(cleanLabels2);
  return (
    <div>
      <Navbar />

      <div className="flex mt-12 p-2 ">
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
          <Text weight={"bold"} md>
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
        </SideControl>
        <div>
          {isLoading ? (
            <Spinner />
          ) : (
            <Plot
              data={[
                {
                  direction: "clockwise",
                  values: values1,
                  labels: labels1.map((label) => rawTeaxtToShow(label)),
                  type: "pie",
                  textinfo: "label+number",
                  textposition: "inside",
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
                  hole: 0.65,
                  textposition: "inside",
                  domain: { x: [0, 1], y: [0, 1] },
                  marker: {
                    colors: cleanLabels2.map((label) => keysColors[label]),
                    line: { width: 1, color: "white" },
                  },
                },
              ]}
              layout={{
                width: screenWidth,
                height: screenHeight - navHeight,
                showlegend: false,
                font: { size: 20 },
                margin: { l: sideWidth },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
