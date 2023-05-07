import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  Text,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import {
  colorsArray,
  screenWidth,
  parametersOptions,
} from "../../components/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

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
          <div className="side-filter-box p-2 pt-10 flex flex-col items-center ">
            <Text size={28} weight="bold" color="blue" center>
              Parameters Distribution Bar
            </Text>
            <div className="w-[346px] shadow-xl mt-10 mx-auto rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2 ">
              <Text md weight="bold">
                Axis Controls
              </Text>
              <div className={sectionClass}>
                <RangeInput
                  number={experimentsNum}
                  setNumber={setExperimentsNum}
                />
                <FilterExplanation
                  text="minimum number of experiments"
                  tooltip="few more words about minimum number of experiments"
                />
              </div>

              <div className={sectionClass}>
                <Text md weight="bold">
                  Filter Tags
                </Text>
                <TagsSelect
                  value={selectedParent}
                  options={parentTheories}
                  onChange={setSelectedParent}
                />
                <FilterExplanation
                  text="Paradigms Family"
                  tooltip="few more words about Paradigms Family"
                />
              </div>
              <div className={sectionClass}>
                <TagsSelect
                  options={parametersOptions}
                  value={selected}
                  onChange={setSelected}
                />

                <FilterExplanation
                  text="Paradigm "
                  tooltip="few more words about Paradigm "
                />
                <RadioInput
                  values={[
                    { value: "report", name: "Report" },
                    { value: "no_report", name: "No-Report" },
                    { value: "both", name: "Both" },
                    { value: "either", name: "Either" },
                  ]}
                  checked={reporting}
                  setChecked={setReporting}
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="stacked">Is Stacked?</label>
                <input
                  type="checkbox"
                  name="stacked"
                  checked={isStacked}
                  onChange={() => setIsStacked(!isStacked)}
                />
              </div>
            </div>
          </div>

          {X1 && X2 && Y && (
            <div className="pl-12">
              {isLoading ? (
                <Spinner />
              ) : (
                <Plot
                  data={[trace1, trace2]}
                  layout={{
                    barmode: isStacked ? "stack" : "group",
                    title: "Parameter Distribution Bar",
                    width: screenWidth - 470,
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
    </div>
  );
}
