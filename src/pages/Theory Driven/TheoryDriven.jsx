import { useQuery } from "@tanstack/react-query";
import React from "react";
import { isMoblile, screenHeight, screenWidth } from "../../Utils/HardCoded";
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
import Toggle from "../../components/Toggle";
import Spinner from "../../components/Spinner";
import { rawTextToShow, showTextToRaw } from "../../Utils/functions";
import PageTemplate from "../../components/PageTemplate";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { designerColors } from "../../Utils/Colors";

export default function TheoryDriven() {
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [interpretation, setInterpretation] = React.useState(true);
  const [graphData, setGraphData] = React.useState([]);

  const { data, isLoading, isSuccess } = useQuery(
    [
      `theory_driven_distribution_pie${
        +" " +
        consciousness +
        " " +
        reporting +
        " " +
        experimentsNum +
        " " +
        theoryDriven +
        " " +
        (interpretation ? "pro" : "challenges")
      }`,
    ],
    () =>
      getExperimentsGraphs({
        graphName: "theory_driven_distribution_pie",
        is_reporting: reporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
        interpretation: interpretation ? "pro" : "challenges",
      })
  );

  const values1 = [];
  const labels1 = [];
  const values2 = [];
  const labels2 = [];
  const cleanLabels2 = [];

  data?.data.map((x, index) => {
    values1.push(x.value);
    labels1.push(x.series_name);
    x.series.map((y) => {
      values2.push(y.value);
      labels2.push(`<span id=${index} >` + y.key + "</span>");
      cleanLabels2.push(y.key);
    });
  });

  const chartsData = data?.data;
  const keysArr = [];
  chartsData?.map((theory) =>
    theory.series.map((row) => keysArr.push(row.key))
  );
  const trimedKeysArr = [...new Set(keysArr)];
  const someColors = designerColors.slice(0, trimedKeysArr.length);
  const keysColors = {};
  [...new Set(trimedKeysArr)]?.sort().map((key, index) => {
    keysColors[key] = someColors[index];
  });

  const initialGraphData = [
    {
      direction: "clockwise",
      insidetextorientation: "radial",
      values: values1,
      labels: labels1.map((label) => rawTextToShow(label)),
      type: "pie",
      textinfo: "label+number",
      textposition: "inside",
      domain: { x: [0.5, 0.5], y: [0.3, 0.7] },
      marker: {
        colors: designerColors.slice(28, 31),
        line: { width: 1, color: "white" },
      },
    },
    {
      direction: "clockwise",
      insidetextorientation: "tangential",
      values: values2,
      labels: labels2,
      sort: false,
      type: "pie",
      textinfo: "label+value",
      hole: 0.4,
      textposition: "inside",

      marker: {
        colors: cleanLabels2.map((label) => keysColors[label]),
        line: { width: 1, color: "white" },
      },
    },
  ];
  isSuccess && graphData.length === 0 && setGraphData(initialGraphData);

  function secondaryPie(seriesName) {
    const secondaryData =
      seriesName.label === "Post Hoc"
        ? data?.data[0]
        : seriesName.label === "Driven"
        ? data?.data[1]
        : data?.data[2];
    console.log(secondaryData);

    const color = seriesName.color;

    setGraphData([
      {
        //inner pie
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
        domain: { x: [0.5, 0.5], y: [0.3, 0.7] },
        marker: {
          colors: [color],
          line: { width: 1, color: "white" },
        },
      },
      {
        //outer pie
        direction: "clockwise",
        insidetextorientation: "tangential",
        values: secondaryData.series.map((row) => row.value),
        labels: secondaryData.series.map((row) => row.key),
        sort: false,
        type: "pie",
        hovertemplate: "%{label}: %{value}<br> %{percent} <extra></extra>",
        textinfo: "label+percent",
        hole: 0.4,
        textposition: "inside",

        marker: {
          colors: cleanLabels2.map((label) => keysColors[label]),
          line: { width: 1, color: "white" },
        },
      },
    ]);
  }
  return (
    <PageTemplate
      control={
        <SideControl headline="Theory Driven Distribution Pie">
          <Text md weight="bold">
            Axis Controls
          </Text>
          <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />
          <TypeOfConsciousnessFilter
            checked={consciousness}
            setChecked={setConsciousness}
          />
          <ReportFilter checked={reporting} setChecked={setReporting} />
          {/* <TheoryDrivenFilter
            checked={theoryDriven}
            setChecked={setTheoryDriven} */}
          />
          <div className="flex justify-center items-center gap-3 mt-3">
            <Text>Challenges</Text>
            <Toggle
              checked={interpretation}
              setChecked={() => setInterpretation(!interpretation)}
            />
            <Text>Supports</Text>
          </div>
          <FilterExplanation
            text="Interpretation"
            tooltip="You can choose to filter the results by experiments that support at least one theory, or challenge at least one theory. "
          />
        </SideControl>
      }
      graph={
        <div>
          <TopGraphText
            text={graphsHeaders[5].figureText}
            firstLine={graphsHeaders[5].figureLine}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            graphData.length && (
              <div>
                {graphData[0].name !== "drilled" ? (
                  <Plot
                    onClick={(e) => {
                      theoryDriven === "either"
                        ? e.label === "Post Hoc"
                          ? setTheoryDriven("post-hoc")
                          : e.label === "Driven"
                          ? setTheoryDriven("driven")
                          : setTheoryDriven("mentioning")
                        : setTheoryDriven("either");
                    }}
                    // onClick={(e) => {
                    //   console.log(e);
                    //   secondaryPie(e.points[0]);
                    // }}
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
                    // onClick={(e) => {
                    //   setGraphData(initialGraphData);
                    // }}
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
