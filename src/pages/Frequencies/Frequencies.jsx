import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import {
  ButtonReversed,
  CSV,
  FilterExplanation,
  ReportFilter,
  Reset,
  SideControl,
  Spacer,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import {
  FrequenciesColors,
  isMoblile,
  sideSectionClass,
} from "../../Utils/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import getFrequencies from "../../apiHooks/getFrequencyGraph";
import Spinner from "../../components/Spinner";
import PageTemplate from "../../components/PageTemplate";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrl, buildUrlForMultiSelect } from "../../Utils/functions";

export default function Frequencies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [theory, setTheory] = React.useState();
  const [selectedTechniques, setSelectedTechniques] = React.useState([]);
  const navigate = useNavigate();
  const pageName = "frequencies";

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
        theory: theory?.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
      })
  );

  let indexedDataList = [];

  for (let i = 0; i < data?.data.length; i++) {
    const item = data?.data[i];
    const objectsList = item.series;
    const indexedObjects = objectsList.map((innerObject) => {
      innerObject["index"] = i; // flatten the data structure & index each data point according to what cluster it was originally
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
      const selectedValues = queryParams.getAll("techniques");
      setSelectedTechniques(
        selectedValues.map((item) => ({ value: item, label: item }))
      );
    }
    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  // useEffect to state the initial values on mount (insert all options or take from url)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const techniquesOnURL = queryParams.getAll("techniques");
    if (configSuccess) {
      if (techniquesOnURL.length === 0) {
        buildUrlForMultiSelect(
          techniques,
          "techniques",
          searchParams,
          navigate
        );
      } else {
        setSelectedTechniques(
          techniquesOnURL.map((x) => ({ value: x, label: x }))
        );
      }
    }
  }, [configSuccess]);

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
                      buildUrl(pageName, "theory", e?.value, navigate);
                    }}
                  />
                  <Text flexed size={14}>
                    Theory Family
                    <FilterExplanation tooltip="few more words about Thory" />
                  </Text>
                </div>
                <div className={sideSectionClass}>
                  <Select
                    closeMenuOnSelect={true}
                    isMulti={true}
                    value={selectedTechniques}
                    options={techniques}
                    placeholder="Techniques"
                    onChange={(e) => {
                      buildUrlForMultiSelect(
                        e,
                        "techniques",
                        searchParams,
                        navigate
                      );
                    }}
                  />

                  <Text flexed size={14}>
                    Technique
                    <FilterExplanation tooltip="few more words about techniques" />
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

                <CSV data={data} />
                <Reset pageName={pageName} />
              </SideControl>
            }
            graph={
              <div style={{ height: "calc(100% - 100px)" }}>
                <TopGraphText
                  text={graphsHeaders[7].figureText}
                  firstLine={graphsHeaders[7].figureLine}
                />

                {isLoading ? (
                  <Spinner />
                ) : (
                  <div className="h-full flex gap-4 items-center">
                    <Plot
                      data={traces}
                      style={{ width: "100%", height: "100%" }}
                      config={{ displayModeBar: !isMoblile, responsive: true }}
                      layout={{
                        autosize: true,
                        barmode: "stack",
                        // width: isMoblile
                        //   ? screenWidth
                        //   : screenWidth - sideWidth - 300,
                        // height: screenHeight - 360,

                        margin: { autoexpand: true, l: 50 },
                        showlegend: false,
                        yaxis: {
                          title: " Experment Index",
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
                    <div className="mr-20">
                      {Object.values(FrequenciesColors).map((color, index) => (
                        <div
                          className="flex justify-start items-center gap-2 mt-3"
                          id="color"
                          key={color}>
                          <div
                            className="w-5 h-5 "
                            style={{ backgroundColor: color }}></div>
                          <Text>{Object.keys(FrequenciesColors)[index]}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            }
          />

          {/* {!isMoblile && screenHeight > 500 && (
            <div
              className=" fixed top-52 right-24 h-[150px]"
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
          )} */}
        </div>
      )}
    </div>
  );
}
