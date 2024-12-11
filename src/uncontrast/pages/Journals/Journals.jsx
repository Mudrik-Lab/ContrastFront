import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CSV,
  RangeInput,
  Reset,
  SideControl,
  Text,
  TopGraphText,
  SignificanceFilter,
} from "../../../sharedComponents/Reusble";
import {
  plotConfig,
  screenWidth,
  sideWidth,
  xAxisConfig,
} from "../../../Utils/HardCoded";
import getJournals from "../../../apiHooks/getJournals";
import Spinner from "../../../sharedComponents/Spinner";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { designerColors } from "../../../Utils/Colors";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { analyticsPlotInteraction, buildUrl } from "../../../Utils/functions";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function Journals() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [significance, setSignificance] = React.useState();
  const navigate = useNavigate();
  const pageName = "journals";
  const ONE_ROW_HEIGHT = 35;
  const Y_AXIS_OFFSET = 350;
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["journals", experimentsNum, significance],
    queryFn: () =>
      getJournals({
        min_number_of_experiments: experimentsNum,
        isUncontrast: true,
        significance,
      }),
  });

  const graphsData = isSuccess ? data?.data : [];
  const YaxisData = graphsData.map((row) => row.key);
  var trace1 = {
    y: YaxisData.reverse(),
    x: graphsData.map((row) => row.value).reverse(),
    type: "bar",
    orientation: "h",
    marker: {
      color: designerColors[46],
    },
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("significance")
      ? setSignificance(queryParams.get("significance"))
      : setSignificance("either");

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);
    analyticsPlotInteraction(searchParams, pageName);

    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  return (
    <div className="h-full">
      <PageTemplate
        control={
          <SideControl headline={"Journals"}>
            <Text lg weight="bold">
              Axis Controls
            </Text>
            <RangeInput
              number={experimentsNum}
              setNumber={(e) => {
                buildUrl(pageName, "min_number_of_experiments", e, navigate);
              }}
            />
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
          <div className="overflow-x-scroll h-full">
            <TopGraphText
              text={graphsHeaders["Journals uncontrast"].figureText}
              firstLine={graphsHeaders["Journals uncontrast"].figureLine}
            />
            {isLoading ? (
              <Spinner />
            ) : !data?.data.length ? (
              <NoResults />
            ) : (
              <Plot
                data={[trace1]}
                config={plotConfig}
                layout={{
                  autosize: false,
                  width: screenWidth - sideWidth,
                  height: ONE_ROW_HEIGHT * YaxisData?.length + Y_AXIS_OFFSET,
                  showlegend: false,

                  legend: { itemwidth: 90 },
                  xaxis: xAxisConfig,
                  yaxis: {
                    automargin: true,
                    showgrid: false,
                    ticks: "outside",
                    tickangle: 315,
                    tickfont: {
                      size: 18,
                      standoff: 50,
                    },
                  },
                }}
              />
            )}
          </div>
        }
      />
    </div>
  );
}
