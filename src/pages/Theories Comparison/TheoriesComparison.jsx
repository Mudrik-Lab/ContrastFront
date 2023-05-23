import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  isMoblile,
  parametersOptions,
  screenWidth,
  sideSectionClass,
} from "../../Utils/HardCoded";
import {
  FilterExplanation,
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
import { breakLongLines, rawTextToShow } from "../../Utils/functions";
import PageTemplate from "../../components/PageTemplate";
import { designerColors } from "../../Utils/Colors";
import { graphsHeaders } from "../../Utils/GraphsDetails";

export default function ParametersDistributionTheoriesComparison() {
  const [selected, setSelected] = React.useState(parametersOptions[0]);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [interpretation, setInterpretation] = useState(false);

  const { data, isLoading } = useQuery(
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

  let someColors = designerColors.reverse().slice(0, trimedKeysArr.length);
  if (selected.value === "paradigm") {
    someColors = designerColors.slice(0, trimedKeysArr.length);
  }

  const keysColors = {};
  [...new Set(trimedKeysArr)]?.sort().map((key, index) => {
    keysColors[key] = someColors[index];
  });

  return (
    <PageTemplate
      control={
        <SideControl headline={"Theories Comparison"}>
          <Text md weight="bold">
            Axis Controls
          </Text>
          <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />
          <div className={sideSectionClass}>
            <TagsSelect
              options={parametersOptions}
              value={selected}
              onChange={setSelected}
            />
            <Text size={14} flexed>
              Parameter of interest
              <FilterExplanation tooltip="Choose the dependent variable to be queried." />
            </Text>
          </div>
          <div className={sideSectionClass}>
            <div className="flex justify-center items-center gap-3 mt-3">
              <Text>Supports</Text>
              <Toggle
                checked={interpretation}
                setChecked={() => setInterpretation(!interpretation)}
              />
              <Text>Challenges</Text>
            </div>
            <FilterExplanation
              text="Interpretation"
              tooltip="You can choose to filter the results by experiments that support at least one theory, or challenge at least one theory. "
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
        </SideControl>
      }
      graph={
        <div>
          <TopGraphText
            text={graphsHeaders[1].figureText}
            firstLine={graphsHeaders[1].figureLine}
          />
          <div
            className="four-wheels 2xl:mx-auto "
            // style={{ maxWidth: "calc(100% / 2 )" }}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              keysColors &&
              chartsData.map((chart) => (
                <Plot
                  key={chart.series_name}
                  data={[
                    {
                      direction: "clockwise",
                      insidetextorientation: "horizontal",
                      values: chart.series.map((row) => row.value),
                      labels: chart.series.map((row) =>
                        breakLongLines(rawTeaxtToShow(row.key))
                      ),
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
                  config={{ displayModeBar: !isMoblile }}
                  layout={{
                    width: isMoblile ? screenWidth : (screenWidth - 400) / 2,
                    height: isMoblile ? screenWidth : (screenWidth - 400) / 2,
                    showlegend: false,
                    annotations: [
                      {
                        text:
                          breakLongLines(chart.series_name, 11) +
                          " <br />" +
                          "N = " +
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
