import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  footerHeight,
  isMoblile,
  navHeight,
  uncontrastParametersOptions,
  plotConfig,
  screenWidth,
  sideSectionClass,
  sideWidth,
} from "../../../Utils/HardCoded";
import {
  CSV,
  TooltipExplanation,
  RangeInput,
  Reset,
  SideControl,
  Text,
  TopGraphText,
} from "../../../sharedComponents/Reusble";
import getExperimentsGraphs from "../../../apiHooks/getExperimentsGraphs";

import Spinner from "../../../sharedComponents/Spinner";
import {
  breakLongLines,
  rawTextToShow,
  buildUrl,
  fixTrueToYes,
} from "../../../Utils/functions";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { designerColors } from "../../../Utils/Colors";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function ParametersDistributionExperimentsComparison() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();

  const navigate = useNavigate();
  const pageName = "experiments-comparison";
  const sizeProportionsForPlot = 3;
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      "parameters_distribution_experiments_comparison",
      "uncontrast",
      selected?.value,
      experimentsNum,
    ],
    queryFn: () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_experiments_comparison",
        breakdown: selected?.value,
        min_number_of_experiments: experimentsNum,
        isUncontrast: true,
      }),
    enabled: Boolean(selected?.value),
  });

  const chartsData = data?.data;

  chartsData?.map((pie) =>
    pie.series.forEach((element) => {
      element.key === "True"
        ? (element.key = "Yes")
        : element.key === "False"
        ? (element.key = "No")
        : null;
    })
  );
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
  const keysColors = {};
  [...new Set(trimedKeysArr)]?.map((key, index) => {
    keysColors[key] = someColors[index];
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    if (queryParams.get("breakdown")) {
      setSelected({
        value: queryParams.get("breakdown"),
        label: rawTextToShow(queryParams.get("breakdown")),
      });
    } else {
      setSelected(uncontrastParametersOptions[0]);
    }

    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  return (
    <PageTemplate
      control={
        <SideControl headline={"Experiments Comparison"}>
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
              options={uncontrastParametersOptions}
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

          <div className="w-full flex items-center justify-between my-4">
            <CSV data={data} />
            <Reset pageName={pageName} />
          </div>
        </SideControl>
      }
      graph={
        <div style={{ height: `calc(100% - ${navHeight + footerHeight}px)` }}>
          <TopGraphText
            text={graphsHeaders["Experiments Comparison"].figureText}
            firstLine={graphsHeaders["Experiments Comparison"].figureLine}
          />
          <div className="four-wheels ">
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
                    width: isMoblile
                      ? screenWidth
                      : (screenWidth - sideWidth) / sizeProportionsForPlot,
                    height: isMoblile
                      ? screenWidth
                      : (screenWidth - sideWidth) / sizeProportionsForPlot,
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
                    margin: {
                      l: 15, // Remove left margin
                      r: 15, // Remove right margin
                      t: 15, // Remove top margin
                      b: 15, // Remove bottom margin
                    },
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
