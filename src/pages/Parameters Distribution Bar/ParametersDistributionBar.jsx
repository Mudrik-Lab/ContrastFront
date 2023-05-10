import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FilterExplanation,
  RadioInput,
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
  navHeight,
  screenHeight,
  sideWidth,
} from "../../components/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

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

  const Y = data?.data.map((row) => row.series_name).reverse();

  const X2 = data?.data.map((row) => row.series[1]?.value || 0).reverse();

  var trace1 = {
    x: X1,
    y: Y,
    name: "pro",
    orientation: "h",
    marker: {
      color: colorsArray[12],
      width: 100,
    },
    type: "bar",
  };
  var trace2 = {
    x: X2,
    y: Y,
    name: "challenges",
    orientation: "h",
    marker: {
      color: colorsArray[6],
      width: 100,
    },
    type: "bar",
  };

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div>
      <Navbar />
      {configurationSuccess && (
        <div className="flex mt-12 p-2">
          <SideControl headline={" Parameters Distribution Bar"}>
            <Text md weight="bold">
              Axis Controls
            </Text>
            <div className={sectionClass}>
              <RangeInput
                number={experimentsNum}
                setNumber={setExperimentsNum}
              />
              <FilterExplanation
                text="Minimum number of experiments"
                tooltip="few more words about Minimum number of experiments"
              />
            </div>

            <div className={sectionClass}>
              <Text flexed md weight="bold">
                Theory
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
                Parameters
                <FilterExplanation tooltip="few more words about Theory" />
              </Text>
              <TagsSelect
                options={parametersOptions}
                value={selected}
                onChange={setSelected}
              />
            </div>

            <ReportFilter checked={reporting} setChecked={setReporting} />

            <div className="flex gap-2">
              <label htmlFor="stacked">Is Stacked?</label>
              <input
                type="checkbox"
                name="stacked"
                checked={isStacked}
                onChange={() => setIsStacked(!isStacked)}
              />
            </div>
          </SideControl>

          {X1 && X2 && Y && (
            <div style={{ marginLeft: sideWidth }}>
              <TopGraphText
                firstLine={
                  'The graph depicts the distribution of different parameters for each selected theory, separated to experiments challenging ("Against") and supporting ("Pro") the theory.'
                }
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
              />
              {isLoading ? (
                <Spinner />
              ) : (
                <Plot
                  data={[trace1, trace2]}
                  layout={{
                    barmode: isStacked ? "stack" : "group",
                    title: "Parameter Distribution Bar",
                    width: screenWidth - sideWidth,
                    height: 35 * Y?.length + 350,
                    margin: { autoexpand: true, l: 200 },
                    legend: { itemwidth: 90 },
                    xaxis: {
                      zeroline: true,
                      side: "top",
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
              )}
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
