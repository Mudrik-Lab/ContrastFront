import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  footerHeight,
  isMoblile,
  navHeight,
  parametersOptions,
  plotConfig,
  screenWidth,
  sideSectionClass,
} from "../../Utils/HardCoded";
import {
  CSV,
  TooltipExplanation,
  RangeInput,
  ReportFilter,
  Reset,
  SideControl,
  Spacer,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";

import Toggle from "../../components/Toggle";
import Spinner from "../../components/Spinner";
import { breakLongLines, rawTextToShow, buildUrl } from "../../Utils/functions";
import PageTemplate from "../../components/PageTemplate";
import { designerColors } from "../../Utils/Colors";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoResults from "../../components/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function ParametersDistributionTheoriesComparison() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [interpretation, setInterpretation] = useState();

  const navigate = useNavigate();
  const pageName = "theories-comparison";

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      "parameters_distribution_theories_comparison",
      selected?.value,
      consciousness,
      reporting,
      experimentsNum,
      theoryDriven,
      interpretation === "true" ? "challenges" : "pro",
    ],
    queryFn: () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_theories_comparison",
        breakdown: selected?.value,
        is_reporting: reporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
        interpretation: interpretation === "true" ? "challenges" : "pro",
      }),
    enabled: Boolean(selected?.value),
  });

  const chartsData = data?.data;
  const keysArr = [];
  chartsData?.map((theory) =>
    theory.series
      .sort((a, b) => {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      })
      .map((row) => keysArr.push(row.key))
  );

  const trimedKeysArr = [...new Set(keysArr)];

  let someColors = designerColors.slice(0, trimedKeysArr.length);
  if (selected?.value === "paradigm") {
    someColors = designerColors.slice(0, trimedKeysArr.length);
  }

  const keysColors = {};
  [...new Set(trimedKeysArr)]?.map((key, index) => {
    keysColors[key] = someColors[index];
  });
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("is_reporting")
      ? setReporting(queryParams.get("is_reporting"))
      : setReporting("either");

    queryParams.get("type_of_consciousness")
      ? setConsciousness(queryParams.get("type_of_consciousness"))
      : setConsciousness("either");

    queryParams.get("theory_driven")
      ? setTheoryDriven(queryParams.get("theory_driven"))
      : setTheoryDriven("either");

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    if (queryParams.get("breakdown")) {
      setSelected({
        value: queryParams.get("breakdown"),
        label: rawTextToShow(queryParams.get("breakdown")),
      });
    } else {
      setSelected(parametersOptions[0]);
    }

    if (queryParams.get("interpretation")) {
      queryParams.get("interpretation") === "true"
        ? setInterpretation(true)
        : setInterpretation(false);
      setInterpretation(queryParams.get("interpretation"));
    } else {
      setInterpretation(true);
    }

    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  return (
    <PageTemplate
      control={
        <SideControl headline={"Theories Comparison"}>
          <Text lg weight="bold">
            Axis Controls
          </Text>

          <RangeInput
            number={experimentsNum}
            setNumber={(e) => {
              buildUrl(pageName, "min_number_of_experiments", e, navigate);
            }}
          />

          <div className={sideSectionClass}>
            <Select
              className="text-lg w-[300px]"
              closeMenuOnSelect={true}
              isMulti={false}
              isClearable={false}
              options={parametersOptions}
              value={selected}
              aria-label=" Parameter of interest"
              onChange={(e) => {
                buildUrl(pageName, "breakdown", e.value, navigate);
              }}
            />
            <TooltipExplanation
              text={"Parameter of interest"}
              tooltip="Choose the dependent variable to be queried."
            />
          </div>
          <div className={sideSectionClass}>
            <div className="flex justify-center items-center gap-3 mt-3">
              <Text>Supports</Text>
              <Toggle
                checked={interpretation === "true" ? true : false}
                setChecked={(e) => {
                  console.log(e);
                  buildUrl(pageName, "interpretation", e, navigate);
                }}
              />
              <Text>Challenges</Text>
            </div>
            <TooltipExplanation
              text="Interpretation"
              tooltip="You can choose to filter the results by experiments that support at least one theory, or challenge at least one theory. "
            />
          </div>
          <TypeOfConsciousnessFilter
            checked={consciousness}
            setChecked={(e) => {
              buildUrl(pageName, "type_of_consciousness", e, navigate);
            }}
          />
          <ReportFilter
            checked={reporting}
            setChecked={(e) => {
              buildUrl(pageName, "is_reporting", e, navigate);
            }}
          />
          <TheoryDrivenFilter
            checked={theoryDriven}
            setChecked={(e) => {
              buildUrl(pageName, "theory_driven", e, navigate);
            }}
          />
          <div className="w-full flex items-center justify-between my-4">
            <CSV data={data} />
            <Reset pageName={pageName} />
          </div>
        </SideControl>
      }
      graph={
        <div style={{ height: `calc(100% - ${navHeight + footerHeight}px)` }}>
          <TopGraphText
            text={graphsHeaders[2].figureText}
            firstLine={graphsHeaders[2].figureLine}
          />
          <div className="four-wheels mx-auto max-w-[1800px] h-full ">
            {isLoading ? (
              <Spinner />
            ) : keysColors && isSuccess && chartsData.length ? (
              chartsData?.map((chart) => (
                <Plot
                  key={chart.series_name}
                  data={[
                    {
                      direction: "clockwise",
                      insidetextorientation: "horizontal",
                      values: chart.series.map((row) => row.value),
                      labels: chart.series.map((row) =>
                        breakLongLines(rawTextToShow(row.key))
                      ),
                      type: "pie",
                      hovertemplate: "%{label}: %{value} <extra></extra>",
                      textinfo: "label+number",
                      textposition: "inside",
                      hole: 0.4,
                      marker: {
                        colors: chart.series.map((row) => keysColors[row.key]),
                        line: { width: 1, color: "white" },
                      },
                    },
                  ]}
                  config={plotConfig}
                  layout={{
                    width: isMoblile ? screenWidth : screenWidth / 3,
                    height: isMoblile ? screenWidth : screenWidth / 3,
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
            ) : (
              <NoResults />
            )}
          </div>
        </div>
      }
    />
  );
}
