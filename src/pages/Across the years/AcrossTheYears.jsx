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
import { rawTeaxtToShow } from "../../Utils/functions";

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
      name: rawTeaxtToShow(row.series_name),
      mode: "lines+markers",
    });
  });

  return (
    <div>
      <PageTemplate
        control={
          <SideControl headline={"Across the Years"}>
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
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
              firstLine="The graph depicts the cumulative distribution of experiments according to the selected parameter values over time."
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <Plot
                data={graphsData}
                layout={{
                  autosize: false,
                  showlegend: !isMoblile,
                  legend: {
                    x: 1,
                    xanchor: "left",
                    y: 1,
                    font: {
                      size: 18,
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
                  width: isMoblile ? screenWidth : screenWidth - 400,
                  height: screenHeight - 300,
                }}
              />
            )}
          </div>
        }
      />
    </div>
  );
}
