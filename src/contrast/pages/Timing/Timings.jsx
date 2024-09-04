import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import {
  CSV,
  TooltipExplanation,
  ReportFilter,
  Reset,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../../sharedComponents/Reusble";
import {
  plotConfig,
  screenHeight,
  sideSectionClass,
} from "../../../Utils/HardCoded";
import getConfiguration from "../../../apiHooks/getConfiguration";
import getTimings from "../../../apiHooks/getTimings";
import Spinner from "../../../sharedComponents/Spinner";
import { blueToYellow } from "../../../Utils/functions";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrl, buildUrlForMultiSelect } from "../../../Utils/functions";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function Timings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [theory, setTheory] = React.useState();
  const [selectedTechniques, setSelectedTechniques] = React.useState([]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const navigate = useNavigate();
  const pageName = "timings";

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`confuguration`],
    getConfiguration
  );

  const techniques = configuration?.data.available_techniques_for_timings.map(
    (technique) => ({
      value: technique,
      label: technique,
    })
  );

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

  const { data, isLoading } = useQuery({
    queryKey: [
      "timings",
      selectedTechniques?.map((x) => x.value).join("+"),
      theory?.value,
      reporting,
      theoryDriven,
      consciousness,
      selectedTags?.map((x) => x.value).join("+"),
    ],
    queryFn: () =>
      getTimings({
        techniques: selectedTechniques,
        tags: selectedTags,
        theory: theory?.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
      }),
  });

  let indexedDataList = [];
  let tagsForLegend = [];
  for (let i = 0; i < data?.data.length; i++) {
    const item = data?.data[i];
    const objectsList = item.series;
    const indexedObjects = objectsList.map((innerObject) => {
      innerObject["index"] = i; // flatten the data structure & index each data point according to what cluster it was originally
      tagsForLegend.push(innerObject["name"]); // add tag name to legend

      return innerObject;
    });
    indexedDataList.push(indexedObjects);
  }
  const graphData = [].concat(...indexedDataList);

  if (tagsForLegend[tagsForLegend.length - 1] === undefined) {
    tagsForLegend.pop();
  }
  const legendSet = new Set(tagsForLegend);
  const legendArray = [...legendSet];

  const TimingsColors = blueToYellow(legendArray.length);

  const traces = [];
  graphData?.forEach((row) => {
    const colorIndex = legendArray.indexOf(row.name);
    const hovertemplate = `${row.start} - ${row.end} <br> ${row.name} <extra></extra>`;
    traces.push({
      type: "scatter",
      x: [row.start, row.end],
      y: [row.index, row.index],
      name: row.name,
      hovertemplate: hovertemplate,
      textinfo: "name",
      hovertext: row.name,
      marker: { size: 3, color: TimingsColors[colorIndex] },
      opacity: 1,
      line: {
        width: 3,
        color: TimingsColors[colorIndex],
      },
    });
  });

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

    if (queryParams.get("theory") !== "undefined") {
      setTheory({
        value: queryParams.get("theory"),
        label: queryParams.get("theory"),
      });
    } else {
      setTheory({});
    }
    if (configSuccess) {
      const selectedTechValues = queryParams.getAll("techniques");
      setSelectedTechniques(
        selectedTechValues.map((item) => ({ value: item, label: item }))
      );
      const selectedTagValues = queryParams.getAll("tags_types");
      setSelectedTags(
        selectedTagValues.map((item) => ({ value: item, label: item }))
      );
    }
    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  // useEffect to state the initial values on mount (insert all options or takes from url)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const techniquesOnURL = queryParams.getAll("techniques");
    const tagsOnURL = queryParams.getAll("tags_types");

    if (configSuccess) {
      const queryParams = new URLSearchParams(searchParams.toString());
      if (techniquesOnURL.length === 0) {
        queryParams.delete("techniques");
        techniques.forEach((value) => {
          queryParams.append("techniques", value.value);
        });
      } else {
        setSelectedTechniques(
          techniquesOnURL.map((x) => ({ value: x, label: x }))
        );
      }
      if (tagsOnURL.length === 0) {
        queryParams.delete("tags_types");
        tags.forEach((value) => {
          queryParams.append("tags_types", value.value);
        });
      } else {
        setSelectedTags(tagsOnURL.map((x) => ({ value: x, label: x })));
      }

      navigate(`?${queryParams.toString()}`);
      // url is being belt in the end of this proccess and so only the last part build it (tags)
    }
  }, [configSuccess]);

  return (
    <div>
      <PageTemplate
        control={
          <SideControl headline="Timings">
            <Text lg weight="bold">
              Axis Controls
            </Text>
            <div className={sideSectionClass}>
              <Select
                className="text-lg w-[300px]"
                aria-label="theory family"
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable={true}
                options={parentTheories}
                value={theory}
                onChange={(e) => {
                  buildUrl(pageName, "theory", e?.value, navigate);
                }}
              />

              <TooltipExplanation
                text={"Theory Family"}
                tooltip="few more words about Thory"
              />
            </div>
            <div className={sideSectionClass}>
              {configSuccess && (
                <Select
                  className="text-lg w-[300px]"
                  aria-label="techniques"
                  closeMenuOnSelect={true}
                  isMulti={true}
                  isClearable={true}
                  value={selectedTechniques}
                  options={techniques}
                  placeholder="Techniques"
                  onChange={(e) =>
                    buildUrlForMultiSelect(
                      e,
                      "techniques",
                      searchParams,
                      navigate
                    )
                  }
                />
              )}

              <TooltipExplanation
                text={"Technique"}
                tooltip="few more words about techniques"
              />
            </div>
            <div className={sideSectionClass}>
              {configSuccess && (
                <Select
                  className="text-lg w-[300px]"
                  aria-label="tags"
                  closeMenuOnSelect={true}
                  isMulti={true}
                  value={selectedTags}
                  options={tags}
                  placeholder="Tags"
                  onChange={(e) =>
                    buildUrlForMultiSelect(
                      e,
                      "tags_types",
                      searchParams,
                      navigate
                    )
                  }
                />
              )}

              <TooltipExplanation
                text={"Components"}
                tooltip="few more words about Finding Tags"
              />
            </div>
            <TypeOfConsciousnessFilter
              checked={consciousness}
              setChecked={(e) => {
                buildUrl(pageName, "type_of_consciousness", e, navigate);
              }}
            />
            <ReportFilter
              checked={reporting}
              setChecked={(e) => {
                buildUrl(pageName, "is_reporting", e, navigate);
              }}
            />
            <TheoryDrivenFilter
              checked={theoryDriven}
              setChecked={(e) => {
                buildUrl(pageName, "theory_driven", e, navigate);
              }}
            />

            <div className="w-full flex items-center justify-between my-4">
              <CSV data={data} />
              <Reset pageName={pageName} />
            </div>
          </SideControl>
        }
        graph={
          <div className="h-full">
            <TopGraphText
              text={graphsHeaders["Timings"].figureText}
              firstLine={graphsHeaders["Timings"].figureLine}
              legendLine={graphsHeaders["Timings"].legendLine}
            />
            {isLoading ? (
              <Spinner />
            ) : !traces.length ? (
              <NoResults />
            ) : (
              <div className=" w-full h-full flex gap-2">
                <Plot
                  data={traces}
                  config={plotConfig}
                  style={{
                    width: "calc(100% - 300px)",
                    height: "calc(100% - 100px)",
                  }}
                  layout={{
                    autosize: true,
                    legend: { itemwidth: 25, font: { size: 18 } },
                    showlegend: false,
                    yaxis: {
                      showgrid: false,
                      title: { text: "Experiments", font: { size: 24 } },
                      zeroline: true,

                      tickfont: {
                        size: 20,
                        standoff: 50,
                      },
                      zerolinecolor: "#969696", // customize the color of the zeroline
                      zerolinewidth: 2, // customize the width of the zeroline
                    },
                    xaxis: {
                      showgrid: false,
                      title: { text: "Time (ms)", font: { size: 24 } },

                      tickfont: {
                        size: 20,
                        standoff: 50,
                      },
                      zerolinecolor: "#969696", // customize the color of the zeroline
                      zerolinewidth: 2, // customize the width of the zeroline
                    },
                  }}
                />
                {screenHeight > 500 && (
                  <div
                    style={{
                      height: "calc(100vh - 300px)",
                      marginTop: "50px",
                      overflowY: "scroll",
                    }}>
                    {blueToYellow(legendArray.length).map((color, index) => (
                      <div
                        key={index}
                        className=" flex justify-start items-center gap-2 "
                        id="color">
                        <div
                          className="w-3 h-3"
                          style={{ backgroundColor: color }}></div>
                        <p className="text-md">
                          {Object.values(legendArray)[index]}
                        </p>
                      </div>
                    ))}
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
