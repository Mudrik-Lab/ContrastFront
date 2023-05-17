import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import {
  Button,
  FilterExplanation,
  RadioInput,
  RangeInput,
  ReportFilter,
  SideControl,
  Spacer,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import {
  avalble_populations,
  designerColors,
  isMoblile,
  navHeight,
  parametersOptions,
  screenWidth,
  sideSectionClass,
  sideWidth,
} from "../../components/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import getExtraConfig from "../../apiHooks/getExtraConfig";
import getFreeQueries from "../../apiHooks/getFreeQueries";
import Footer from "../../components/Footer";
import PageTemplate from "../../components/PageTemplate";
import { rawTeaxtToShow } from "../../Utils/functions";

export default function FreeQueriesBar() {
  const [selected, setSelected] = React.useState(parametersOptions[0]);
  const [isReporting, setIsReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("driven");
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [selectedTechniques, setSelectedTechniques] = React.useState(null);
  const [consciousnessMeasurePhases, setConsciousnessMeasurePhases] =
    React.useState(null);
  const [consciousnessMeasureTypes, setConsciousnessMeasureTypes] =
    React.useState(null);
  const [tagsFamilies, setTagsFamilies] = React.useState(null);
  const [tagsTypes, setTagsTypes] = React.useState(null);
  const [measures, setMeasures] = React.useState(null);
  const [paradigmFamilies, setParadigmFamilies] = React.useState(null);
  const [paradigms, setParadigms] = React.useState(null);
  const [populations, setPopulations] = React.useState(null);
  const [stimuliCategories, setStimuliCategories] = React.useState(null);
  const [stimuliModalities, setStimuliModalities] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);

  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  const allFiltersObj = {};
  function getFiltersArrays(data, isSuccess) {}

  const techniquesArr = extraConfigSuccess
    ? extraConfig?.data.available_techniques.map((technique, index) => ({
        value: technique.id,
        label: technique.name,
        color: designerColors[index],
      }))
    : [];
  const consciousnessMeasurePhaseArr = extraConfigSuccess
    ? extraConfig?.data.available_consciousness_measure_phase_type.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
          color: designerColors[index],
        })
      )
    : [];
  const consciousnessMeasureTypesArr = extraConfigSuccess
    ? extraConfig?.data.available_consciousness_measure_type.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
          color: designerColors[index],
        })
      )
    : [];
  const tagsFamiliesArr = extraConfigSuccess
    ? extraConfig?.data.available_finding_tags_families.map((type, index) => ({
        value: type.id,
        label: type.name,
        color: designerColors[index],
      }))
    : [];
  const tagsTypesArr = extraConfigSuccess
    ? extraConfig?.data.available_finding_tags_types.map((type, index) => ({
        value: type.id,
        label: type.name,
        color: designerColors[index],
      }))
    : [];
  const measuresArr = extraConfigSuccess
    ? extraConfig?.data.available_measure_types.map((type, index) => ({
        value: type.id,
        label: type.name,
        color: designerColors[index],
      }))
    : [];
  const paradigmFamiliesArr = extraConfigSuccess
    ? extraConfig?.data.available_paradigms_families.map((type, index) => ({
        value: type.id,
        label: type.name,
        color: designerColors[index],
      }))
    : [];
  const paradigmsArr = extraConfigSuccess
    ? extraConfig?.data.available_paradigms.map((type, index) => ({
        value: type.id,
        label: type.name,
        color: designerColors[index],
      }))
    : [];

  const populationsArr = avalble_populations;
  const stimuliCategoriesArr = extraConfigSuccess
    ? extraConfig?.data.available_stimulus_category_type.map((type, index) => ({
        value: type.id,
        label: type.name,
        color: designerColors[index],
      }))
    : [];
  const stimuliModalitiesArr = extraConfigSuccess
    ? extraConfig?.data.available_stimulus_modality_type.map((type, index) => ({
        value: type.id,
        label: type.name,
        color: designerColors[index],
      }))
    : [];
  const tasksArr = extraConfigSuccess
    ? extraConfig?.data.available_tasks_types.map((type, index) => ({
        value: type.id,
        label: type.name,
        color: designerColors[index],
      }))
    : [];

  const { data, isLoading } = useQuery(
    [
      `parameters_distribution_free_queries${
        selected.value +
        " " +
        isReporting +
        " " +
        experimentsNum +
        " " +
        consciousness +
        " " +
        theoryDriven +
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
        measures?.map((row) => row.label).join(",") +
        " " +
        paradigmFamilies?.map((row) => row.label).join(",") +
        " " +
        paradigms?.map((row) => row.label).join(",") +
        " " +
        populations?.map((row) => row.label).join(",") +
        " " +
        stimuliCategories?.map((row) => row.label).join(",") +
        " " +
        stimuliModalities?.map((row) => row.label).join(",") +
        " " +
        tasks?.map((row) => row.label).join(",")
      }`,
    ],
    () =>
      getFreeQueries({
        breakdown: selected.value,
        is_reporting: isReporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
        techniques: selectedTechniques,
        consciousness_measure_phases: consciousnessMeasurePhases,
        consciousness_measure_types: consciousnessMeasureTypes,
        populations,
        finding_tags_families: tagsFamilies,
        finding_tags_types: tagsTypes,
        measures,
        paradigm_families: paradigmFamilies,
        paradigms,
        stimuli_categories: stimuliCategories,
        stimuli_modalities: stimuliModalities,
        tasks,
      })
  );
  const X1 = data?.data.map((row) => row.value).reverse();

  const Y = data?.data.map((row) => rawTeaxtToShow(row.key)).reverse();
  console.log(data?.data);

  var trace1 = {
    x: X1,
    y: Y,
    // text: Y,
    orientation: "h",
    textfont: {
      size: 18,
    },
    marker: {
      width: 100,
      color: designerColors,

      text: {
        font: {
          weight: "bold",
        },
      },
    },
    type: "bar",
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      width: 300,
    }),
  };

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
      {extraConfigSuccess && (
        <PageTemplate
          control={
            <SideControl headline={"Parameter Distribution Free Queries"}>
              <Text center md weight="bold">
                Axis Controls
              </Text>

              <RangeInput
                number={experimentsNum}
                setNumber={setExperimentsNum}
              />

              <div className={sideSectionClass}>
                <Text flexed md weight="bold">
                  Parameter of interest
                  <FilterExplanation tooltip="Choose the dependent variable to be queried." />
                </Text>
                <TagsSelect
                  options={parametersOptions}
                  value={selected}
                  onChange={setSelected}
                />
              </div>
              <TypeOfConsciousnessFilter
                checked={consciousness}
                setChecked={setConsciousness}
              />
              <ReportFilter checked={isReporting} setChecked={setIsReporting} />
              <TheoryDrivenFilter
                checked={theoryDriven}
                setChecked={setTheoryDriven}
              />
              <div className={sideSectionClass}>
                <Text flexed md weight="bold">
                  Filter by
                  <FilterExplanation tooltip="You can select every combination of parameters you are interested in filtering the results by; for each parameter, open the drop-down menu and indicate your preference. Choosing to filter by multiple values within parameters filters by either value, and selecting multiple parameters filters by both parameters." />
                </Text>
                {extraConfigSuccess && (
                  <>
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={selectedTechniques}
                      options={techniquesArr}
                      placeholder="Techniques"
                      onChange={setSelectedTechniques}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={consciousnessMeasurePhases}
                      options={consciousnessMeasurePhaseArr}
                      placeholder={"Consciousness Measure Phase "}
                      onChange={setConsciousnessMeasurePhases}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={consciousnessMeasureTypes}
                      options={consciousnessMeasureTypesArr}
                      placeholder="Consciousness Measure Types"
                      onChange={setConsciousnessMeasureTypes}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tagsFamilies}
                      options={tagsFamiliesArr}
                      placeholder="Finding Tags Families"
                      onChange={setTagsFamilies}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tagsTypes}
                      options={tagsTypesArr}
                      placeholder="Finding Tags Types"
                      onChange={setTagsTypes}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={measures}
                      options={measuresArr}
                      placeholder="Measures"
                      onChange={setMeasures}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={paradigmFamilies}
                      options={paradigmFamiliesArr}
                      placeholder="Paradigm Families"
                      onChange={setParadigmFamilies}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={paradigms}
                      options={paradigmsArr}
                      placeholder="Paradigms"
                      onChange={setParadigms}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={populations}
                      options={populationsArr}
                      placeholder="Populations"
                      onChange={setPopulations}
                    />

                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={stimuliCategories}
                      options={stimuliCategoriesArr}
                      placeholder="Stimuli Categories"
                      onChange={setStimuliCategories}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={stimuliModalities}
                      options={stimuliModalitiesArr}
                      placeholder="Stimuli Modalities"
                      onChange={setStimuliModalities}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tasks}
                      options={tasksArr}
                      placeholder="Tasks"
                      onChange={setTasks}
                    />
                  </>
                )}{" "}
              </div>
            </SideControl>
          }
          graph={
            <div>
              <TopGraphText
                text="Here, you can use the toolbar on the left to create your own queries. Select a specific parameter of interest to see how the experiments in the database distribute over the different levels of that parameter. You can also filter the results according to various parameters. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.
                "
                firstLine="The graph depicts the distribution of parameter values, according to your specifications."
              />
              <Plot
                data={[trace1]}
                config={{ displayModeBar: !isMoblile }}
                layout={{
                  width: isMoblile ? screenWidth : screenWidth - 400,
                  height: 35 * Y?.length + 250,
                  margin: { autoexpand: true, l: 20 },
                  legend: { itemwidth: 90 },
                  xaxis: {
                    title: "Number of experiments",
                    zeroline: true,
                    side: "top",
                    tickfont: {
                      size: 16,
                      standoff: 50,
                    },
                  },
                  yaxis: {
                    automargin: true,

                    ticks: "outside",
                    tickangle: 315,
                    tickfont: {
                      size: 12,
                      standoff: 50,
                    },
                  },
                }}
              />
            </div>
          }
        />
      )}
    </div>
  );
}
