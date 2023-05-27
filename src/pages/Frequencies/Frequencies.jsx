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
import {
  FrequenciesColors,
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

export default function Frequencies() {
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const [theory, setTheory] = React.useState({});

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

  let indexedDataList = [];
  
  for (let i = 0; i < data?.data.length; i++) {
    const item = data?.data[i];
    const objectsList = item.series;
    const indexedObjects = objectsList.map(innerObject => {
      innerObject["index"] = i ;    // flatten the data structure & index each data point according to what cluster it was originally
      return innerObject;
    });
    indexedDataList.push(indexedObjects);
  }
  const graphData = [].concat(...indexedDataList);

  const traces = [];
  graphData?.forEach((row) => {
      traces.push({
        type: "scatter", 
        x: [row.start, row.end],
        y: [row.index, row.index],
        name: row.name,
        marker: { size: 3, color: FrequenciesColors[row.name] },
        opacity: 1,
        line: {
          width: 3,
          color: FrequenciesColors[row.name],
        },
      });
  });

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

                <div className={sideSectionClass}>
                  <Select
                    closeMenuOnSelect={true}
                    isMulti={false}
                    isClearable={true}
                    options={parentTheories}
                    value={theory}
                    onChange={setTheory}
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
                      placeholder="Techniques"
                      onChange={setSelectedTechniques}
                    />
                  )}
                  <Text flexed size={14}>
                    Techniques
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
              {Object.values(FrequenciesColors).map((color, index) => (
                <div
                  className="flex justify-start items-end gap-2"
                  id="color"
                  key={color}>
                  <div
                    className="w-5 h-5 mt-2 "
                    style={{ backgroundColor: color }}></div>
                  <Text>{Object.keys(FrequenciesColors)[index]}</Text>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
