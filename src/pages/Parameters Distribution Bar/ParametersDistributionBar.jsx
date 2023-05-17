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
  colorsArray,
  screenWidth,
  parametersOptions,
  isMoblile,
  designerColors,
} from "../../components/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Spinner from "../../components/Spinner";
import PageTemplate from "../../components/PageTemplate";
import { rawTeaxtToShow } from "../../Utils/functions";

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

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
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

              <div className={sectionClass}>
                <Text flexed md weight="bold">
                  Theory Family
                  <FilterExplanation tooltip="few more words about Theory" />
                </Text>
                <TagsSelect
                  value={selectedParent}
                  options={parentTheories}
                  onChange={setSelectedParent}
                />
              </div>
              <div className={sectionClass}>
                <Text flexed md weight="bold">
                  Parameter of interest
                  <FilterExplanation tooltip="Choose the dependent variable to be queried." />
                </Text>
                <TagsSelect
                  options={parametersOptions}
                  value={selected}
                  onChange={setSelected}
                />
              </div>

              <ReportFilter checked={reporting} setChecked={setReporting} />

              <div className="flex gap-2 mt-4">
                <input
                  type="checkbox"
                  name="stacked"
                  checked={isStacked}
                  onChange={() => setIsStacked(!isStacked)}
                />
              </div>
              <FilterExplanation
                text="Stacked (or side by side)?"
                tooltip="You can choose how to display the comparison between experiments supporting (red bars) vs. challenging (blue bars) the chosen theory family. Choosing “stacked’ will show the distribution of the experiments challenging the chosen theory family on top of the ones supporting it. While choosing “side by side” will show them one next to the other."
              />
            </SideControl>
          }
          graph={
            <div>
              <TopGraphText
                firstLine={
                  'The graph depicts the distribution of different parameters for each selected theory, separated to experiments challenging ("Against") and supporting ("Pro") the theory.'
                }
                text="Here, you can select a specific theory family and a specific parameter of interest, to explore how experiments in the database that refer to the chosen theory family distribute over the different levels of the chosen parameter. The results will be shown separately for experiments supporting (blue bars) vs. challenging (red bars) the chosen theory family. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.
                You can also filter the results according to reporting technique.
                "
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
                    legend: { itemwidth: 90, x: -0.2, y: 1.05 },

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
                        size: 14,
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
