import { useQuery } from "@tanstack/react-query";
import React from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import {
  colorsArray,
  designerColors,
  navHeight,
  parametersOptions,
  screenHeight,
  sideWidth,
} from "../../components/HardCoded";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  ReportFilter,
  SideControl,
  Spacer,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import { hexToRgba } from "../../Utils/functions";
import PageTemplate from "../../components/PageTemplate";

export default function ParametersDistributionPie() {
  const [selected, setSelected] = React.useState(parametersOptions[0]);
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
      outsideColors.push(
        hexToRgba(designerColors[index])?.slice(0, -2) + "0.7)"
      );
    });
  });

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";

  return (
    <PageTemplate
      control={
        <SideControl headline={" Parameters Distribution Pie"}>
          <div className={sectionClass}>
            <Text md weight="bold">
              Axis Controls
            </Text>
            <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />
            <FilterExplanation
              text="Minimum number of experiments"
              tooltip="few more words about Minimum number of experiments"
            />
          </div>

          <div className={sectionClass}>
            <Text flexed md weight="bold">
              Parameters
              <FilterExplanation tooltip="few more words about Paradigm " />
            </Text>
            <TagsSelect
              options={parametersOptions}
              value={selected}
              onChange={setSelected}
            />
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
      }
      graph={
        <div>
          <TopGraphText
            firstLine={
              "The inner circle of the pie chart depicts the distribution of different parameters acorss theories, The outer circle describes the distribution of each inner slice to theories."
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
                  values: values1,
                  labels: labels1,
                  type: "pie",
                  textinfo: "label+number",
                  textposition: "inside",
                  insidetextorientation: "radial",
                  hole: 0.1,
                  domain: { x: [0, 1], y: [0.125, 0.875] },
                  marker: {
                    colors: designerColors,
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
      }
    />
  );
}
