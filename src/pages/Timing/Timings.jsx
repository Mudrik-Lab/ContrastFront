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
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrl, buildUrlForMultiSelect } from "../../Utils/functions";

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

  const techniques = configSuccess
    ? configuration?.data.available_techniques_for_timings.map((technique) => ({
        value: technique,
        label: technique,
      }))
    : [];
  const traceColor =
    configuration?.data.available_finding_tags_types_for_timings.reduce(
      (result, key, index) => {
        result[key] = blueToYellow(
          configuration?.data.available_finding_tags_types_for_timings.length
        )[index];
        return result;
      },
      {}
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
        selectedTags?.map((x) => x.value).join("+")
      }`,
    ],
    () =>
      getTimings({
        techniques: selectedTechniques,
        tags: selectedTags,
        theory: theory?.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
      })
  );
  const serieses = data?.data.map((row) => row.series);

  const graphsData = serieses
    ?.reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => a.name - b.name);

  const traces = [];
  graphsData?.map((row, index) => {
    index > 8 &&
      traces.push({
        x: [row.start, row.end],
        y: [index + 1, index + 1],
        name: row.name,
        marker: { size: 3 },

        line: {
          width: 3,
          color: traceColor[row.name],
        },

        type: "scatter",
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
  }, [searchParams]);

  useEffect(() => {
    if (configSuccess) {
      setSelectedTechniques(techniques);
      setSelectedTags(tags);
    }
  }, [configSuccess]);

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
                onChange={(e) => {
                  buildUrl(pageName, "theory", e.value, navigate);
                }}
              />
              <Text flexed size={14}>
                Theory Family
                <FilterExplanation tooltip="few more words about Thory" />
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
              <Text flexed size={14}>
                Technique
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
              <Text flexed size={14}>
                Components
                <FilterExplanation tooltip="few more words about Finding Tags" />
              </Text>
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
                      title: "Experiment",
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
                  <div className="absolute right-10 top-40 w-[150px] overflow-y-scroll h-[400px] ">
                    {blueToYellow(
                      configuration?.data
                        .available_finding_tags_types_for_timings.length
                    ).map((color, index) => {
                      return (
                        <div
                          className="flex justify-start items-end gap-2"
                          key={color + index}>
                          <div
                            className="w-3 h-3 mt-2 "
                            style={{ backgroundColor: color }}></div>
                          <p className="text-[10px] whitespace-nowrap overflow-hidden">
                            {Object.keys(traceColor)[index]}
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
