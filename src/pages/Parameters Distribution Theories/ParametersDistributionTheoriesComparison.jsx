import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  designerColors,
  parametersOptions,
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
import Toggle from "../../components/Toggle";
import Spinner from "../../components/Spinner";
import { breakHeadlines } from "../../Utils/functions";
import Footer from "../../components/Footer";
import PageTemplate from "../../components/PageTemplate";

export default function ParametersDistributionTheoriesComparison() {
  const [selected, setSelected] = React.useState(parametersOptions[0]);
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
  const someColors = designerColors.reverse().slice(0, trimedKeysArr.length);

  const keysColors = {};
  [...new Set(trimedKeysArr)]?.sort().map((key, index) => {
    keysColors[key] = someColors[index];
  });
  console.log(keysColors);
  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <PageTemplate
      control={
        <SideControl headline={" Parameters Distribution Theories Comparison"}>
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
          <TypeOfConsciousnessFilter
            checked={consciousness}
            setChecked={setConsciousness}
          />
          <ReportFilter checked={reporting} setChecked={setReporting} />
          <TheoryDrivenFilter
            checked={theoryDriven}
            setChecked={setTheoryDriven}
          />
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
        </SideControl>
      }
      graph={
        <div>
          <TopGraphText
            firstLine={
              "The graph depicts the different distributions of parameters for the four theories separately."
            }
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          />
          <div className="four-wheels 2xl:mx-auto max-w-[1300px] ">
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
        </div>
      }
    />
  );
}
