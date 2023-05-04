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
import TagsSelect from "../../components/TagsSelect";
import { colorsArray, tagsOptions } from "../../components/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import getExtraConfig from "../../apiHooks/getExtraConfig";
import getFreeQueries from "../../apiHooks/getFreeQueries";

export default function FreeQueriesBar() {
  const [selected, setSelected] = React.useState(tagsOptions[0]);
  const [reporting, setReporting] = React.useState("either");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const [consciousnessMeasurePhases, setConsciousnessMeasurePhases] =
    React.useState(null);
  const [consciousnessMeasureTypes, setConsciousnessMeasureTypes] =
    React.useState(null);
  const [tagsFamilies, setTagsFamilies] = React.useState(null);
  const [tagsTypes, setTagsTypes] = React.useState(null);
  const [measures, setMeasures] = React.useState(null);

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );

  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  const techniquesArr = extraConfigSuccess
    ? extraConfig?.data.available_techniques.map((technique) => ({
        value: technique,
        label: technique,
      }))
    : [];
  const consciousnessMeasurePhaseArr = extraConfigSuccess
    ? extraConfig?.data.available_consciousness_measure_phase_type.map(
        (type) => ({
          value: type,
          label: type,
        })
      )
    : [];
  const consciousnessMeasureTypesArr = extraConfigSuccess
    ? extraConfig?.data.available_consciousness_measure_type.map((type) => ({
        value: type,
        label: type,
      }))
    : [];
  const tagsFamiliesArr = extraConfigSuccess
    ? extraConfig?.data.available_finding_tags_families.map((type) => ({
        value: type,
        label: type,
      }))
    : [];
  const tagsTypesArr = extraConfigSuccess
    ? extraConfig?.data.available_finding_tags_types.map((type) => ({
        value: type.name,
        label: type.name,
      }))
    : [];
  const measuresArr = extraConfigSuccess
    ? extraConfig?.data.available_measure_types.map((type) => ({
        value: type,
        label: type,
      }))
    : [];
  const { data, isLoading } = useQuery(
    [
      `parameters_distribution_free_queries${
        selected.value +
        " " +
        reporting +
        " " +
        experimentsNum +
        " " +
        selectedTechniques?.map((row) => row.label).join(",") +
        " " +
        consciousnessMeasurePhases?.map((row) => row.label).join(",") +
        " " +
        consciousnessMeasureTypes?.map((row) => row.label).join(",") +
        " " +
        tagsFamilies?.map((row) => row.label).join(",") +
        " " +
        tagsTypes?.map((row) => row.label).join(",") +
        " " +
        measures?.map((row) => row.label).join(",")
      }`,
    ],
    () =>
      getFreeQueries({
        breakdown: selected.value,
        techniques: selectedTechniques,
        consciousness_measure_phases: consciousnessMeasurePhases,
        consciousness_measure_types: consciousnessMeasureTypes,
        is_reporting: reporting,
        min_number_of_experiments: experimentsNum,
        finding_tags_families: tagsFamilies,
        finding_tags_types: tagsTypes,
        measures: measures,
      })
  );

  const X1 = data?.data.map((row) => row.value).reverse();

  const Y = data?.data.map((row) => row.key).reverse();

  var trace1 = {
    x: X1,
    y: Y,
    text: Y,
    // textangle: 30,
    // name: "pro",
    orientation: "h",
    textfont: {
      size: 18,
    },
    marker: {
      width: 100,
      color: "Blues",

      text: {
        font: {
          weight: "bold",
        },
      },
    },
    type: "bar",
  };

  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";

  // configSuccess && !selectedTechniques && setSelectedTechniques(techniques);
  // extraConfigSuccess &&
  //   !consciousnessMeasurePhases &&
  //   setConsciousnessMeasurePhases(consciousnessMeasurePhaseArr);
  // extraConfigSuccess &&
  //   !consciousnessMeasureTypes &&
  //   setConsciousnessMeasureTypes(consciousnessMeasureTypesArr);
  // extraConfigSuccess && !tagsFamilies && setTagsFamilies(tagsFamiliesArr);
  // extraConfigSuccess && !tagsTypes && setTagsTypes(tagsTypesArr);
  // extraConfigSuccess && !measures && setMeasures(measuresArr);
  return (
    <div>
      <Navbar />
      {configSuccess && (
        <div className="flex mt-12">
          <div className="side-filter-box p-2 pt-10 flex flex-col items-center">
            <Text size={28} weight="bold" color="blue" center>
              Parameter Distribution <br />
              Free Queries
            </Text>
            <div className="w-[346px] shadow-xl mt-10 mx-auto rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2 h-screen overflow-y-scroll">
              <Text md weight="bold">
                Axis Controls
              </Text>
              <div className={sectionClass}>
                <RangeInput
                  number={experimentsNum}
                  setNumber={setExperimentsNum}
                />
                <FilterExplanation
                  text="minimum number of experiments"
                  tooltip="few more words about minimum number of experiments"
                />
              </div>
              <div className={sectionClass}>
                <Text md weight="bold">
                  Theory
                </Text>
                <TagsSelect
                  options={tagsOptions}
                  value={selected}
                  onChange={setSelected}
                />

                <FilterExplanation
                  text="Paradigm "
                  tooltip="few more words about Paradigm "
                />
              </div>
              <div className={sectionClass}>
                {configSuccess && (
                  <>
                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={selectedTechniques}
                      options={techniquesArr}
                      placeholder="Techniques"
                      onChange={setSelectedTechniques}
                    />

                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={consciousnessMeasurePhases}
                      options={consciousnessMeasurePhaseArr}
                      placeholder={"consciousness Measure Phase "}
                      onChange={setConsciousnessMeasurePhases}
                    />

                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={consciousnessMeasureTypes}
                      options={consciousnessMeasureTypesArr}
                      placeholder="consciousness Measure Types"
                      onChange={setConsciousnessMeasureTypes}
                    />

                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tagsFamilies}
                      options={tagsFamiliesArr}
                      placeholder="Finding Tags Families"
                      onChange={setTagsFamilies}
                    />

                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tagsTypes}
                      options={tagsTypesArr}
                      placeholder="Finding Tags Types"
                      onChange={setTagsTypes}
                    />

                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={measures}
                      options={measuresArr}
                      placeholder="Measures"
                      onChange={setMeasures}
                    />
                  </>
                )}
              </div>
              <div className={sectionClass}>
                <RadioInput
                  values={[
                    { value: "report", name: "Report" },
                    { value: "no_report", name: "No-Report" },
                    { value: "both", name: "Both" },
                    { value: "either", name: "Either" },
                  ]}
                  checked={reporting}
                  setChecked={setReporting}
                />
              </div>
            </div>
          </div>

          {X1 && Y && (
            <div className="pl-12">
              <Plot
                data={[trace1]}
                layout={{
                  title: "Parameter Distribution Free Queries",

                  width: screenWidth - 500,
                  height: 45 * Y?.length + 150,
                  margin: { autoexpand: true, l: 20 },
                  legend: { itemwidth: 90 },
                  xaxis: {
                    zeroline: true,
                    side: "top",
                    tickangle: 45,
                  },
                  yaxis: {
                    // automargin: true,
                    showticklabels: false,
                    // ticks: "outside",
                    // tickangle: 315,
                    // tickfont: {
                    //   size: 12,
                    //   standoff: 50,
                    // },
                  },
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
