import { useQuery } from "@tanstack/react-query";
import React from "react";
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
import TagsSelect from "../../components/TagsSelect";
import { AlphaBetaColors, isMoblile, sideWidth } from "../../Utils/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import getFrequencies from "../../apiHooks/getFrequencyGraph";
import Spinner from "../../components/Spinner";
import PageTemplate from "../../components/PageTemplate";
import { graphsHeaders } from "../../Utils/GraphsDetails";

export default function Frequencies() {
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const [selectedParent, setSelectedParent] = React.useState({});

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
        value: encodeURIComponent(parentTheory),
        label: parentTheory,
      }))
    : [];

  const { data, isLoading } = useQuery(
    [
      `frequencies${
        selectedTechniques?.join(" ") + " " + selectedParent.value ||
        "" + " " + reporting + " " + theoryDriven + " " + consciousness
      }`,
    ],
    () =>
      getFrequencies({
        techniques: selectedTechniques,
        theory: selectedParent.value,
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

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
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

                <div className={sectionClass}>
                  <Text flexed md weight="bold">
                    Theory
                    <FilterExplanation tooltip="few more words about Thory" />
                  </Text>

                  <TagsSelect
                    options={parentTheories}
                    placeholder="Paradigms Family"
                    defaultValue={selectedParent.value}
                    onChange={setSelectedParent}
                  />
                </div>
                <div className={sectionClass}>
                  <Text flexed md weight="bold">
                    Techniques
                    <FilterExplanation tooltip="few more words about techniques" />
                  </Text>
                  {configSuccess && (
                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={selectedTechniques}
                      options={techniques}
                      placeholder="Techniques"
                      onChange={setSelectedTechniques}
                    />
                  )}
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
