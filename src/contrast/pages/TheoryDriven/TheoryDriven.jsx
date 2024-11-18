import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import {
  isMoblile,
  plotConfig,
  screenHeight,
  screenWidth,
  sideSectionClass,
} from "../../../Utils/HardCoded";
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
} from "../../../sharedComponents/Reusble";
import getExperimentsGraphs from "../../../apiHooks/getExperimentsGraphs";
import Toggle from "../../../sharedComponents/Toggle";
import Spinner from "../../../sharedComponents/Spinner";
import {
  analyticsPlotInteraction,
  buildUrl,
  rawTextToShow,
} from "../../../Utils/functions";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { designerColors } from "../../../Utils/Colors";
import { useNavigate, useSearchParams } from "react-router-dom";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function TheoryDriven() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [interpretation, setInterpretation] = React.useState();
  const [isSpecificTheory, setIsSpecificTheory] = React.useState(false);

  const navigate = useNavigate();
  const pageName = "theory-driven";

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
        (interpretation === "true" ? "challenges" : "pro")
      }`,
    ],
    () =>
      getExperimentsGraphs({
        graphName: "theory_driven_distribution_pie",
        is_reporting: reporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
        interpretation: interpretation === "true" ? "challenges" : "pro",
      })
  );

  const values1 = [];
  const labels1 = [];
  const values2 = [];
  const labels2 = [];
  const cleanLabels2 = [];

  const chartsData = data?.data;
  chartsData?.map((x, index) => {
    values1.push(x.value);
    labels1.push(x.series_name);
    x.series.map((y) => {
      values2.push(y.value);
      labels2.push(`<span id=${index} >` + y.key + "</span>");
      cleanLabels2.push(y.key);
    });
  });

  const keysArr = [];
  chartsData?.map((theory) =>
    theory.series.map((row) => keysArr.push(row.key))
  );
  const trimedKeysArr = [...new Set(keysArr)];
  const liadChosenColors = [
    "#44976C",
    "#c4b815",
    "#774B84",
    "#6A57B1",
    "#B24362",
    "#38176B",
    "#2775AB",
    "#9E4C07",
    "#074D54",
    "#084154",
    "#A6000A",
    "#948B0C",
  ];
  // const someColors = designerColors.slice(0, trimedKeysArr.length);
  const someColors = liadChosenColors.slice(0, trimedKeysArr.length);
  const keysColors = {};
  [...new Set(trimedKeysArr)]?.sort().map((key, index) => {
    keysColors[key] = someColors[index];
  });
  const graphData = [
    {
      //inner
      direction: "clockwise",
      insidetextorientation: "horizontal",
      values: values1,
      labels: labels1.map((label) => rawTextToShow(label)),
      type: "pie",
      hovertemplate: "%{label}: %{value} <extra></extra>",
      textinfo: "label+number",
      textposition: "inside",
      automargin: true,
      domain: { x: [0.5, 0.5], y: [0.3, 0.7] },
      textfont: { size: 24 },
      marker: {
        colors: labels1.map((label) =>
          label === "post-hoc"
            ? "#575456"
            : label === "mentioning"
            ? "#C2C2C2"
            : "#858585"
        ),
        line: { width: 1, color: "white" },
      },
    },
    {
      //outer
      direction: "clockwise",
      insidetextorientation: "horizontal",
      values: values2,
      labels: labels2,
      sort: false,
      type: "pie",
      hovertemplate: "%{label}: %{value} <extra></extra>",
      textinfo: "label+value",
      hole: 0.4,
      textposition: "inside",
      automargin: true,
      textfont: { size: 20 },
      marker: {
        colors: cleanLabels2.map((label) => keysColors[label]),
        line: { width: 1, color: "white" },
      },
    },
  ];

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

    if (queryParams.get("interpretation")) {
      queryParams.get("interpretation") === "true"
        ? setInterpretation(true)
        : setInterpretation(false);
      setInterpretation(queryParams.get("interpretation"));
    } else {
      setInterpretation(true);
    }

    navigate({ search: queryParams.toString() });
    analyticsPlotInteraction(searchParams, pageName);
  }, [searchParams]);
  return (
    <PageTemplate
      control={
        <SideControl headline="Theory Driven Distribution Pie">
          <Text lg weight="bold">
            Axis Controls
          </Text>
          <RangeInput
            number={experimentsNum}
            setNumber={(e) => {
              buildUrl(pageName, "min_number_of_experiments", e, navigate);
            }}
          />
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
          <div className={sideSectionClass}>
            <div className="flex justify-center items-center gap-3 mt-3">
              <Text>Supports</Text>
              <Toggle
                checked={interpretation === "true" ? true : false}
                setChecked={(e) => {
                  buildUrl(pageName, "interpretation", e, navigate);
                }}
              />{" "}
              <Text>Challenges</Text>
            </div>
            <TooltipExplanation
              text="Interpretation"
              tooltip="You can choose to filter the results by experiments that support at least one theory, or challenge at least one theory. "
            />
          </div>
          <div className="w-full flex items-center justify-between my-4">
            <CSV data={data} />
            <Reset pageName={pageName} />
          </div>
        </SideControl>
      }
      graph={
        <div className="h-full">
          <TopGraphText
            text={graphsHeaders["Theory Driven"].figureText}
            firstLine={graphsHeaders["Theory Driven"].figureLine}
            legendLine={graphsHeaders["Theory Driven"].legendLine}
          />
          {isLoading ? (
            <Spinner />
          ) : chartsData.length ? (
            <Plot
              onClick={(e) => {
                setIsSpecificTheory(!isSpecificTheory);
                isSpecificTheory
                  ? buildUrl(pageName, "theory_driven", "either", navigate)
                  : e.points[0].label === "Post Hoc"
                  ? buildUrl(pageName, "theory_driven", "post-hoc", navigate)
                  : e.points[0].label === "Driven"
                  ? buildUrl(pageName, "theory_driven", "driven", navigate)
                  : e.points[0].label === "Mentioning"
                  ? buildUrl(pageName, "theory_driven", "mentioning", navigate)
                  : buildUrl(pageName, "theory_driven", "either", navigate);
              }}
              data={graphData}
              config={plotConfig}
              layout={{
                width: isMoblile ? screenWidth : screenHeight,
                height: isMoblile ? screenWidth : screenHeight,
                showlegend: false,
                annotations: [{ showarrow: false, text: "" }],
              }}
            />
          ) : (
            <NoResults />
          )}
        </div>
      }
    />
  );
}
