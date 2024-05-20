import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import {
  TooltipExplanation,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TopGraphText,
  CSV,
  Reset,
  SignificanceFilter,
} from "../../../sharedComponents/Reusble";
import getExperimentsGraphs from "../../../apiHooks/getExperimentsGraphs";
import {
  screenWidth,
  uncontrastParametersOptions,
  isMoblile,
  sideSectionClass,
  plotConfig,
} from "../../../Utils/HardCoded";
import Spinner from "../../../sharedComponents/Spinner";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { designerColors } from "../../../Utils/Colors";
import Toggle from "../../../sharedComponents/Toggle";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrl, rawTextToShow } from "../../../Utils/functions";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function ParametersDistributionBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState();
  const [significance, setSignificance] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [isStacked, setIsStacked] = React.useState(true);
  const [isCsv, setIsCsv] = React.useState(false);

  const navigate = useNavigate();
  const pageName = "parameter-distribution-bar";

  const { data, isLoading } = useQuery({
    queryKey: [
      `parameters_distribution_bar`,
      "uncontrast",
      selected?.value,
      experimentsNum,
      isCsv,
      significance,
    ],
    queryFn: () => {
      return getExperimentsGraphs({
        graphName: "parameters_distribution_bar",
        breakdown: selected?.value,
        min_number_of_experiments: experimentsNum,
        is_csv: isCsv,
        isUncontrast: true,
        significance,
      });
    },
    enabled: Boolean(selected?.value),
  });
  const X1 = data?.data?.map((row) => row.series[0].value).reverse();

  const Y = data?.data?.map((row) => rawTextToShow(row.series_name)).reverse();

  const X2 = data?.data?.map((row) => row.series[1]?.value || 0).reverse();

  var trace1 = {
    x: X1,
    y: Y,
    text: X1,
    name: "Supports",
    hoverinfo: "none",
    orientation: "h",
    insidetextanchor: "middle",
    textfont: {
      size: 18,
      color: "white",
    },
    marker: {
      color: designerColors[25],
      width: 100,
      text: {
        font: {
          weight: "bold",
        },
      },
    },
    type: "bar",
  };
  var trace2 = {
    x: X2,
    y: Y,
    hoverinfo: "none", //turn off the tooltip when hover the bars
    text: X2,
    name: "Challenges",
    orientation: "h",
    insidetextanchor: "middle",
    textfont: {
      size: 18,
      color: "white",
    },
    marker: {
      color: designerColors[22],
      width: 100,
    },
    type: "bar",
  };

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
      setSelected(uncontrastParametersOptions[0]);
    }

    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  return (
    <div>
      <PageTemplate
        control={
          <SideControl headline={" Parameters Distribution Bar"}>
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
                aria-label="parameter of interest"
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable={false}
                options={uncontrastParametersOptions}
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

            <div className={sideSectionClass}>
              <div className="flex gap-2 mt-4">
                <Text>Side by side</Text>
                <Toggle
                  checked={isStacked}
                  setChecked={() => setIsStacked(!isStacked)}
                />
                <Text>Stacked</Text>
                <TooltipExplanation
                  text=""
                  tooltip="You can choose how to display the comparison between experiments supporting (blue bars) vs. challenging (red bars) the chosen theory family. Choosing “stacked’ will show the distribution of the experiments challenging the chosen theory family on top of the ones supporting it. While choosing “side by side” will show them one next to the other."
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-between my-4">
              <div className="w-full flex items-center justify-between my-4">
                <CSV data={data} />
                <Reset pageName={pageName} />
              </div>
            </div>
          </SideControl>
        }
        graph={
          <div>
            <TopGraphText
              text={graphsHeaders["Parameter Distribution Bar"].figureText}
              firstLine={graphsHeaders["Parameter Distribution Bar"].figureLine}
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <div id="graphDiv">
                <Plot
                  data={[trace1, trace2]}
                  config={plotConfig}
                  layout={{
                    barmode: isStacked ? "stack" : "group",
                    width: isMoblile ? screenWidth : screenWidth - 400,
                    height: 35 * Y?.length + 350,
                    margin: { autoexpand: true, l: isMoblile ? 20 : 200 },
                    legend: { itemwidth: 90, x: -0.25, y: 1.05 },

                    xaxis: {
                      title: "Number of experiments",
                      zeroline: true,
                      side: "top",
                      tickmode: "linear",
                      dtick: 10,
                      tickfont: {
                        size: 16,
                        standoff: 50,
                      },
                    },
                    yaxis: {
                      showticklabels: !isMoblile,
                      automargin: true,
                      ticks: "outside",
                      tickfont: {
                        size: 10,
                        standoff: 50,
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
