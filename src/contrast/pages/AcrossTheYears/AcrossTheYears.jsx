import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  CSV,
  TooltipExplanation,
  RangeInput,
  ReportFilter,
  Reset,
  SideControl,
  Text,
  TopGraphText,
  TypeOfConsciousnessFilter,
  RadioInput,
} from "../../../sharedComponents/Reusble";
import {
  footerHeight,
  isMoblile,
  parametersOptions,
  plotConfig,
  screenHeight,
  screenWidth,
  sideSectionClass,
  sideWidth,
} from "../../../Utils/HardCoded";
import getAcrossTheYears from "../../../apiHooks/getAcrossTheYearsGraph";
import Spinner from "../../../sharedComponents/Spinner";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { buildUrl, rawTextToShow } from "../../../Utils/functions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function AcrossTheYears() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [inrerpretation, setInrerpretation] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();

  const navigate = useNavigate();
  const pageName = "trends-over-time";
  const breakdownOptions = parametersOptions.concat([
    {
      value: "theory",
      label: "Theory",
    },
  ]);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      "across_the_years",
      consciousness,
      reporting,
      experimentsNum,
      inrerpretation,
      selected?.value || breakdownOptions[0].value,
    ],
    queryFn: () =>
      getAcrossTheYears({
        type_of_consciousness: consciousness,
        is_reporting: reporting,
        inrerpretation,
        min_number_of_experiments: experimentsNum,
        breakdown: selected?.value || breakdownOptions[0].value,
      }),
  });

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

  let highestY = [];
  if (data) {
    highestY = data?.data
      .map((row) => row.series.slice(-1).map((x) => x.value))
      .flat();
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("is_reporting")
      ? setReporting(queryParams.get("is_reporting"))
      : setReporting("either");

    queryParams.get("inrerpretation")
      ? setInrerpretation(queryParams.get("inrerpretation"))
      : setInrerpretation("either");

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
      setSelected(breakdownOptions[0]);
    }

    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  const queryParams = new URLSearchParams(location.search);
  return (
    <div>
      <PageTemplate
        control={
          <SideControl headline={"Trends over time"}>
            <Text color="blue" weight="bold" className="text-3xl"></Text>

            <Text weight="bold" lg>
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
                className="text-lg w-[300px]"
                aria-label="parameter of interest"
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable={false}
                options={breakdownOptions}
                value={selected}
                onChange={(e) => {
                  buildUrl(pageName, "breakdown", e.value, navigate);
                }}
              />

              <TooltipExplanation
                text={"Parameter of interest"}
                tooltip="Choose the dependent variable to be queried."
              />
            </div>
            <TypeOfConsciousnessFilter
              checked={consciousness}
              setChecked={(e) => {
                buildUrl(pageName, "type_of_consciousness", e, navigate);
              }}
            />

            {queryParams.get("breakdown") === "theory" && (
              <div className={sideSectionClass}>
                <RadioInput
                  name="inrerpretation"
                  values={[
                    { value: "pro", name: "Support" },
                    { value: "challenge", name: "Challenge" },
                    { value: "either", name: "Either" },
                  ]}
                  checked={inrerpretation}
                  setChecked={setInrerpretation}
                />
                <TooltipExplanation
                  text="Type of consciousness"
                  tooltip="You can use this to filter the result so to include only experiments that studied content consciousness,state consciousness, both types of consciousness in the same experiment (an AND operator), or either (show all experiments that studied either content or state consciousness; an OR operator)"
                />
              </div>
            )}
            <ReportFilter
              checked={reporting}
              setChecked={(e) => {
                buildUrl(pageName, "is_reporting", e, navigate);
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
              text={graphsHeaders["Trends Over Time"].figureText}
              firstLine={graphsHeaders["Trends Over Time"].figureLine}
            />
            {isLoading ? (
              <Spinner />
            ) : graphsData.length ? (
              <Plot
                data={graphsData}
                config={plotConfig}
                layout={{
                  xaxis: {
                    showgrid: false,
                    title: {
                      text: "Years",
                      font: { size: 28 },
                      standoff: 10,
                    },
                    zeroline: true,
                    side: "bottom",
                    tickfont: {
                      size: 20,
                      standoff: 50,
                    },
                  },
                  yaxis: {
                    showline: true,
                    showgrid: false,
                    zeroline: true,
                    title: {
                      text: "Number of experiments",
                      font: { size: 24 },
                    },
                    tickfont: {
                      size: 20,
                      standoff: 50,
                    },
                    dtick: Math.max(...highestY) > 20 ? 20 : 1,
                  },
                  autosize: false,
                  showlegend: true,
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
                  width: screenWidth - sideWidth,
                  height: screenHeight - footerHeight,
                }}
              />
            ) : (
              <NoResults />
            )}
          </div>
        }
      />
    </div>
  );
}
