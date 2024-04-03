import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  CSV,
  TooltipExplanation,
  RangeInput,
  ReportFilter,
  Reset,
  SideControl,
  Text,
  TopGraphText,
  TypeOfConsciousnessFilter,
  Button,
} from "../../../sharedComponents/Reusble";

import {
  available_populations,
  footerHeight,
  isMoblile,
  navHeight,
  parametersOptions,
  plotConfig,
  screenWidth,
  sideSectionClass,
} from "../../../Utils/HardCoded";
import getExtraConfig from "../../../apiHooks/getExtraConfig";
import getFreeQueries from "../../../apiHooks/getFreeQueries";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { designerColors } from "../../../Utils/Colors";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as CsvIcon } from "../../../assets/icons/csv-file.svg";

import {
  buildUrl,
  buildUrlForMultiSelect,
  rawTextToShow,
} from "../../../Utils/functions";
import getConfiguration from "../../../apiHooks/getConfiguration";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

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
          value: index + 1,
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
  const { data, isLoading } = useQuery({
    queryKey: [
      "parameters_distribution_free_queries",
      selected?.value,
      isReporting,
      experimentsNum,
      consciousness,
      theoryDriven?.map((row) => row.label).join(","),
      interpretations?.map((row) => row.label).join(","),
      selectedTechniques?.map((row) => row.label).join(","),
      consciousnessMeasurePhases?.map((row) => row.label).join(","),
      consciousnessMeasureTypes?.map((row) => row.label).join(","),
      tagsFamilies?.map((row) => row.label).join(","),
      tagsTypes?.map((row) => row.label).join(","),
      measures?.map((row) => row.label).join(","),
      paradigmFamilies?.map((row) => row.label).join(","),
      paradigms?.map((row) => row.label).join(","),
      populations?.map((row) => row.label).join(","),
      stimuliCategories?.map((row) => row.label).join(","),
      stimuliModalities?.map((row) => row.label).join(","),
      tasks?.map((row) => row.label).join(","),
      theoryFamilies?.map((x) => x.value).join(","),
    ],
    queryFn: () =>
      getFreeQueries({
        breakdown: selected.value,
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
      }),
    enabled: Boolean(selected?.value),
  });

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
      fontSize: 16,
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
      updateMultiFilterState(
        setTheoryFamilies,
        "interpretation_theories",
        theories
      );
    }
    navigate({ search: queryParams.toString() });
  }, [searchParams, extraConfigSuccess]);

  const referrerUrl = document.referrer;
  const csvRef = useRef(null);

  useEffect(() => {
    if (csvRef.current && referrerUrl.endsWith("/contact")) {
      csvRef.current?.click();
    }
  }, [csvRef.current]);

  return (
    <div>
      {extraConfigSuccess && (
        <PageTemplate
          control={
            <SideControl headline={"Free Queries"}>
              <Text center lg weight="bold">
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
                  className="text-lg w-[300px]"
                  aria-label="Parameter of interest"
                  closeMenuOnSelect={true}
                  isMulti={false}
                  isClearable={false}
                  options={parametersOptions}
                  value={selected}
                  onChange={(e) => {
                    buildUrl(pageName, "breakdown", e.value, navigate);
                  }}
                />

                <TooltipExplanation
                  text={"Parameter of interest"}
                  tooltip="Choose the dependent variable to be queried."
                />
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
              <TooltipExplanation
                text={"Filter by"}
                tooltip="You can select every combination of parameters you are interested in filtering the results by; for each parameter, open the drop-down menu and indicate your preference. Choosing to filter by multiple values within parameters filters by either value, and selecting multiple parameters filters by both parameters."
              />
              {extraConfigSuccess && (
                <div>
                  <div className={sideSectionClass}>
                    <Select
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={selectedTechniques}
                      options={techniquesArr}
                      placeholder="Technique"
                      aria-label="Technique"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={paradigmFamilies}
                      options={paradigmFamiliesArr}
                      placeholder="Paradigm Families"
                      aria-label="Paradigm Families"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={paradigms}
                      options={paradigmsArr}
                      placeholder="Specific Paradigm"
                      aria-label="Specific Paradigm"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={stimuliCategories}
                      options={stimuliCategoriesArr}
                      placeholder="Stimulus Category"
                      aria-label="Stimulus Category"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={stimuliModalities}
                      options={stimuliModalitiesArr}
                      placeholder="Stimulus Modality"
                      aria-label="Stimulus Modality"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tasks}
                      options={tasksArr}
                      placeholder="Task"
                      aria-label="Task"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={populations}
                      options={populationsArr}
                      placeholder="Population"
                      aria-label="Population"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={consciousnessMeasureTypes}
                      options={consciousnessMeasureTypesArr}
                      placeholder="How was consciousness measured?"
                      aria-label="How was consciousness measured?"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={consciousnessMeasurePhases}
                      options={consciousnessMeasurePhaseArr}
                      placeholder={"When was consciousness measured? "}
                      aria-label={"When was consciousness measured? "}
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={measures}
                      options={measuresArr}
                      placeholder="Measures"
                      aria-label="Measures"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tagsFamilies}
                      options={tagsFamiliesArr}
                      placeholder="Finding Types"
                      aria-label="Finding Types"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={tagsTypes}
                      options={tagsTypesArr}
                      placeholder="Specific Finding"
                      aria-label="Specific Finding"
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
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={theoryDriven}
                      options={theoryDrivenArr}
                      placeholder="Theory Driven"
                      aria-label="Theory Driven"
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
                      className="text-lg w-[300px]"
                      value={theoryFamilies}
                      options={theories}
                      placeholder="Theories"
                      aria-label="Theories"
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
                      className="text-lg w-[300px]"
                      value={interpretations}
                      options={interpretationsArr}
                      placeholder="interpretations"
                      aria-label="interpretations"
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
                    <TooltipExplanation
                      text="Interpretations"
                      tooltip='In order to use this filter please choose a theory in "Theries" field and then choose interpretation for that theory'
                    />
                  </div>
                </div>
              )}{" "}
              <div className="w-full flex items-center justify-between my-4">
                <a
                  href={data?.request.responseURL + "&is_csv=true"}
                  id="download_csv"
                  ref={csvRef}>
                  <Button extraClass={"px-3 py-1.5 "}>
                    <CsvIcon />
                    Download
                  </Button>
                </a>
                <Reset pageName={pageName} />
              </div>
            </SideControl>
          }
          graph={
            <div
              style={{ height: `calc(100% - ${navHeight + footerHeight}px)` }}>
              <TopGraphText
                text={graphsHeaders[1].figureText}
                firstLine={graphsHeaders[1].figureLine}
              />
              {X1?.length ? (
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
              ) : (
                <NoResults />
              )}
            </div>
          }
        />
      )}
    </div>
  );
}
