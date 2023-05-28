import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Select from "react-select";
import {
  FilterExplanation,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import {
  isMoblile,
  parametersOptions,
  screenHeight,
  screenWidth,
  sideSectionClass,
} from "../../Utils/HardCoded";
import getAcrossTheYears from "../../apiHooks/getAcrossTheYearsGraph";
import Spinner from "../../components/Spinner";
import PageTemplate from "../../components/PageTemplate";
import { buildUrl, rawTextToShow } from "../../Utils/functions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { graphsHeaders } from "../../Utils/GraphsDetails";

export default function AcrossTheYears() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();

  const navigate = useNavigate();
  const pageName = "trends-over-time";

  const { data, isSuccess, isLoading } = useQuery(
    [
      `across_the_years${
        consciousness +
          " " +
          reporting +
          " " +
          experimentsNum +
          " " +
          selected?.value || parametersOptions[0].value
      }`,
    ],
    () =>
      getAcrossTheYears({
        type_of_consciousness: consciousness,
        is_reporting: reporting,
        min_number_of_experiments: experimentsNum,
        breakdown: selected?.value || parametersOptions[0].value,
      })
  );

  const graphsData = [];
  data?.data.map((row) => {
    graphsData.push({
      x: row.series.map((a) => a.year),
      y: row.series.map((a) => a.value),
      type: "scatter",
      name: rawTextToShow(row.series_name),
      mode: "lines+markers",
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

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    if (queryParams.get("breakdown")) {
      setSelected({
        value: queryParams.get("breakdown"),
        label: rawTextToShow(queryParams.get("breakdown")),
      });
    } else {
      setSelected(parametersOptions[0]);
    }

    navigate({ search: queryParams.toString() });
  }, [searchParams]);
  return (
    <div>
      <PageTemplate
        control={
          <SideControl headline={"Trends over time"}>
            <Text color="blue" weight="bold" size={30}></Text>

            <Text weight="bold" md>
              Axis Controls
            </Text>
            <div className="w-full py-5 flex flex-col items-center gap-3 ">
              <RangeInput
                number={experimentsNum}
                setNumber={(e) => {
                  buildUrl(pageName, "min_number_of_experiments", e, navigate);
                }}
              />
            </div>

            <div className={sideSectionClass}>
              <Select
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable={false}
                options={parametersOptions}
                value={selected}
                onChange={(e) => {
                  buildUrl(pageName, "breakdown", e.value, navigate);
                }}
              />
              <Text size={14} flexed>
                Parameter of interest
                <FilterExplanation tooltip="Choose the dependent variable to be queried." />
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
          </SideControl>
        }
        graph={
          <div>
            <TopGraphText
              text={graphsHeaders[4].figureText}
              firstLine={graphsHeaders[4].figureLine}
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <Plot
                data={graphsData}
                layout={{
                  xaxis: {
                    title: "Years",
                  },
                  yaxis: {
                    title: "Number of experiments",
                  },
                  autosize: false,
                  showlegend: !isMoblile,
                  legend: {
                    x: 1,
                    xanchor: "left",
                    y: 1,
                    font: {
                      size: 16,
                      color: "#000000",
                    },
                  },
                  hoverlabel: {
                    namelength: 40,
                    font: {
                      family: "Arial",
                      size: 12,
                      color: "#FFFFFF",
                    },
                  },
                  width: isMoblile ? screenWidth : screenWidth - 370,
                  height: screenHeight - 200,
                }}
              />
            )}
          </div>
        }
      />
    </div>
  );
}
