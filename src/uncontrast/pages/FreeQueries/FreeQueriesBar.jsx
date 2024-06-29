import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import {
  Button,
  RangeInput,
  Reset,
  SideControl,
  SignificanceFilter,
  Text,
  TooltipExplanation,
  TopGraphText,
} from "../../../sharedComponents/Reusble";
import {
  footerHeight,
  isMoblile,
  navHeight,
  plotConfig,
  screenWidth,
  sideSectionClass,
  uncontrastParametersOptions,
} from "../../../Utils/HardCoded";
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
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import getUncontrastFreeQueries from "../../../apiHooks/getUncontrastFreeQueries.jsx";
import getUncontrastConfiguration from "../../../apiHooks/getUncontrastConfiguration.jsx";

const Plot = createPlotlyComponent(Plotly);

export default function FreeQueriesBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [experimentsNum, setExperimentsNum] = useState();
  const [significance, setSignificance] = useState();

  const [stimuliCategories, setStimuliCategories] = useState([]);
  const [stimuliModalities, setStimuliModalities] = useState([]);
  const [targetStimuliCategories, setTargetStimuliCategories] = useState([]);
  const [targetStimuliModalities, setTargetStimuliModalities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [types, setTypes] = useState([]);

  const [paradigms, setParadigms] = useState([]);
  const [populations, setPopulations] = useState([]);
  const [consciousnessMeasureTypes, setConsciousnessMeasureTypes] = useState(
    []
  );
  const [consciousnessMeasurePhases, setConsciousnessMeasurePhases] = useState(
    []
  );
  const [modeOfPresentation, setModeOfPresentation] = useState([]);
  const [processingDomain, setProcessingDomain] = useState([]);
  const [participantsExcluded, setParticipantsExcluded] = useState();
  const [outcome, setOutcome] = useState([]);

  const navigate = useNavigate();
  const pageName = "parameter-distribution-free-queries";

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`parent_theories`],
    getUncontrastConfiguration
  );

  const consciousnessMeasurePhaseArr = configSuccess
    ? configuration?.data.available_consciousness_measure_phase_type.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
        })
      )
    : [];

  const consciousnessMeasureTypesArr = configSuccess
    ? configuration?.data.available_consciousness_measure_type.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
        })
      )
    : [];

  const modeOfPresentationArr = configSuccess
    ? configuration?.data.available_mode_of_presentation.map((type, index) => ({
        value: type,
        label: rawTextToShow(type),
      }))
    : [];

  const populationsArr = configSuccess
    ? configuration?.data.available_populations_types.map((type, index) => ({
        value: type,
        label: rawTextToShow(type),
      }))
    : [];
  const processingDomainArr = configSuccess
    ? configuration?.data.available_processing_main_domain_types.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
        })
      )
    : [];

  const stimuliCategoriesArr = configSuccess
    ? configuration?.data.available_stimulus_category_type.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
        })
      )
    : [];
  const stimuliModalitiesArr = configSuccess
    ? configuration?.data.available_stimulus_modality_type.map(
        (type, index) => ({
          value: type.id,
          label: type.name,
        })
      )
    : [];
  const tasksArr = configSuccess
    ? configuration?.data.available_tasks_types.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];

  const typesArr = configSuccess
    ? configuration?.data.available_experiment_types.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];
  const paradigmsArr = configSuccess
    ? configuration?.data.available_main_paradigm_type.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];

  const outcomeTypesArr = configSuccess
    ? configuration?.data.available_outcomes_type?.map((type, index) => ({
        value: type.id,
        label: type.name,
      }))
    : [];

  const { data, isLoading } = useQuery({
    queryKey: [
      "parameters_distribution_free_queries",
      "uncontrast",
      selected?.value,
      experimentsNum,
      significance,
      participantsExcluded,
      consciousnessMeasurePhases?.map((row) => row.label).join(","),
      consciousnessMeasureTypes?.map((row) => row.label).join(","),
      modeOfPresentation?.map((row) => row.label).join(","),
      paradigms?.map((row) => row.label).join(","),
      populations?.map((row) => row.label).join(","),
      stimuliCategories?.map((row) => row.label).join(","),
      stimuliModalities?.map((row) => row.label).join(","),
      targetStimuliCategories?.map((row) => row.label).join(","),
      targetStimuliModalities?.map((row) => row.label).join(","),
      tasks?.map((row) => row.label).join(","),
      types?.map((row) => row.label).join(","),
      outcome?.map((row) => row.label).join(","),
    ],
    queryFn: () =>
      getUncontrastFreeQueries({
        breakdown: selected.value,
        min_number_of_experiments: experimentsNum,
        significance,
        consciousness_measure_phases: consciousnessMeasurePhases,
        consciousness_measure_types: consciousnessMeasureTypes,
        mode_of_presentation: modeOfPresentation,
        paradigms,
        populations,
        processing_domain_types: processingDomain,
        suppressed_stimuli_categories: stimuliCategories,
        suppressed_stimuli_modalities: stimuliModalities,
        target_stimuli_categories: targetStimuliCategories,
        target_stimuli_modalities: targetStimuliModalities,
        tasks,
        types,
        are_participants_excluded: participantsExcluded,
        outcome_types: outcome,
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

    queryParams.get("significance")
      ? setSignificance(queryParams.get("significance"))
      : setSignificance("either");

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    queryParams.get("are_participants_excluded")
      ? setParticipantsExcluded(queryParams.get("are_participants_excluded"))
      : setParticipantsExcluded();

    if (queryParams.get("breakdown")) {
      setSelected({
        value: queryParams.get("breakdown"),
        label: rawTextToShow(queryParams.get("breakdown")),
      });
    } else {
      setSelected(uncontrastParametersOptions[0]);
    }
    if (configSuccess) {
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
        setModeOfPresentation,
        "mode_of_presentation",
        modeOfPresentationArr
      );
      updateMultiFilterState(setParadigms, "paradigms", paradigmsArr);

      updateMultiFilterState(setPopulations, "populations", populationsArr);
      updateMultiFilterState(
        setProcessingDomain,
        "processing_domain_types",
        processingDomainArr
      );
      updateMultiFilterState(
        setStimuliCategories,
        "suppressed_stimuli_categories",
        stimuliCategoriesArr
      );
      updateMultiFilterState(
        setStimuliModalities,
        "suppressed_stimuli_modalities",
        stimuliModalitiesArr
      );
      updateMultiFilterState(
        setTargetStimuliCategories,
        "target_stimuli_categories",
        stimuliCategoriesArr
      );
      updateMultiFilterState(
        setTargetStimuliModalities,
        "target_stimuli_modalities",
        stimuliModalitiesArr
      );
      updateMultiFilterState(setTasks, "tasks", tasksArr);
      updateMultiFilterState(setOutcome, "outcome_types", outcomeTypesArr);
      updateMultiFilterState(setTypes, "types", typesArr);
    }
  }, [searchParams]);

  const referrerUrl = document.referrer;
  const csvRef = useRef(null);

  useEffect(() => {
    if (csvRef.current && referrerUrl.endsWith("/contact")) {
      csvRef.current?.click();
    }
  }, [csvRef.current]);

  return (
    <div>
      {configSuccess && (
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
                  placeholder="Parameter of interest"
                  closeMenuOnSelect={true}
                  isMulti={false}
                  isClearable={false}
                  options={uncontrastParametersOptions}
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
              <SignificanceFilter
                checked={significance}
                setChecked={(e) => {
                  buildUrl(pageName, "significance", e, navigate);
                }}
              />
              {configSuccess && (
                <div>
                  <div className="flex flex-col items-center">
                    <TooltipExplanation
                      text={"Filter by"}
                      tooltip="You can select every combination of parameters you are interested in filtering the results by; for each parameter, open the drop-down menu and indicate your preference. Choosing to filter by multiple values within parameters filters by either value, and selecting multiple parameters filters by both parameters."
                    />
                  </div>

                  <div className={sideSectionClass}>
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
                      value={outcome}
                      options={outcomeTypesArr}
                      placeholder="Outcome Type"
                      aria-label="Outcome Type"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "outcome_types",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={modeOfPresentation}
                      options={modeOfPresentationArr}
                      placeholder="Mode of Presentation"
                      aria-label="Mode of Presentation"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "mode_of_presentation",
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
                      placeholder="Paradigm"
                      aria-label="Paradigm"
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
                      value={processingDomain}
                      options={processingDomainArr}
                      placeholder="Processing Domain Type"
                      aria-label="Processing Domain Type"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "processing_domain_types",
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
                      placeholder="Suppressed Stimuli Category"
                      aria-label="Suppressed Stimuli Category"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "suppressed_stimuli_categories",
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
                      placeholder="Suppressed Stimuli Modality"
                      aria-label="Suppressed Stimuli Modality"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "suppressed_stimuli_modalities",
                          searchParams,
                          navigate
                        );
                      }}
                    />

                    <Select
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={targetStimuliCategories}
                      options={stimuliCategoriesArr}
                      placeholder="Target Stimuli Category"
                      aria-label="Target Stimuli Category"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "target_stimuli_categories",
                          searchParams,
                          navigate
                        );
                      }}
                    />
                    <Select
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={true}
                      value={targetStimuliModalities}
                      options={stimuliModalitiesArr}
                      placeholder="Target Stimuli Modality"
                      aria-label="Target Stimuli Modality"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "target_stimuli_modalities",
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
                      value={types}
                      options={typesArr}
                      placeholder="Type of Evidence"
                      aria-label="Type of Evidence"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "types",
                          searchParams,
                          navigate
                        );
                      }}
                    />

                    <Select
                      className="text-lg w-[300px]"
                      closeMenuOnSelect={true}
                      isMulti={false}
                      value={participantsExcluded}
                      options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ]}
                      placeholder="Are Participants Excluded"
                      aria-label="Are Participants Excluded"
                      onChange={(e) => {
                        buildUrl(
                          pageName,
                          "are_participants_excluded",
                          e.value,
                          navigate
                        );
                      }}
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
                text={graphsHeaders["Free Queries"].figureText}
                firstLine={graphsHeaders["Free Queries"].figureLine}
              />
              {X1?.length ? (
                <Plot
                  data={[trace1]}
                  config={plotConfig}
                  layout={{
                    width: isMoblile ? screenWidth : screenWidth - 400,
                    height: 35 * Y?.length + 250, // set the height of graph based on horizoned chars number. the minimum (1 result) is 285px
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
