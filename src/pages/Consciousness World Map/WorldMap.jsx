import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
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
import Plot from "react-plotly.js";
import getConfiguration from "../../apiHooks/getConfiguration";
import Spinner from "../../components/Spinner";
import { isMoblile, screenHeight, screenWidth } from "../../Utils/HardCoded";
import getNations from "../../apiHooks/getNations";
import PageTemplate from "../../components/PageTemplate";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrl, buildUrlForMultiSelect } from "../../Utils/functions";

export default function WorldMap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [theoryFamilies, setTheoryFamilies] = React.useState([]);
  const navigate = useNavigate();
  const pageName = "consciousness-world-map";

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );

  const theories = configSuccess
    ? configuration?.data.available_parent_theories.map((tag) => {
        return {
          value: encodeURIComponent(tag),
          label: tag,
        };
      })
    : [];
  const { data, isLoading } = useQuery(
    [
      `nations_of_consciousness${
        theoryFamilies?.map((x) => x.value).join("+") +
        " " +
        reporting +
        " " +
        experimentsNum +
        " " +
        consciousness +
        " " +
        theoryDriven
      }`,
    ],
    () =>
      getNations({
        graphName: "nations_of_consciousness",
        theory: theoryFamilies,
        is_reporting: reporting,
        min_number_of_experiments: experimentsNum,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
      })
  );
  const sumPerCountry = data?.data.reduce((acc, { country, value }) => {
    acc[country] = (acc[country] || 0) + value;
    return acc;
  }, {});
  const mergedStates = {};

  data?.data.map((row) => {
    row[row.theory] = row.value;
    const country = row.country_name;
    if (!mergedStates[country]) {
      mergedStates[country] = row;
    } else {
      mergedStates[country] = { ...mergedStates[country], ...row };
    }
  });

  const sortedResult = sumPerCountry
    ? Object.keys(sumPerCountry)
        .sort()
        .map((country) => {
          return { country, totalValue: sumPerCountry[country] };
        })
    : [];

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  var graphData = [
    {
      type: "choropleth",
      showscale: !isMoblile,
      locations: data?.data.map((row) => row.country),
      text: data?.data.map((row) => row.country_name),
      z: data?.data.map((row) => row.total),
      colorscale: [
        [0.0, "rgb(128, 0, 0)"],
        [0.25, "rgb(166, 0, 0)"],
        [0.5, "rgb(204, 0, 0)"],
        [0.75, "rgb(242, 51, 51)"],
        [1.0, "rgb(255, 208, 208)"],
      ],

      hoverinfo: "location+text",
      hovertext: data?.data.map((row) => {
        delete mergedStates[row.country_name].theory;

        delete mergedStates[row.country_name].value;

        delete mergedStates[row.country_name].country_name;
        return (
          JSON.stringify(mergedStates[row.country_name])
            ?.replaceAll("{", "")
            .replaceAll("}", "")
            .replaceAll('"', "")
            .replaceAll(",", "<br>") +
          "<br>Total:" +
          row.total
        );
      }),
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
        y: 0,
        title: "Experiments<br>number",
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
        size: sortedResult.map((row) => row.totalValue * 1.5 + 10),
        sizemode: "area",
        sizeref: 0.05,
        color: "white",

        cmin: 0,
        cmax: 50,
        line: {
          color: "white",
        },
      },
      name: "Nations of Consciousness",
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
      oceancolor: "#C2E1F2",
      countrycolor: "#C2E1F2",
      bordercolor: "#C2E1F2",
      landcolor: "#999999",
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

    width: isMoblile ? screenWidth : screenWidth - 450,
    height: isMoblile ? screenWidth : screenHeight - 360,
    showlegend: false,
    autosize: false,
  };
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
    if (configSuccess) {
      const selectedValues = queryParams.getAll("theory");
      setTheoryFamilies(
        selectedValues.map((item) => ({
          value: item,
          label: decodeURIComponent(item),
        }))
      );
    }
  }, [searchParams]);
  console.log(reporting);
  useEffect(() => {
    if (configSuccess) {
      setTheoryFamilies(theories);
    }
  }, [configSuccess]);

  return (
    <div>
      {configSuccess && (
        <PageTemplate
          control={
            <SideControl headline={"Nations of Consciousness"}>
              <Text md weight="bold">
                Axis Controls
              </Text>
              <RangeInput
                number={experimentsNum}
                setNumber={(e) => {
                  console.log(e);
                  buildUrl(pageName, "min_number_of_experiments", e, navigate);
                }}
              />
              <div className={sectionClass}>
                <Text flexed md weight="bold">
                  Theory Family
                  <FilterExplanation tooltip="few more words about Theories" />
                </Text>

                {configSuccess && theories && (
                  <Select
                    closeMenuOnSelect={true}
                    isMulti={true}
                    value={theoryFamilies}
                    options={theories}
                    placeholder="Theories"
                    onChange={(e) =>
                      buildUrlForMultiSelect(
                        e,
                        "theory",
                        searchParams,
                        navigate
                      )
                    }
                  />
                )}
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
            </SideControl>
          }
          graph={
            <div>
              <TopGraphText
                text={graphsHeaders[10].figureText}
                firstLine={graphsHeaders[10].figureLine}
              />
              {isLoading ? (
                <Spinner />
              ) : (
                <Plot
                  data={graphData}
                  layout={layout}
                  config={{ displayModeBar: !isMoblile }}
                />
              )}
            </div>
          }
        />
      )}
    </div>
  );
}
