import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  CSV,
  RangeInput,
  ReportFilter,
  Reset,
  SideControl,
  SignificanceFilter,
  Text,
  TooltipExplanation,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../../sharedComponents/Reusble";
import {
  footerHeight,
  isMoblile,
  plotConfig,
  screenHeight,
  screenWidth,
  sideSectionClass,
  sideWidth,
  uncontrastParametersOptions,
} from "../../../Utils/HardCoded";
import getAcrossTheYears from "../../../apiHooks/getAcrossTheYearsGraph";
import Spinner from "../../../sharedComponents/Spinner";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import {
  alphabetizeByLabels,
  buildUrl,
  rawTextToShow,
} from "../../../Utils/functions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function AcrossTheYears() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [significance, setSignificance] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const navigate = useNavigate();
  const pageName = "trends-over-time";
  const uniqUncontrastParametersOptions = [
    ...uncontrastParametersOptions,
    {
      value: "significance",
      label: "Significance",
    },
  ];

  console.log(uniqUncontrastParametersOptions);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      "across_the_years",
      "uncontrast",
      significance,
      experimentsNum,
      selected?.value || uniqUncontrastParametersOptions[0].value,
    ],
    queryFn: () =>
      getAcrossTheYears({
        significance,
        min_number_of_experiments: experimentsNum,
        breakdown: selected?.value || uniqUncontrastParametersOptions[0].value,
        isUncontrast: true,
      }),
  });

  const graphsData = [];
  data?.data.map((row) => {
    graphsData.push({
      x: row.series.map((a) => a.year),
      y: row.series.map((a) => a.value),
      type: "scatter",
      name: rawTextToShow(
        row.series_name === "True"
          ? "Yes"
          : row.series_name === "False"
          ? "No"
          : row.series_name
      ),
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

    queryParams.get("significance")
      ? setSignificance(queryParams.get("significance"))
      : setSignificance("either");

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    if (queryParams.get("breakdown")) {
      const breakdownValue = queryParams.get("breakdown");
      setSelected({
        value: breakdownValue,
        label: uniqUncontrastParametersOptions.find(
          (item) => item.value === breakdownValue
        )?.label,
      });
    } else {
      setSelected(uniqUncontrastParametersOptions[0]);
    }

    navigate({ search: queryParams.toString() });
  }, [searchParams]);
  return (
    <div>
      <PageTemplate
        control={
          <SideControl headline={"Trends over time"}>
            <Text color="blue" weight="bold" xl3></Text>

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
                options={uniqUncontrastParametersOptions}
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

            <SignificanceFilter
              checked={significance}
              setChecked={(e) => {
                buildUrl(pageName, "significance", e, navigate);
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
                    title: { text: "Years", font: { size: 28 } },
                    zeroline: true,
                    showgrid: false,
                    tickfont: {
                      size: 20,
                      standoff: 50,
                    },
                  },
                  yaxis: {
                    showgrid: false,
                    title: {
                      text: "Number of experiments",
                      font: { size: 28 },
                    },
                    zeroline: true,
                    side: "top",
                    tickfont: {
                      size: 20,
                      standoff: 50,
                    },
                    tickmode: "linear",
                    dtick: Math.max(...highestY) > 20 ? 20 : 1,
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
                  width: screenWidth - sideWidth,
                  height: screenHeight - footerHeight - 150,
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
