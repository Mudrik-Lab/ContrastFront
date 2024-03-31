import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  TooltipExplanation,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TopGraphText,
  CSV,
  Reset,
  TypeOfConsciousnessFilter,
  TheoryDrivenFilter,
} from "../.././sharedComponents/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import {
  screenWidth,
  parametersOptions,
  isMoblile,
  sideSectionClass,
  plotConfig,
} from "../../Utils/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Spinner from "../.././sharedComponents/Spinner";
import PageTemplate from "../.././sharedComponents/PageTemplate";
import { designerColors } from "../../Utils/Colors";
import Toggle from "../.././sharedComponents/Toggle";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { breakLongLines, buildUrl, rawTextToShow } from "../../Utils/functions";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function TheoryGrandOverviewBar() {
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState();
  const [selectedParent, setSelectedParent] = React.useState();
  const [reporting, setReporting] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [isStacked, setIsStacked] = React.useState(true);
  const [isCsv, setIsCsv] = React.useState(false);

  const navigate = useNavigate();
  const pageName = "theory_grand_overview_bar";
  const { data: configuration, isSuccess: configurationSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
    })
  );

  const { data, isLoading } = useQuery({
    queryKey: [
      `parameters_distribution_bar`,
      consciousness,
      selected?.value,
      theoryDriven,
      selectedParent?.value,
      reporting,
      experimentsNum,
      isCsv,
    ],
    queryFn: () => {
      return getExperimentsGraphs({
        graphName: "theory_grand_overview_bar",
        breakdown: selected?.value,
        theory: selectedParent?.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
        min_number_of_experiments: experimentsNum,
        is_csv: isCsv,
      });
    },
    enabled: Boolean(selected?.value && selectedParent?.value),
  });
  const X1 = data?.data?.map((row) => row.series[0].value).reverse();

  const Y = data?.data
    ?.map((row) => breakLongLines(rawTextToShow(row.series_name), 10))
    .reverse();

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

    if (queryParams.get("theory")) {
      setSelectedParent({
        value: queryParams.get("theory"),
        label: queryParams.get("theory"),
      });
    } else if (configurationSuccess) {
      setSelectedParent(parentTheories[0]);
    }

    navigate({ search: queryParams.toString() });
  }, [searchParams, configurationSuccess]);

  return (
    <div>
      {configurationSuccess && (
        <PageTemplate
          control={
            <SideControl headline={" Grand Overview Bar"}>
              <Text lg weight="bold">
                Axis Controls
              </Text>

              <RangeInput
                number={experimentsNum}
                setNumber={(e) => {
                  buildUrl(pageName, "min_number_of_experiments", e, navigate);
                }}
              />
              <TypeOfConsciousnessFilter
                checked={consciousness}
                setChecked={(e) => {
                  buildUrl(pageName, "type_of_consciousness", e, navigate);
                }}
              />
              <TheoryDrivenFilter
                checked={theoryDriven}
                setChecked={(e) => {
                  buildUrl(pageName, "theory_driven", e, navigate);
                }}
              />
              <ReportFilter
                checked={reporting}
                setChecked={(e) => {
                  buildUrl(pageName, "is_reporting", e, navigate);
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
                text={graphsHeaders[0].figureText}
                firstLine={graphsHeaders[0].figureLine}
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
                      height: 100 * Y?.length + 350,
                      margin: { autoexpand: true, l: 20, t: 150 },
                      legend: { itemwidth: 90, x: -0.1, y: 1.2 },

                      xaxis: {
                        title: {
                          text: "Number of experiments",
                          font: { size: 16 },
                        },
                        zeroline: true,
                        side: "top",
                        tickmode: "linear",
                        dtick: 20,
                        tickfont: {
                          size: 14,
                        },
                      },
                      yaxis: {
                        automargin: true,
                        ticks: "outside",
                        tickfont: {
                          size: 14,
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
      )}
    </div>
  );
}
