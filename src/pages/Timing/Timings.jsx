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
import {
  isMoblile,
  screenHeight,
  screenWidth,
  sideSectionClass,
} from "../../Utils/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import getTimings from "../../apiHooks/getTimings";
import Spinner from "../../components/Spinner";
import { blueToYellow } from "../../Utils/functions";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import PageTemplate from "../../components/PageTemplate";

export default function Timings() {
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const [selectedTags, setSelectedTags] = React.useState(null);
  const [theory, setTheory] = React.useState({});

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`confuguration`],
    getConfiguration
  );

  const techniques = configSuccess
    ? configuration?.data.available_techniques_for_timings.map((technique) => ({
        value: technique,
        label: technique,
      }))
    : [];



  const tags = configSuccess
    ? configuration?.data.available_finding_tags_types_for_timings.map(
        (tag, index) => ({
          value: tag,
          label: tag,
        })
      )
    : [];

  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
    })
  );
  // console.log(parentTheories);
  // parentTheories && parentTheories.push({ value: null, label: "..." });

  const { data, isLoading } = useQuery(
    [
      `timings${
        selectedTechniques?.map((x) => x.value).join("+") +
        " " +
        theory?.value +
        " " +
        reporting +
        " " +
        theoryDriven +
        " " +
        consciousness +
        " " +
        selectedTags
      }`,
    ],
    () =>
      getTimings({
        techniques: selectedTechniques,
        tags: selectedTags,
        theory: theory.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
      })
  );


  let indexedDataList = [];
  let tagsForLegend = []
  for (let i = 0; i < data?.data.length; i++) {
    const item = data?.data[i];
    const objectsList = item.series;
    const indexedObjects = objectsList.map(innerObject => {
      innerObject["index"] = i ;    // flatten the data structure & index each data point according to what cluster it was originally
      tagsForLegend.push(innerObject["name"]);  // add tag name to legend
      return innerObject;
    });
    indexedDataList.push(indexedObjects);
  }
  const graphData = [].concat(...indexedDataList);
  
  if (tagsForLegend[tagsForLegend.length -1] === undefined) {
    tagsForLegend.pop()
  }
  const legendSet = new Set(tagsForLegend)
  const legendArray = [...legendSet]
  const TimingsColors = blueToYellow(legendArray.length);

  const traces = [];
  graphData?.forEach((row) => {
    const colorIndex = legendArray.indexOf(row.name)

      traces.push({
        type: "scatter", 
        x: [row.start, row.end],
        y: [row.index, row.index],
        name: row.name,
        marker: { size: 3, color: TimingsColors[colorIndex] },
        opacity: 1,
        line: {
          width: 3,
          color: TimingsColors[colorIndex],
        },
        legendrank: TimingsColors[colorIndex]
      });
  });

  configSuccess && !selectedTechniques && setSelectedTechniques(techniques);
  configSuccess && !selectedTags && setSelectedTags(tags);

  return (
    <div>
      <PageTemplate
        control={
          <SideControl headline="Timings">
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
            <div className={sideSectionClass}>
              {configSuccess && (
                <Select
                  closeMenuOnSelect={true}
                  isMulti={true}
                  value={selectedTags}
                  options={tags}
                  placeholder="Tags"
                  onChange={setSelectedTags}
                />
              )}
              <Text flexed size={14}>
                Components
                <FilterExplanation tooltip="few more words about Finding Tags" />
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
            />{" "}
          </SideControl>
        }
        graph={
          <div className="overflow-x-scroll">
            <TopGraphText
              text={graphsHeaders[6].figureText}
              firstLine={graphsHeaders[6].figureLine}
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <div className="relative ">
                <Plot
                  data={traces}
                  config={{ displayModeBar: !isMoblile, responsive: true }}
                  layout={{
                    width: isMoblile ? screenWidth : screenWidth - 600,
                    height: screenHeight - 400,
                    margin: { autoexpand: true, l: 50 },
                    legend: { itemwidth: 15, font: { size: 18 } },
                    
                  showlegend: false,

                    yaxis: {
                      title: "Experiments",
                      zeroline: false, // hide the zeroline
                      zerolinecolor: "#969696", // customize the color of the zeroline
                      zerolinewidth: 2, // customize the width of the zeroline
                    },
                    xaxis: {
                      title: "Time (ms)",
                      zeroline: false, // hide the zeroline
                      zerolinecolor: "#969696", // customize the color of the zeroline
                      zerolinewidth: 2, // customize the width of the zeroline
                    },
                  }}
                />
                {!isMoblile && screenHeight > 500 && (
                  <div className="absolute right-10 top-40 w-[150px] overflow-y-scroll h-[400px]">
                    {blueToYellow(
                     legendArray.length
                    ).map((color, index) => {
                      return (
                        <div
                          className="flex justify-start items-end gap-2"
                          key={color + index}>
                          <div
                            className="w-3 h-3 mt-2 "
                            style={{ backgroundColor: color }}></div>
                          <p className="text-[10px] whitespace-nowrap overflow-hidden">
                          {Object.values(legendArray)[index]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
