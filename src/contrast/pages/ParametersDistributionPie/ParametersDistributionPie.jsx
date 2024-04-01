import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import {
  isMoblile,
  parametersOptions,
  plotConfig,
  screenHeight,
  sideSectionClass,
} from "../../Utils/HardCoded";
import {
  CSV,
  TooltipExplanation,
  RangeInput,
  ReportFilter,
  Reset,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../.././sharedComponents/Reusble";
import getExperimentsGraphs from "../../apiHooks/getExperimentsGraphs";

import Spinner from "../.././sharedComponents/Spinner";
import {
  hexToRgba,
  rawTextToShow,
  showTextToRaw,
  buildUrl,
} from "../../Utils/functions";
import PageTemplate from "../.././sharedComponents/PageTemplate";
import { designerColors } from "../../Utils/Colors";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoResults from "../.././sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function ParametersDistributionPie() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState(parametersOptions[0]);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [graphData, setGraphData] = React.useState([]);

  const navigate = useNavigate();
  const pageName = "parameter-distribution-pie";

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      "parameters_distribution_pie",
      selected.value,
      consciousness,
      reporting,
      experimentsNum,
      theoryDriven,
    ],
    queryFn: () =>
      getExperimentsGraphs({
        graphName: "parameters_distribution_pie",
        breakdown: selected.value,
        is_reporting: reporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
      }),
  });

  const values1 = [];
  const labels1 = [];
  const outsideColors = [];
  const values2 = [];
  const labels2 = [];

  data?.data?.map((x, index) => {
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
      values: values1,
      labels: labels1,
      type: "pie",
      textinfo: "label+number",
      hovertemplate: "%{label}: %{value} <extra></extra>",
      textposition: "inside",
      insidetextorientation: "horizontal",
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
      insidetextorientation: "horizontal",
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
        row.series_name.toLowerCase() === seriesName.label.toLowerCase() ||
        row.series_name.toLowerCase() ===
          showTextToRaw(seriesName.label.toLowerCase())
    );

    const color = seriesName.color;

    setGraphData([
      //inner pie
      {
        name: "drilled",
        direction: "clockwise",
        insidetextorientation: "horizontal",
        values: [1],
        labels: [rawTextToShow(secondaryData.series_name)],
        sort: false,
        type: "pie",
        hovertemplate: "%{label} <extra></extra>",
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
        insidetextorientation: "horizontal",
        values: secondaryData.series.map((row) => row.value),
        labels: secondaryData.series.map((row) => row.key),
        sort: false,
        type: "pie",
        hovertemplate: "%{label}: %{value} <extra></extra>",
        textinfo: "label+value",
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
    <PageTemplate
      control={
        <SideControl headline={" Parameters Distribution Pie"}>
          <Text lg weight="bold">
            Axis Controls
          </Text>
          <RangeInput
            number={experimentsNum}
            setNumber={(e) => {
              buildUrl(pageName, "min_number_of_experiments", e, navigate);
            }}
          />
          <div className={sideSectionClass}>
            <Select
              className="text-lg w-[300px]"
              closeMenuOnSelect={true}
              isMulti={false}
              isClearable={false}
              options={parametersOptions}
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
            text={graphsHeaders[4].figureText}
            legendLine={graphsHeaders[4].legendLine}
            firstLine={graphsHeaders[4].figureLine}
          />
          {isLoading ? (
            <Spinner />
          ) : data?.data.length ? (
            graphData.length && (
              <div>
                {graphData[0].name !== "drilled" ? (
                  <Plot
                    onClick={(e) => {
                      secondaryPie(e.points[0]);
                    }}
                    data={initialGraphData}
                    config={plotConfig}
                    layout={{
                      width: screenHeight,
                      height: screenHeight,
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
                      width: screenHeight,
                      height: screenHeight,
                      showlegend: false,
                      annotations: [{ showarrow: false, text: "" }],
                    }}
                  />
                )}
              </div>
            )
          ) : (
            <NoResults />
          )}
        </div>
      }
    />
  );
}
