import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FilterExplanation,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TopGraphText,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import {
  screenWidth,
  parametersOptions,
  isMoblile,
  sideSectionClass,
} from "../../Utils/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Spinner from "../../components/Spinner";
import PageTemplate from "../../components/PageTemplate";
import { rawTextToShow } from "../../Utils/functions";
import { designerColors } from "../../Utils/Colors";
import Toggle from "../../components/Toggle";
import { graphsHeaders } from "../../Utils/GraphsDetails";

export default function ParametersDistributionBar() {
  const [selected, setSelected] = React.useState(parametersOptions[0]);
  const [selectedParent, setSelectedParent] = React.useState({
    value: "Global Workspace",
    label: "Global Workspace",
  });
  const [reporting, setReporting] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [isStacked, setIsStacked] = React.useState(true);
  // const [searchParams, setSearchParams] = useSearchParams();

  // React.useEffect(() => {
  //   setExperimentsNum(searchParams.get("min_number_of_experiments"));
  //   setReporting(searchParams.get("is_reporting"));
  //   setSelected({
  //     value: searchParams.get("breakdown"),
  //     label: searchParams.get("breakdown"),
  //   });
  //   setSelectedParent({ value: searchParams.get("theory") });
  // }, [searchParams]);

  // React.useEffect(() => {
  //   if (experimentsNum) {
  //     setSearchParams({
  //       breakdown: selected.value,
  //       theory: selectedParent.value,
  //       is_reporting: reporting,
  //       min_number_of_experiments: experimentsNum,
  //     });
  //   }
  // }, [selected.value, selectedParent.value, reporting, experimentsNum]);

  const { data: configuration, isSuccess: configurationSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );

  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    })
  );

  const { data, isLoading } = useQuery(
    [
      `parameters_distribution_bar${
        selected.value + selectedParent.value + reporting + experimentsNum
      }`,
    ],
    () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_bar",
        breakdown: selected.value,
        theory: selectedParent.value,
        is_reporting: reporting,
        min_number_of_experiments: experimentsNum,
      })
  );

  const X1 = data?.data.map((row) => row.series[0].value).reverse();

  const Y = data?.data.map((row) => rawTeaxtToShow(row.series_name)).reverse();

  const X2 = data?.data.map((row) => row.series[1]?.value || 0).reverse();

  var trace1 = {
    x: X1,
    y: Y,
    text: X1,
    name: "Supports",
    hoverinfo: "none",
    orientation: "h",
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

  return (
    <div>
      {configurationSuccess && (
        <PageTemplate
          control={
            <SideControl headline={" Parameters Distribution Bar"}>
              <Text md weight="bold">
                Axis Controls
              </Text>

              <RangeInput
                number={experimentsNum}
                setNumber={setExperimentsNum}
              />

              <div className={sideSectionClass}>
                <TagsSelect
                  value={selectedParent}
                  options={parentTheories}
                  onChange={setSelectedParent}
                />
                <Text size={14} flexed>
                  Theory Family
                  <FilterExplanation tooltip="few more words about Theory" />
                </Text>
              </div>
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

              <ReportFilter checked={reporting} setChecked={setReporting} />

              <div className="flex gap-2 mt-4">
                <Text>Side by side</Text>
                <Toggle
                  checked={isStacked}
                  setChecked={() => setIsStacked(!isStacked)}
                />
                <Text>Stacked</Text>
                <FilterExplanation
                  text=""
                  tooltip="You can choose how to display the comparison between experiments supporting (blue bars) vs. challenging (red bars) the chosen theory family. Choosing “stacked’ will show the distribution of the experiments challenging the chosen theory family on top of the ones supporting it. While choosing “side by side” will show them one next to the other."
                />
              </div>
            </SideControl>
          }
          graph={
            <div>
              <TopGraphText
                text={graphsHeaders[2].figureText}
                firstLine={graphsHeaders[2].figureLine}
              />
              {isLoading ? (
                <Spinner />
              ) : (
                <Plot
                  data={[trace1, trace2]}
                  config={{ displayModeBar: !isMoblile }}
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
              )}
            </div>
          }
        />
      )}
    </div>
  );
}
