import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  ButtonReversed,
  CSV,
  FilterExplanation,
  RadioInput,
  RangeInput,
  ReportFilter,
  Reset,
  SideControl,
  Text,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import {
  available_populations,
  isMoblile,
  parametersOptions,
  plotConfig,
  screenWidth,
  sideSectionClass,
} from "../../Utils/HardCoded";
import getExtraConfig from "../../apiHooks/getExtraConfig";
import getFreeQueries from "../../apiHooks/getFreeQueries";
import PageTemplate from "../../components/PageTemplate";
import { designerColors } from "../../Utils/Colors";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  buildUrl,
  buildUrlForMultiSelect,
  rawTextToShow,
} from "../../Utils/functions";
import getConfiguration from "../../apiHooks/getConfiguration";

export default function FreeQueriesBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [isReporting, setIsReporting] = useState();
  const [consciousness, setConsciousness] = useState();
  const [experimentsNum, setExperimentsNum] = useState();

  const [theoryDriven, setTheoryDriven] = useState([]);
  const [selectedTechniques, setSelectedTechniques] = useState([]);
  const [paradigmFamilies, setParadigmFamilies] = useState([]);
  const [paradigms, setParadigms] = useState([]);
  const [stimuliCategories, setStimuliCategories] = useState([]);
  const [stimuliModalities, setStimuliModalities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [populations, setPopulations] = useState([]);
  const [consciousnessMeasureTypes, setConsciousnessMeasureTypes] = useState(
    []
  );
  const [consciousnessMeasurePhases, setConsciousnessMeasurePhases] = useState(
    []
  );
  const [tagsFamilies, setTagsFamilies] = useState([]);
  const [tagsTypes, setTagsTypes] = useState([]);
  const [theoryFamilies, setTheoryFamilies] = React.useState([]);
  const [interpretations, setInterpretations] = useState([]);
  const [measures, setMeasures] = useState([]);

  const navigate = useNavigate();
  const pageName = "parameter-distribution-free-queries";

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  const techniquesArr = extraConfigSuccess
    ? extraConfig?.data.available_techniques.map((technique, index) => ({
        value: technique.id,
        label: technique.name,
      }))
    : [];
  const consciousnessMeasurePhaseArr = extraConfigSuccess
    ? extraConfig?.data.available_consciousness_measure_phase_type.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
        })
      )
    : [];
  const consciousnessMeasureTypesArr = extraConfigSuccess
    ? extraConfig?.data.available_consciousness_measure_type.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
        })
      )
    : [];
  const tagsFamiliesArr = extraConfigSuccess
    ? extraConfig?.data.available_finding_tags_families.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];
  const tagsTypesArr = extraConfigSuccess
    ? extraConfig?.data.available_finding_tags_types.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];
  const measuresArr = extraConfigSuccess
    ? extraConfig?.data.available_measure_types.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];
  const paradigmFamiliesArr = extraConfigSuccess
    ? extraConfig?.data.available_paradigms_families.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];
  const paradigmsArr = extraConfigSuccess
    ? extraConfig?.data.available_paradigms.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];

  const populationsArr = available_populations;
  const stimuliCategoriesArr = extraConfigSuccess
    ? extraConfig?.data.available_stimulus_category_type.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];
  const stimuliModalitiesArr = extraConfigSuccess
    ? extraConfig?.data.available_stimulus_modality_type.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];
  const tasksArr = extraConfigSuccess
    ? extraConfig?.data.available_tasks_types.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];
  const theoryDrivenArr = extraConfigSuccess
    ? extraConfig?.data.available_theory_driven_types.map((type, index) => ({
        value: type,
        label: rawTextToShow(type),
      }))
    : [];
  const theories = configSuccess
    ? configuration?.data.available_parent_theories.map((tag, index) => {
        return {
          value: index,
          label: tag,
          id: index,
        };
      })
    : [];

  const interpretationsArr = [
    { value: "challenges", label: "Challenges" },
    { value: "pro", label: "Support" },
    { value: "neutral", label: "Neutral" },
  ];

  const theoriesArr = configSuccess ? extraConfig?.data.available_theories : [];
  console.log(theoriesArr);
  const { data, isLoading } = useQuery(
    [
      `parameters_distribution_free_queries${
        selected?.value +
        " " +
        isReporting +
        " " +
        experimentsNum +
        " " +
        consciousness +
        " " +
        theoryDriven?.map((row) => row.label).join(",") +
        " " +
        interpretations?.map((row) => row.label).join(",") +
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
        tasks?.map((row) => row.label).join(",") +
        " " +
        theoryFamilies?.map((x) => x.value).join(",")
      }`,
    ],
    () =>
      selected.value &&
      getFreeQueries({
        breakdown: selected?.value,
        is_reporting: isReporting,
        type_of_consciousness: consciousness,
        theory_driven: theoryDriven,
        min_number_of_experiments: experimentsNum,
        interpretations: interpretations,
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
        interpretation_theories: theoryFamilies,
        tasks,
      })
  );
  const X1 = data?.data.map((row) => row.value).reverse();

  const Y = data?.data.map((row) => rawTextToShow(row.key)).reverse();

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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    function updateMultiFilterState(setState, queryName, optionsArr) {
      setState(
        queryParams.getAll(queryName).map((item) => {
          return {
            value: Number(item) === parseFloat(item) ? parseInt(item) : item,
            label: optionsArr.find((x) => x.value == item).label,
          };
        })
      );
    }
    console.log(extraConfig?.data);

    queryParams.get("is_reporting")
      ? setIsReporting(queryParams.get("is_reporting"))
      : setIsReporting("either");

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    queryParams.get("type_of_consciousness")
      ? setConsciousness(queryParams.get("type_of_consciousness"))
      : setConsciousness("either");

    if (queryParams.get("breakdown")) {
      setSelected({
        value: queryParams.get("breakdown"),
        label: rawTextToShow(queryParams.get("breakdown")),
      });
    } else {
      setSelected(parametersOptions[0]);
    }
    if (extraConfigSuccess) {
      updateMultiFilterState(
        setSelectedTechniques,
        "techniques",
        techniquesArr
      );
      updateMultiFilterState(
        setParadigmFamilies,
        "paradigm_families",
        paradigmFamiliesArr
      );
      updateMultiFilterState(setParadigms, "paradigms", paradigmsArr);
      updateMultiFilterState(
        setStimuliCategories,
        "stimuli_categories",
        stimuliCategoriesArr
      );
      updateMultiFilterState(
        setStimuliModalities,
        "stimuli_modalities",
        stimuliModalitiesArr
      );
      updateMultiFilterState(setTasks, "tasks", tasksArr);
      updateMultiFilterState(setPopulations, "populations", populationsArr);

      updateMultiFilterState(
        setConsciousnessMeasurePhases,
        "consciousness_measure_phases",
        consciousnessMeasurePhaseArr
      );
      updateMultiFilterState(
        setConsciousnessMeasureTypes,
        "consciousness_measure_types",
        consciousnessMeasureTypesArr
      );
      updateMultiFilterState(
        setTagsFamilies,
        "finding_tags_families",
        tagsFamiliesArr
      );
      updateMultiFilterState(setTagsTypes, "finding_tags_types", tagsTypesArr);
      updateMultiFilterState(
        setInterpretations,
        "interpretations_types",
        interpretationsArr
      );
      updateMultiFilterState(setTheoryDriven, "theory_driven", theoryDrivenArr);
      updateMultiFilterState(setMeasures, "measures", measuresArr);
    }
    if (configSuccess) {
      const selectedValues = queryParams.getAll("interpretation_theories");
      setTheoryFamilies(
        selectedValues.map((item) => ({
          value: item,
          label: decodeURIComponent(item),
        }))
      );
    }
    navigate({ search: queryParams.toString() });
  }, [searchParams]);

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
                setNumber={(e) => {
                  buildUrl(pageName, "min_number_of_experiments", e, navigate);
                }}
              />
              <div className={sideSectionClass}>
                <Select
                  closeMenuOnSelect={true}
                  isMulti={false}
                  isClearable={false}
                  options={parametersOptions}
                  value={selected}
                  onChange={(e) => {
                    buildUrl(pageName, "breakdown", e.value, navigate);
                  }}
                />
                <Text size={14} flexed>
                  Parameter of interest
                  <FilterExplanation tooltip="Choose the dependent variable to be queried." />
                </Text>
              </div>
              <TypeOfConsciousnessFilter
                checked={consciousness}
                setChecked={(e) => {
                  buildUrl(pageName, "type_of_consciousness", e, navigate);
                }}
              />
              <ReportFilter
                checked={isReporting}
                setChecked={(e) => {
                  buildUrl(pageName, "is_reporting", e, navigate);
                }}
              />
              <Text flexed md weight="bold">
                Filter by
                <FilterExplanation tooltip="You can select every combination of parameters you are interested in filtering the results by; for each parameter, open the drop-down menu and indicate your preference. Choosing to filter by multiple values within parameters filters by either value, and selecting multiple parameters filters by both parameters." />
              </Text>
              {extraConfigSuccess && (
                <>
                  <div className={sideSectionClass}>
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={selectedTechniques}
                      options={techniquesArr}
                      placeholder="Technique"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "techniques",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={paradigmFamilies}
                      options={paradigmFamiliesArr}
                      placeholder="Paradigm Families"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "paradigm_families",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={paradigms}
                      options={paradigmsArr}
                      placeholder="Specific Paradigm"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "paradigms",
                          searchParams,
                          navigate
                        );
                      }}
                    />

                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={stimuliCategories}
                      options={stimuliCategoriesArr}
                      placeholder="Stimulus Category"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "stimuli_categories",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={stimuliModalities}
                      options={stimuliModalitiesArr}
                      placeholder="Stimulus Modality"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "stimuli_modalities",
                          searchParams,
                          navigate
                        );
                      }}
                    />

                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tasks}
                      options={tasksArr}
                      placeholder="Task"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "tasks",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={populations}
                      options={populationsArr}
                      placeholder="Population"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "populations",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={consciousnessMeasureTypes}
                      options={consciousnessMeasureTypesArr}
                      placeholder="how was consciousness measured?"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "consciousness_measure_types",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={consciousnessMeasurePhases}
                      options={consciousnessMeasurePhaseArr}
                      placeholder={"When was consciousness measured? "}
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "consciousness_measure_phases",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      menuPlacement="top"
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={measures}
                      options={measuresArr}
                      placeholder="Measures"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "measures",
                          searchParams,
                          navigate
                        );
                      }}
                    />

                    <Select
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tagsFamilies}
                      options={tagsFamiliesArr}
                      placeholder="Finding Types"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "finding_tags_families",
                          searchParams,
                          navigate
                        );
                      }}
                    />

                    <Select
                      menuPlacement="top"
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tagsTypes}
                      options={tagsTypesArr}
                      placeholder="Specific Finding"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "finding_tags_types",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      menuPlacement="top"
                      styles={selectStyles}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={theoryDriven}
                      options={theoryDrivenArr}
                      placeholder="Theory Driven"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "theory_driven",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                  </div>
                  <div className={sideSectionClass}>
                    <Select
                      closeMenuOnSelect={true}
                      isMulti={true}
                      styles={selectStyles}
                      value={theoryFamilies}
                      options={theories}
                      placeholder="Theories"
                      onChange={(e) =>
                        buildUrlForMultiSelect(
                          e,
                          "interpretation_theories",
                          searchParams,
                          navigate
                        )
                      }
                    />
                    <Select
                      isDisabled={theoryFamilies.length === 0}
                      closeMenuOnSelect={true}
                      isMulti={true}
                      styles={selectStyles}
                      value={interpretations}
                      options={interpretationsArr}
                      placeholder="interpretations"
                      onChange={(e) => {
                        console.log(e);
                        buildUrlForMultiSelect(
                          e,
                          "interpretations_types",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <FilterExplanation text="Interpretations" tooltip="" />
                  </div>
                </>
              )}{" "}
              <div className="w-full flex items-center justify-between my-4">
                <CSV data={data} />
                <Reset pageName={pageName} />
              </div>
            </SideControl>
          }
          graph={
            <div>
              <TopGraphText
                text={graphsHeaders[0].figureText}
                firstLine={graphsHeaders[0].figureLine}
              />
              <Plot
                data={[trace1]}
                config={plotConfig}
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
