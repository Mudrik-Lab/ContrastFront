import { useQuery } from "@tanstack/react-query";
import React from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import {
  colorsArray,
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
                  labels: labels1,
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
                  hole: 0.75,
                  textposition: "inside",
                  domain: { x: [0, 1], y: [0, 1] },
                  marker: {
                    colors: "Reds",
                    line: { width: 1, color: "white" },
                  },
                },
              ]}
              layout={{
                width: screenWidth,
                height: screenHeight - navHeight,
                showlegend: false,
                margin: { l: 150 },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
