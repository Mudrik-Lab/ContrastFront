import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  CSV,
  RangeInput,
  ReportFilter,
  Reset,
  SideControl,
  SignificanceFilter,
  Text,
  TooltipExplanation,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../../sharedComponents/Reusble";
import {
  isMoblile,
  plotConfig,
  screenHeight,
  screenWidth,
  sideSectionClass,
} from "../../../Utils/HardCoded";
import Spinner from "../../../sharedComponents/Spinner";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { buildUrl, rawTextToShow } from "../../../Utils/functions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import getEffectsDistribution from "../../../apiHooks/getEffectsDistribution";
import { designerColors } from "../../../Utils/Colors";

const Plot = createPlotlyComponent(Plotly);

export default function EffectsDistributionLines() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [significance, setSignificance] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [binSize, setBinSize] = React.useState(10);
  const navigate = useNavigate();
  const pageName = "distribution-of-effects-across-parameters";
  const continuousBreakdownOptions = [
    { value: "number_of_stimuli", label: "number_of_stimuli" },
    { value: "outcome_number_of_trials", label: "outcome_number_of_trials" },
    { value: "sample_size_excluded", label: "sample_size_excluded" },
    { value: "sample_size_included", label: "sample_size_included" },
    {
      value: "suppressed_stimuli_duration",
      label: "suppressed_stimuli_duration",
    },
    {
      value: "unconsciousness_measure_number_of_participants_in_awareness_test",
      label: "unconsciousness_measure_number_of_participants_in_awareness_test",
    },
    {
      value: "unconsciousness_measure_number_of_trials",
      label: "unconsciousness_measure_number_of_trials",
    },
  ];
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      "distribution_of_effects_across_parameters",
      significance,
      experimentsNum,
      binSize,
      selected?.value || continuousBreakdownOptions[0].value,
    ],
    queryFn: () =>
      getEffectsDistribution({
        significance,
        min_number_of_experiments: experimentsNum,
        binSize,
        continuous_breakdown:
          selected?.value || continuousBreakdownOptions[0].value,
        isUncontrast: true,
      }),
  });

  const trace1 = {
    x: data?.data[0].series.map((a) => a.key),
    y: data?.data[0].series.map((a) => a.value),
    opacity: 0.5,
    type: "bar",
    marker: { color: "red" },
  };

  const trace2 = {
    x: data?.data[1].series.map((a) => a.key),
    y: data?.data[1].series.map((a) => a.value),
    opacity: 0.5,
    type: "bar",
    marker: { color: "blue" },
  };

  const graphsData = [trace1, trace2];
  // data?.data.map((row) => {
  //   graphsData.push(
  //     {
  //       x: row.series.map((a) => a.key),
  //       y: row.series.map((a) => a.value),
  //       autobinx: false,
  //       histnorm: "count",

  //       opacity: 0.5,
  //       type: "bar",
  //       xbins: {
  //         size: 3,
  //       },
  //       name: rawTextToShow(row.series_name),
  //     },
  //     {
  //       type: "line",

  //       x: row.series.map((a) => a.key),
  //       y: row.series.map((a) => a.value),
  //     }
  //   );
  // });

  let flatedY = [];
  let highestY;
  if (data) {
    flatedY = data?.data
      .map((row) => row.series.map((item) => item.value))
      .flat();
    highestY = Math.max(...flatedY);
  }

  console.log(data?.data);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("significance")
      ? setSignificance(queryParams.get("significance"))
      : setSignificance("either");

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

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
          <SideControl headline={"Distribution of Effects Across Parameter"}>
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

            <SignificanceFilter
              checked={significance}
              setChecked={(e) => {
                buildUrl(pageName, "significance", e, navigate);
              }}
            />

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
                graphsHeaders["Distribution of Effects Across Parameter"]
                  .figureText
              }
              firstLine={
                graphsHeaders["Distribution of Effects Across Parameter"]
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
                  bargap: 0.05,
                  bargroupgap: 0.2,
                  barmode: "overlay",
                  xaxis: {
                    title: "?",
                  },
                  yaxis: {
                    title: "Number of experiments",
                    tickmode: "linear",
                    dtick: highestY > 20 ? 20 : 1,
                  },
                  autosize: false,
                  showlegend: !isMoblile,
                  legend: {
                    x: 10,
                    xanchor: "left",
                    y: 100,
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
                  height: screenHeight,
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
