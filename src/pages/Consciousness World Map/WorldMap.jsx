import { useQuery } from "@tanstack/react-query";
import React from "react";
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
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import {
  navHeight,
  screenHeight,
  screenWidth,
  sideWidth,
} from "../../components/HardCoded";
import getNations from "../../apiHooks/getNations";
import Footer from "../../components/Footer";

export default function WorldMap() {
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [theory, setTheory] = React.useState(null);

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );

  const theories = configSuccess
    ? configuration?.data.available_parent_theories.map((tag) => ({
        value: tag,
        label: tag,
      }))
    : [];

  const { data, isLoading } = useQuery(
    [
      `nations_of_consciousness${
        theory +
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
        theory: theory,
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
  const sameData = data?.data;
  sameData?.map((row) => {
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
      locations: data?.data.map((row) => row.country),
      text: data?.data.map((row) => row.country_name),
      z: data?.data.map((row) => row.total),
      colorscale: [
        [0, "rgb(5, 10, 172)"],
        [0.35, "rgb(40, 60, 190)"],
        [0.6, "rgb(90, 120, 245)"],
        [1, "rgb(102, 191, 241,)"],
      ],
      hoverinfo: "location+text",
      hovertext: data?.data.map((row) => {
        // delete mergedStates[row.country_name].theory;
        // delete mergedStates[row.country_name].country;
        // delete mergedStates[row.country_name].value;
        // delete mergedStates[row.country_name].total;
        // delete mergedStates[row.country_name].country_name;
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
        tickprefix: "#",
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

    width: screenWidth - 450,
    height: screenHeight - 360,
    showlegend: false,
    autosize: false,
  };
  configSuccess && !theory && setTheory(theories);

  return (
    <div>
      {" "}
      <Navbar />
      <div className="flex mt-14 p-2 h-full">
        <SideControl headline={"Nations of Consciousness"}>
          <Text md weight="bold">
            Axis Controls
          </Text>
          <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />

          <div className={sectionClass}>
            <Text flexed md weight="bold">
              Theories
              <FilterExplanation tooltip="few more words about Theories" />
            </Text>

            {configSuccess && theories && (
              <Select
                closeMenuOnSelect={true}
                isMulti={true}
                value={theory}
                options={theories}
                placeholder="Theories"
                onChange={setTheory}
              />
            )}
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
        <div style={{ marginLeft: sideWidth, width: "100%" }}>
          <TopGraphText
            firstLine={
              "Distribution of the experiments in the database according to nations extracted from author affiliations."
            }
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
          />
          {isLoading ? <Spinner /> : <Plot data={graphData} layout={layout} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
