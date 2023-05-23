import { useQuery } from "@tanstack/react-query";
import React from "react";

import {
  isMoblile,
  parametersOptions,
  screenWidth,
  sideSectionClass,
} from "../../Utils/HardCoded";
import {
  FilterExplanation,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import Spinner from "../../components/Spinner";
import { hexToRgba, rawTextToShow, showTextToRaw } from "../../Utils/functions";
import PageTemplate from "../../components/PageTemplate";
import { designerColors } from "../../Utils/Colors";
import { graphsHeaders } from "../../Utils/GraphsDetails";

export default function ParametersDistributionPie() {
  const [selected, setSelected] = React.useState(parametersOptions[0]);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [graphData, setGraphData] = React.useState([]);

  const { data, isSuccess, isLoading } = useQuery(
    [
      `parameters_distribution_pie${
        +" " +
        selected.value +
        " " +
        consciousness +
        " " +
        reporting +
        " " +
        experimentsNum +
        " " +
        theoryDriven
      }`,
    ],
    () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_pie",
        breakdown: selected.value,
        is_reporting: reporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
      })
  );
  console.log(data?.data);
  const values1 = [];
  const labels1 = [];
  const outsideColors = [];
  const values2 = [];
  const labels2 = [];

  data?.data.map((x, index) => {
    values1.push(x.value);
    labels1.push(rawTextToShow(x.series_name));
    x.series.map((y) => {
      values2.push(y.value);
      labels2.push(`<span id=${index} >` + y.key + "</span>");
      outsideColors.push(
        hexToRgba(designerColors[index])?.slice(0, -2) + "0.7)"
      );
    });
  });

  const initialGraphData = [
    //inner pie
    {
      direction: "clockwise",
      insidetextorientation: "radial",
      values: values1,
      labels: labels1,
      type: "pie",
      textinfo: "label+number",
      hovertemplate: "%{label}: %{value}<br> %{percent} <extra></extra>",
      textposition: "inside",
      insidetextorientation: "radial",
      hole: 0.1,
      domain: { x: [0, 1], y: [0.125, 0.875] },
      marker: {
        colors: designerColors,
        line: { width: 1, color: "white" },
      },
    },
    // outside pie
    {
      direction: "clockwise",
      insidetextorientation: "tangential",
      values: values2,
      labels: labels2,
      sort: false,
      type: "pie",
      hovertemplate: "%{label}: %{value} <extra></extra>",
      textinfo: "label+value",
      hole: 0.75,
      textposition: "inside",
      domain: { x: [0, 1], y: [0, 1] },
      marker: {
        colors: outsideColors,
        line: { width: 1, color: "white" },
      },
    },
  ];
  isSuccess && graphData.length === 0 && setGraphData(initialGraphData);

  function secondaryPie(seriesName) {
    const secondaryData = data?.data.find(
      (row) =>
        row.series_name === seriesName.label ||
        row.series_name === showTextToRaw(seriesName.label) ||
        row.series_name.toLowerCase() === seriesName.label.toLowerCase()
    );
    console.log(secondaryData);

    const color = seriesName.color;

    setGraphData([
      //inner pie
      {
        name: "drilled",
        direction: "clockwise",
        insidetextorientation: "radial",
        values: [1],
        labels: [rawTextToShow(secondaryData.series_name)],
        sort: false,
        type: "pie",
        hovertemplate: "<extra></extra>",
        textinfo: "label",
        textfont: { size: 30 },
        textposition: "inside",
        hole: 0,
        domain: { x: [0, 1], y: [0.3, 0.7] },
        marker: {
          colors: [color],
          line: { width: 1, color: "white" },
        },
      },
      // outside pie
      {
        direction: "clockwise",
        insidetextorientation: "radial",
        values: secondaryData.series.map((row) => row.value),
        labels: secondaryData.series.map((row) => row.key),
        sort: false,
        type: "pie",
        hovertemplate: "%{label}: %{value}<br> %{percent} <extra></extra>",
        textinfo: "label+percent",
        hole: 0.4,
        textposition: "inside",
        domain: { x: [0, 1], y: [0, 1] },
        marker: {
          colors: Array(secondaryData.series.length).fill(color),
          line: { width: 1, color: "white" },
        },
      },
    ]);
  }

  return (
    <PageTemplate
      control={
        <SideControl headline={" Parameters Distribution Pie"}>
          <Text md weight="bold">
            Axis Controls
          </Text>
          <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />

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
          <TheoryDrivenFilter
            checked={theoryDriven}
            setChecked={setTheoryDriven}
          />
        </SideControl>
      }
      graph={
        <div>
          <TopGraphText
            text={graphsHeaders[3].figureText}
            firstLine={graphsHeaders[3].figureLine}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            graphData.length && (
              <div>
                {graphData[0].name !== "drilled" ? (
                  <Plot
                    onClick={(e) => {
                      console.log(e);
                      secondaryPie(e.points[0]);
                    }}
                    data={initialGraphData}
                    config={{ displayModeBar: !isMoblile }}
                    layout={{
                      width: isMoblile ? screenWidth : 1200,
                      height: isMoblile ? screenWidth : 1000,
                      showlegend: false,
                      annotations: [{ showarrow: false, text: "" }],
                    }}
                  />
                ) : (
                  <Plot
                    onClick={(e) => {
                      setGraphData(initialGraphData);
                    }}
                    data={graphData}
                    config={{ displayModeBar: !isMoblile }}
                    layout={{
                      width: isMoblile ? screenWidth : 1200,
                      height: isMoblile ? screenWidth : 1000,
                      showlegend: false,

                      annotations: [{ showarrow: false, text: "" }],
                    }}
                  />
                )}
              </div>
            )
          )}
        </div>
      }
    />
  );
}
