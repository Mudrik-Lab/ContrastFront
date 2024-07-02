import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  CSV,
  RangeInput,
  Reset,
  SideControl,
  Text,
  TooltipExplanation,
  TopGraphText,
} from "../../../sharedComponents/Reusble";
import {
  continuousBreakdownOptions,
  footerHeight,
  isMoblile,
  plotConfig,
  screenHeight,
  screenWidth,
  sideSectionClass,
  sideWidth,
} from "../../../Utils/HardCoded";
import Spinner from "../../../sharedComponents/Spinner";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { buildUrl, rawTextToShow } from "../../../Utils/functions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import NoResults from "../../../sharedComponents/NoResults";
import Plot from "react-plotly.js";

import getEffectsDistribution from "../../../apiHooks/getEffectsDistribution";

export default function EffectsDistributionLines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [binSize, setBinSize] = React.useState();
  const navigate = useNavigate();
  const pageName = "distribution-of-Experiments-across-parameters";

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      "distribution_of_effects_across_parameters",
      experimentsNum,
      binSize,
      selected?.value || continuousBreakdownOptions[0].value,
    ],
    queryFn: () =>
      getEffectsDistribution({
        min_number_of_experiments: experimentsNum,
        binSize,
        continuous_breakdown:
          selected?.value || continuousBreakdownOptions[0].value,
        isUncontrast: true,
      }),
  });

  const colors = { Positive: "#159DEA", Mixed: "#088515", Negative: "#CA535A" };
  const graphsData = [];
  data?.data.forEach((row) => {
    graphsData.push(
      {
        x: row.series.map((a) => parseInt(a.key)),
        y: row.series.map((a) => a.value),
        name: rawTextToShow(row.series_name),
        autobinx: false,
        histnorm: "count",
        marker: {
          color: colors[row.series_name],
        },
        opacity: 0.5,
        xbins: { start: 0, size: binSize },
        type: "bar",
      }
      // {
      //   x: row.series.map((a) => a.key),
      //   y: row.series.map((a) => a.value),
      //   name: rawTextToShow(row.series_name),
      //   autobinx: false,
      //   histnorm: "count",
      //   line: {
      //     shape: "spline", // Set the line shape to 'spline' for smooth curves
      //     color: colors[row.series_name],
      //   },
      //   opacity: 0.5,
      //   type: "scatter",
      //   mode: "lines",
      // }
    );
  });
  console.log(graphsData);
  let flatedY = [];
  let highestY;
  if (data) {
    flatedY = data?.data
      .map((row) => row.series.map((item) => item.value))
      .flat();
    highestY = Math.max(...flatedY);
  }
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    queryParams.get("bin_size")
      ? setBinSize(queryParams.get("bin_size"))
      : setBinSize(1);

    if (queryParams.get("breakdown")) {
      setSelected({
        value: queryParams.get("breakdown"),
        label: rawTextToShow(queryParams.get("breakdown")),
      });
    } else {
      setSelected(continuousBreakdownOptions[0]);
    }

    navigate({ search: queryParams.toString() });
  }, [searchParams]);
  return (
    <div>
      <PageTemplate
        control={
          <SideControl
            headline={"Distribution of Experiments Across Parameter"}>
            <Text color="blue" weight="bold" className="text-3xl"></Text>

            <Text weight="bold" lg>
              Axis Controls
            </Text>
            <div className="w-full py-5 flex flex-col items-center gap-3 ">
              <RangeInput
                number={experimentsNum}
                setNumber={(e) => {
                  buildUrl(pageName, "min_number_of_experiments", e, navigate);
                }}
              />
            </div>

            <div className={sideSectionClass}>
              <Select
                className="text-lg w-[300px]"
                aria-label="parameter of interest"
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable={false}
                options={continuousBreakdownOptions}
                value={selected}
                onChange={(e) => {
                  buildUrl(pageName, "breakdown", e.value, navigate);
                }}
              />

              <TooltipExplanation
                text={"Parameter of interest"}
                tooltip="Choose the dependent variable to be queried."
              />
            </div>

            <div className="w-full py-5 flex flex-col items-center gap-3 ">
              <RangeInput
                isBinSize={true}
                number={binSize}
                setNumber={(e) => {
                  buildUrl(pageName, "bin_size", e, navigate);
                }}
              />
            </div>

            <div className="w-full flex items-center justify-between my-4">
              <CSV data={data} />
              <Reset pageName={pageName} />
            </div>
          </SideControl>
        }
        graph={
          <div className="h-full">
            <TopGraphText
              text={
                graphsHeaders["Distribution of Experiments Across Parameter"]
                  .figureText
              }
              firstLine={
                graphsHeaders["Distribution of Experiments Across Parameter"]
                  .figureLine
              }
            />
            {isLoading ? (
              <Spinner />
            ) : graphsData.length ? (
              <Plot
                data={graphsData}
                config={plotConfig}
                layout={{
                  bargap: 0.02,
                  bargroupgap: 0.02,
                  barmode: "overlay",
                  xaxis: {
                    title: "Range",
                  },
                  yaxis: {
                    title: "Number of experiments",
                    tickmode: "linear",
                    dtick: highestY > 10 ? 10 : 1,
                  },
                  autosize: false, // Use true to let Plotly automatically size the plot
                  showlegend: !isMoblile,
                  legend: {
                    x: 10,
                    xanchor: "left",
                    y: 1,
                    font: {
                      size: 16,
                      color: "#000000",
                    },
                  },
                  hoverlabel: {
                    namelength: 40,
                    font: {
                      family: "Arial",
                      size: 12,
                      color: "#FFFFFF",
                    },
                  },
                  width: screenWidth,
                  height: screenHeight - footerHeight,
                }}
              />
            ) : (
              <NoResults />
            )}
          </div>
        }
      />
    </div>
  );
}
