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
  navHeight,
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
import getEffectsDistribution from "../../../apiHooks/getEffectsDistribution";

import Plot from "react-plotly.js";

export default function EffectsDistributionLines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [binSize, setBinSize] = React.useState(
    searchParams.get("bin_size") || 50
  );
  const navigate = useNavigate();
  const pageName = "distribution-of-Experiments-across-parameters";

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      "distribution_of_effects_across_parameters",
      experimentsNum,
      selected?.value || continuousBreakdownOptions[0].value,
    ],
    queryFn: () =>
      getEffectsDistribution({
        min_number_of_experiments: experimentsNum,
        binSize: 1,
        continuous_breakdown:
          selected?.value || continuousBreakdownOptions[0].value,
        isUncontrast: true,
      }),
  });

  // Define main colors
  const colors = { Positive: "#159DEA", Mixed: "#088515", Negative: "#CA535A" };
  const textSectionAbovePlot = 130; //height of text section

  const graphsData = [];
  data?.data.forEach((row) => {
    graphsData.push({
      x: row.series.map((a) => parseInt(a.key)),
      y: row.series.map((a) => a.value),
      name: rawTextToShow(row.series_name),
      autobinx: false,
      marker: {
        color: colors[row.series_name],
      },
      opacity: 0.5, // Ensure opacity so bars can overlap
      xbins: { size: binSize },
      type: "histogram",
    });
  });

  let flatedY = [];
  let highestY;
  if (data) {
    flatedY = data?.data
      .map((row) => row.series.map((item) => item.value))
      .flat();
    highestY = Math.max(...flatedY);
  }

  // Add blended colors for overlapping bars
  const blendedColors = {
    Positive_Negative: "#7DA3CB", // Blend of Positive and Negative colors
    Positive_Mixed: "#4CB0BA", // Blend of Positive and Mixed colors
    Mixed_Negative: "#A68B72", // Blend of Mixed and Negative colors
    Mixed_Negative_Positive: "#5E94AE", // Blend of Mixed and Negative colors
  };

  Object.keys(blendedColors).forEach((key) => {
    graphsData.push({
      x: [null], // No actual data, just for legend
      y: [null],
      name: `${key.replaceAll("_", " + ")}`,
      marker: {
        color: blendedColors[key],
      },
      opacity: 1, // Full opacity for the legend
      type: "histogram",
    });
  });

  useEffect(() => {
    let breakdown = searchParams.get("breakdown");

    setBinSize(
      continuousBreakdownOptions.find((x) => x.value === breakdown)?.initialBin
    );
    buildUrl(pageName, "bin_size", binSize, navigate);
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    if (queryParams.get("bin_size")) {
      setBinSize(queryParams.get("bin_size"));
    } else {
      setBinSize(1);
    }

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const breakdown = queryParams.get("breakdown");

    if (!breakdown) {
      buildUrl(
        pageName,
        "breakdown",
        continuousBreakdownOptions[0].value,
        navigate
      );
    } else {
      setSelected(breakdown);
    }
  }, []);

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
                  const bin = continuousBreakdownOptions.find(
                    (x) => x.value === e.value
                  )?.initialBin;

                  const queryParams = new URLSearchParams(location.search);

                  queryParams.set("bin_size", bin);
                  setSearchParams(queryParams);
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
                  // barmode: isStacked? "overlay": "group",
                  barmode: "overlay",
                  xaxis: {
                    showgrid: false,
                    title: {
                      text: "Range",
                      font: { size: 28 },
                      standoff: 20,
                    },
                    zeroline: true,
                    tickfont: {
                      size: 20,
                      standoff: 50,
                    },
                  },
                  yaxis: {
                    showgrid: false,
                    title: {
                      text: "Number of experiments",
                      font: { size: 28 },
                    },
                    tickmode: "linear",
                    tickfont: {
                      size: 18,
                      standoff: 50,
                    },
                  },
                  autosize: false,
                  showlegend: !isMoblile,
                  legend: {
                    font: {
                      size: 20,
                    },
                    x: 0.9,
                    y: 1.05,
                  },
                  hoverlabel: {
                    namelength: 40,
                    font: {
                      family: "Arial",
                      size: 12,
                      color: "#FFFFFF",
                    },
                  },
                  width: screenWidth - sideWidth,
                  height: screenHeight - footerHeight - textSectionAbovePlot,
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
