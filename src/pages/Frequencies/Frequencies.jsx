import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import {
  FilterExplanation,
  ReportFilter,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import {
  AlphaBetaColors,
  isMoblile,
  screenHeight,
  screenWidth,
  sideSectionClass,
  sideWidth,
} from "../../Utils/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import getFrequencies from "../../apiHooks/getFrequencyGraph";
import Spinner from "../../components/Spinner";
import PageTemplate from "../../components/PageTemplate";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Frequencies() {
  const queryParams = new URLSearchParams(location.search);
  console.log();
  const [experimentsNum, setExperimentsNum] = React.useState(
    queryParams.get("min_number_of_experiments") || 0
  );
  const [reporting, setReporting] = React.useState(
    queryParams.get("is_reporting") || "either"
  );
  const [consciousness, setConsciousness] = React.useState(
    queryParams.get("type_of_consciousness") || "either"
  );
  const [theoryDriven, setTheoryDriven] = React.useState(
    queryParams.get("theory_driven") || "either"
  );
  const [theory, setTheory] = React.useState(
    { value: queryParams.get("theory"), label: queryParams.get("theory") } || {}
  );
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`confuguration`],
    getConfiguration
  );

  const techniques = configSuccess
    ? configuration?.data.available_techniques_for_frequencies.map(
        (technique) => ({
          value: technique,
          label: technique,
        })
      )
    : [];

  const parentTheories = configSuccess
    ? configuration?.data.available_parent_theories.map((parentTheory) => ({
        value: parentTheory,
        label: parentTheory,
      }))
    : [];
  console.log(
    `frequencies${
      selectedTechniques?.map((x) => x.value).join("+") +
      " " +
      theory?.value +
      " " +
      reporting +
      " " +
      theoryDriven +
      " " +
      consciousness
    }`
  );
  const { data, isLoading } = useQuery(
    [
      `frequencies${
        selectedTechniques?.map((x) => x.value).join("+") +
        " " +
        theory?.value +
        " " +
        reporting +
        " " +
        theoryDriven +
        " " +
        consciousness
      }`,
    ],
    () =>
      getFrequencies({
        techniques: selectedTechniques,
        theory: theory.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
      })
  );
  const tracesData = data?.data.map((row) => row.series);

  const graphsData = tracesData
    ?.reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => a.name - b.name);
  const traces = [];
  graphsData?.map((row, index) =>
    traces.push({
      x: [row.start, row.end],
      y: [index + 1, index + 1],
      name: row.name,
      orientation: "h",
      scatter: { color: AlphaBetaColors[row.name] },
      marker: { size: 3 },
      line: {
        color: AlphaBetaColors[row.name],
        width: 3,
      },
      type: "lines",
    })
  );
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log(queryParams);
    queryParams.set("is_reporting", reporting);
    queryParams.set("type_of_consciousness", consciousness);
    queryParams.set("theory_driven", theoryDriven);
    queryParams.set("min_number_of_experiments", experimentsNum);
    queryParams.set("theory", theory?.value);
    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  configSuccess && !selectedTechniques && setSelectedTechniques(techniques);

  return (
    <div>
      {configSuccess && (
        <div>
          <PageTemplate
            control={
              <SideControl headline={"Frequencies"}>
                <Text md weight="bold">
                  Axis Controls
                </Text>

                <div className={sideSectionClass}>
                  <Select
                    closeMenuOnSelect={true}
                    isMulti={false}
                    isClearable={true}
                    options={parentTheories}
                    value={theory}
                    onChange={(e) => {
                      setTheory(e);
                      navigate(`?theory=${encodeURIComponent(theory.value)}`);
                    }}
                  />
                  <Text size={14} flexed>
                    Theory
                    <FilterExplanation tooltip="few more words about theories" />
                  </Text>
                </div>
                <div className={sideSectionClass}>
                  {configSuccess && (
                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={selectedTechniques}
                      options={techniques}
                      placeholder="Technique"
                      onChange={setSelectedTechniques}
                    />
                  )}
                  <Text flexed size={14}>
                    Technique
                    <FilterExplanation tooltip="few more words about techniques" />
                  </Text>
                </div>
                <TypeOfConsciousnessFilter
                  checked={consciousness}
                  setChecked={setConsciousness}
                />
                <ReportFilter checked={reporting} setChecked={setReporting} />
                <TheoryDrivenFilter
                  checked={theoryDriven}
                  setChecked={setTheoryDriven}
                />
              </SideControl>
            }
            graph={
              <div>
                <TopGraphText
                  text={graphsHeaders[7].figureText}
                  firstLine={graphsHeaders[7].figureLine}
                />

                {isLoading ? (
                  <Spinner />
                ) : (
                  <Plot
                    data={traces}
                    config={{ displayModeBar: !isMoblile }}
                    layout={{
                      autosize: false,
                      barmode: "stack",
                      width: isMoblile
                        ? screenWidth
                        : screenWidth - sideWidth - 300,
                      height: screenHeight - 360,

                      margin: { autoexpand: true, l: 50 },
                      showlegend: false,
                      yaxis: {
                        zeroline: false, // hide the zeroline
                        zerolinecolor: "#969696", // customize the color of the zeroline
                        zerolinewidth: 2, // customize the width of the zeroline
                      },
                      xaxis: {
                        title: " Frequency (Hz)",
                        zeroline: false, // hide the zeroline
                        zerolinecolor: "#969696", // customize the color of the zeroline
                        zerolinewidth: 2, // customize the width of the zeroline
                      },
                    }}
                  />
                )}
              </div>
            }
          />

          {!isMoblile && screenHeight > 500 && (
            <div
              className=" fixed top-52 right-24 "
              style={{ height: screenHeight - 150 }}>
              {Object.values(AlphaBetaColors).map((color, index) => (
                <div
                  className="flex justify-start items-end gap-2"
                  id="color"
                  key={color}>
                  <div
                    className="w-5 h-5 mt-2 "
                    style={{ backgroundColor: color }}></div>
                  <Text>{Object.keys(AlphaBetaColors)[index]}</Text>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
