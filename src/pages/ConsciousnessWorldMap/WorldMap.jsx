import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
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
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import getConfiguration from "../../apiHooks/getConfiguration";
import Spinner from "../../components/Spinner";
import { azure, grayReg, isMoblile, plotConfig } from "../../Utils/HardCoded";
import getNations from "../../apiHooks/getNations";
import PageTemplate from "../../components/PageTemplate";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrl, buildUrlForMultiSelect } from "../../Utils/functions";
import NoResults from "../../components/NoResults";

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
      "nations_of_consciousness",
      theoryFamilies?.map((x) => x.value).join("+"),
      reporting,
      experimentsNum,
      consciousness,
      theoryDriven,
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

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";

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
      const theory = row.theory;
      const value = row.value;
      const fullTextItem = {
        Country: country,
        [theory]: value,
        Total: row.total,
      };
      const theoryOnlyTextItem = {
        Country: country,
        [theory]: value,
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
        y: 0.02,
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const theoriesOnURL = queryParams.getAll("theory");
    if (configSuccess) {
      if (theoriesOnURL.length === 0) {
        buildUrlForMultiSelect(theories, "theory", searchParams, navigate);
      } else {
        setTheoryFamilies(
          theoriesOnURL.map((x) => ({ value: x, label: decodeURIComponent(x) }))
        );
      }
    }
  }, [configSuccess]);

  return (
    <div>
      {configSuccess && (
        <PageTemplate
          control={
            <SideControl headline={"Nations of Consciousness"}>
              <Text lg weight="bold">
                Axis Controls
              </Text>
              <RangeInput
                number={experimentsNum}
                setNumber={(e) => {
                  buildUrl(pageName, "min_number_of_experiments", e, navigate);
                }}
              />
              <div className={sectionClass}>
                <TooltipExplanation
                  text={"Theory Family"}
                  tooltip="few more words about Theories"
                />

                <Select
                  className="text-lg w-[300px]"
                  aria-label="theories"
                  closeMenuOnSelect={true}
                  isMulti={true}
                  value={theoryFamilies}
                  options={theories.map((theory) => theory.label)}
                  placeholder="Theories"
                  onChange={(e) =>
                    buildUrlForMultiSelect(e, "theory", searchParams, navigate)
                  }
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
            <div style={{ width: "98%", height: "calc(100% - 100px)" }}>
              <TopGraphText
                text={graphsHeaders[10].figureText}
                firstLine={graphsHeaders[10].figureLine}
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
