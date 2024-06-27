import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import {
  CSV,
  RangeInput,
  Reset,
  SideControl,
  Text,
  TopGraphText,
} from "../../../sharedComponents/Reusble";

import getConfiguration from "../../../apiHooks/getConfiguration";
import Spinner from "../../../sharedComponents/Spinner";
import {
  azure,
  grayReg,
  isMoblile,
  plotConfig,
} from "../../../Utils/HardCoded";
import getNations from "../../../apiHooks/getNations";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrl, buildUrlForMultiSelect } from "../../../Utils/functions";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-geo-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function WorldMap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const navigate = useNavigate();
  const pageName = "unconsciousness-world-map";

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );

  const { data, isLoading } = useQuery(
    ["unconsciousness-world-map", experimentsNum],
    () =>
      getNations({
        min_number_of_experiments: experimentsNum,
        isUncontrast: true,
      })
  );
  const sumPerCountry = data?.data.reduce((acc, { country, value }) => {
    acc[country] = (acc[country] || 0) + value;
    return acc;
  }, {});

  const sortedResult = sumPerCountry
    ? Object.keys(sumPerCountry)
        .sort()
        .map((country) => {
          return { country, totalValue: sumPerCountry[country] };
        })
    : [];

  function buildHoverText(data) {
    const mergedStates = [];

    data?.data.forEach((row) => {
      const country = row.country_name;
      const significance = row.significance;
      const value = row.value;
      const fullTextItem = {
        Country: country,
        [significance]: value,
        Total: row.total,
      };
      const theoryOnlyTextItem = {
        Country: country,
        [significance]: value,
      };

      if (!mergedStates[country]) {
        mergedStates[country] = fullTextItem;
      } else {
        mergedStates[country] = {
          ...theoryOnlyTextItem,
          ...mergedStates[country],
        };
      }
    });

    return mergedStates;
  }

  const mergedStates = buildHoverText(data);

  const hover_text = data?.data.map((row) => {
    return JSON.stringify(mergedStates[row.country_name])
      ?.replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll('"', "")
      .replaceAll(",", "<br>");
  });

  var graphData = [
    {
      type: "choropleth",
      showscale: !isMoblile,
      locations: data?.data.map((row) => row.country),
      text: data?.data.map((row) => row.country_name),
      z: data?.data.map((row) => row.total),
      colorscale: [
        [0.0, "rgb(100, 56, 110)"],
        [0.25, "rgb(88,58,136)"],
        [0.5, "rgb(161,113,240)"],
        [0.75, "rgb(194,123,255)"],
        [1.0, "rgb(252,208,255)"],
      ],

      hoverinfo: "location+text",
      hovertext: hover_text,
      reversescale: true,
      marker: {
        size: data?.data.map((row) => row.total),
      },
      tick0: 0,
      zmin: 0,
      colorbar: {
        len: 0.5,
        yanchor: "bottom",
        orientation: "h",
        x: 0.5,
        y: 0.03,
        title: "# of experiments",
      },
    },
    {
      type: "scattergeo",
      mode: "markers+text",
      locations: sortedResult.map((row) => row.country),
      text: sortedResult.map((row) => row.totalValue),
      hoverinfo: "skip",
      textfont: {
        color: "black",
        size: 10,
      },
      marker: {
        size: sortedResult.map((row) => row.totalValue + 5),
        sizemode: "area",
        sizeref: 0.05,
        color: "white",
        cmin: 0,
        cmax: 50,
        line: {
          color: "white",
        },
      },
      name: "Unconscious processing world map",
    },
  ];
  const layout = {
    geo: {
      scope: "world",
      showframe: true, // show country borders
      showcoastlines: true, // show coastline borders
      showcountries: true,
      showland: true,
      showocean: true,
      oceancolor: azure,
      countrycolor: azure,
      bordercolor: azure,
      landcolor: grayReg,
      projection: {
        type: "equirectangular",
        scale: 1.5,
      },
    },
    hovermode: "closest",
    hoverlabel: {
      bgcolor: "#333333",
      font: { color: "#ffffff" },
    },

    showlegend: false,
    autosize: true,
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);
  }, [searchParams]);
  return (
    <div>
      {configSuccess && (
        <PageTemplate
          control={
            <SideControl headline={"Unconscious processing world map"}>
              <Text lg weight="bold">
                Axis Controls
              </Text>
              <RangeInput
                number={experimentsNum}
                setNumber={(e) => {
                  buildUrl(pageName, "min_number_of_experiments", e, navigate);
                }}
              />

              <div className="w-full flex items-center justify-between my-4">
                <CSV data={data} />
                <Reset pageName={pageName} />
              </div>
            </SideControl>
          }
          graph={
            <div className="h-full w-full">
              <TopGraphText
                text={graphsHeaders["World Map uncontrast"].figureText}
                firstLine={graphsHeaders["World Map uncontrast"].figureLine}
              />
              {isLoading ? (
                <Spinner />
              ) : !data?.data.length ? (
                <NoResults />
              ) : (
                <Plot
                  data={graphData}
                  style={{ width: "100%", height: "100%" }}
                  layout={layout}
                  config={plotConfig}
                />
              )}
            </div>
          }
        />
      )}
    </div>
  );
}
