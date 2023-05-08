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
import {
  colorsArray,
  screenHeight,
  screenWidth,
} from "../../components/HardCoded";
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

  const sumPerCountry = data?.data.reduce((acc, { country, value }) => {
    acc[country] = (acc[country] || 0) + value;
    return acc;
  }, {});
  console.log(sumPerCountry);
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
        y: 0.1,
        tickprefix: "#",
        title: "Experiments<br>number",
      },
    },
    {
      type: "scattergeo",
      mode: "markers+text",
      locations: sortedResult.map((row) => row.country),
      text: sortedResult.map((row) => row.totalValue),
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
    hovermode: "closest",
    hoverlabel: {
      bgcolor: "#333333",
      font: { color: "#ffffff" },
    },
    hovertemplate: `<b>kljlkjkjss</b><extra></extra>`,
    width: screenWidth - 388,
    height: screenHeight,
    showlegend: false,
    autosize: false,
  };
  configSuccess && !theory && setTheory(theories);
  return (
    <div>
      {" "}
      <Navbar />
      <div className="flex mt-12 p-2">
        <div className="side-filter-box p-2 pt-10 flex flex-col items-center ">
          <Text center size={28} weight="bold" color="blue">
            World Map- <br />
            Nation of Consciousness
          </Text>
          <div className="w-[346px] shadow-xl mt-10 mx-auto rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2 ">
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
