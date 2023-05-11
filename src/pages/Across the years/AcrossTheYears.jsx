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
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import TagsSelect from "../../components/TagsSelect";
import Navbar from "../../components/Navbar";
import {
  navHeight,
  parametersOptions,
  sideWidth,
} from "../../components/HardCoded";
import getAcrossTheYears from "../../apiHooks/getAcrossTheYearsGraph";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

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
      name: row.series_name,
      mode: "lines+markers",
    });
  });
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  screenHeight;

  return (
    <div>
      <Navbar />
      <div className="flex mt-14 p-2">
        <SideControl headline={"Across the Years"}>
          <Text color="blue" weight="bold" size={30}></Text>

          <Text weight="bold" md>
            Axis Controls
          </Text>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />
            <Label>min. # of experiments</Label>
          </div>

          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <Text md flexed weight={"bold"}>
              Parameters
              <FilterExplanation tooltip="few more words about Theory" />
            </Text>
            <TagsSelect
              options={parametersOptions}
              value={selected}
              onChange={setSelected}
            />
          </div>
          <TypeOfConsciousnessFilter
            checked={consciousness}
            setChecked={setConsciousness}
          />
          <ReportFilter checked={reporting} setChecked={setReporting} />
        </SideControl>

        <div className="w-full h-full" style={{ marginLeft: sideWidth }}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Plot
              data={graphsData}
              layout={{
                autosize: false,
                showlegend: true,
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
                width: screenWidth - 338,
                height: screenHeight - 120,
              }}
            />
          )}
        </div>
      </div>
      <Footer isFixed={true} />
    </div>
  );
}
