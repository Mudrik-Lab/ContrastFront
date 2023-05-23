import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";

import {
  FilterExplanation,
  Label,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import TagsSelect from "../../components/TagsSelect";
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
import { rawTextToShow } from "../../Utils/functions";
import { designerColors } from "../../Utils/Colors";
import { graphsHeaders } from "../../Utils/GraphsDetails";

export default function AcrossTheYears() {
  const [selected, setSelected] = useState(parametersOptions[0]);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);

  const { data, isSuccess, isLoading } = useQuery(
    [
      `across_the_years${
        selected.value +
        " " +
        reporting +
        " " +
        experimentsNum +
        " " +
        consciousness
      }`,
    ],
    () =>
      getAcrossTheYears({
        breakdown: selected.value,
        is_reporting: reporting,
        min_number_of_experiments: experimentsNum,
        type_of_consciousness: consciousness,
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
                setNumber={setExperimentsNum}
              />
            </div>

            <div className={sideSectionClass}>
              <TagsSelect
                options={parametersOptions}
                value={selected}
                onChange={setSelected}
              />
              <Text size={14} flexed>
                Parameter of interest
                <FilterExplanation tooltip="Choose the dependent variable to be queried." />
              </Text>
            </div>
            <TypeOfConsciousnessFilter
              checked={consciousness}
              setChecked={setConsciousness}
            />
            <ReportFilter checked={reporting} setChecked={setReporting} />
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
