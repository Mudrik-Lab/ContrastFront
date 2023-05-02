import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  Text,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import { screenHeight, screenWidth } from "../../components/HardCoded";
import getNations from "../../apiHooks/getNations";

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

  console.log(theories);
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
  const countries = [
    "FIN",
    "FRA",
    "GUF",
    "PYF",
    "ATF",
    "GAB",
    "DEU",
    "GHA",
    "GIB",
    "GRC",
    "GRD",
    "GLP",
    "GUM",
    "GNB",
    "GUY",
    "HTI",
    "HMD",
    "ISL",
    "IND",
    "IDN",
    "IRQ",
    "IRL",
    "ISR",
    "ITA",
  ];

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";

  var graphData = [
    {
      type: "choropleth",
      locations: countries,
      text: countries,
      z: data?.data.map((row) => row.count),
      colorscale: [
        [0, "rgb(5, 10, 172)"],
        [0.35, "rgb(40, 60, 190)"],

        [0.6, "rgb(90, 120, 245)"],

        [1, "rgb(102, 191, 241,)"],
      ],
      reversescale: true,
      marker: {
        size: data?.data.map((row) => row.count),
      },
      tick0: 0,
      zmin: 0,
      colorbar: {
        len: 0.5,
        yanchor: "bottom",
        orientation: "h",
        x: 0.5,
        y: 0.05,
        tickprefix: "#",
        title: "Experiments<br>number",
      },
    },
    {
      type: "scattergeo",
      mode: "markers+text",
      locations: countries,
      text: data?.data.map((row) => row.count),
      // textfont: {
      //   color: "black",
      //   size: 12,
      // },
      marker: {
        size: data?.data.map((row) => row.count),
        sizemode: "area",
        sizeref: 0.05,
        color: "white",
        line: {
          color: "black",
        },
        cmin: 0,
        cmax: 50,
        line: {
          color: "black",
        },
      },
      name: "europe data",
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

    width: screenWidth,
    height: screenHeight,
    showlegend: false,
    autosize: false,
  };
  configSuccess && !theory && setTheory(theories);
  return (
    <div>
      {" "}
      <Navbar />
      <div className="flex mt-12">
        <div className="side-filter-box border p-7 pt-10 flex flex-col items-center ">
          <Text size={28} weight="bold" color="blue">
            World Map
          </Text>
          <div className="w-[346px] shadow-lg mt-10 mx-auto bg-white flex flex-col items-center gap-2 px-4 py-2 ">
            <Text md weight="bold">
              Axis Controls
            </Text>
            <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />
            <FilterExplanation
              text="minimum number of experiments"
              tooltip="few more words about minimum number of experiments"
            />
            <div className={sectionClass}>
              <Text md weight={"bold"}>
                Reported
              </Text>
              <RadioInput
                name="Report"
                values={[
                  { value: "report", name: "Report" },
                  { value: "no_report", name: "No-Report" },
                  { value: "either", name: "Either" },
                  { value: "both", name: "Both" },
                ]}
                checked={reporting}
                setChecked={setReporting}
              />
            </div>
            <div className={sectionClass}>
              <Text md weight="bold">
                Filter Tags
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
              <FilterExplanation
                text="Paradigms Family"
                tooltip="few more words about Paradigms Family"
              />
            </div>
            <div className={sectionClass}>
              <Text md weight="bold">
                Theory Driven
              </Text>
              <RadioInput
                name="Thery-Driven"
                values={[
                  { value: "driven", name: "Driven" },
                  { value: "mentioning", name: "Mentioning" },
                  { value: "either", name: "Either" },
                  { value: "post-hoc", name: "Post Hoc" },
                ]}
                checked={theoryDriven}
                setChecked={setTheoryDriven}
              />
            </div>

            <div className="w-full py-5 flex flex-col items-center gap-3 ">
              {/* TODO: find Headline */}
              <Text md weight="bold">
                Type of Consciousness
              </Text>
              <RadioInput
                name="Consciousness"
                values={[
                  { value: "state", name: "State" },
                  { value: "content", name: "Content" },

                  { value: "either", name: "Either" },
                  { value: "both", name: "Both" },
                ]}
                checked={consciousness}
                setChecked={setConsciousness}
              />
            </div>
          </div>
        </div>

        <div className="pl-2">
          {isLoading ? <Spinner /> : <Plot data={graphData} layout={layout} />}
        </div>
      </div>
    </div>
  );
}
