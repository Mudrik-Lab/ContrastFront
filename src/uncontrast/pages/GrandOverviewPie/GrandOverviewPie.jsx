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
  navHeight,
  plotConfig,
  screenHeight,
  sideSectionClass,
} from "../../../Utils/HardCoded";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { designerColors } from "../../../Utils/Colors";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as CsvIcon } from "../../../assets/icons/csv-file.svg";
import {
  alphabetizeByLabels,
  buildUrl,
  buildUrlForMultiSelect,
  rawTextToShow,
} from "../../../Utils/functions";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
import getUncontrastConfiguration from "../../../apiHooks/getUncontrastConfiguration.jsx";
import getUncontrastGrandOverview from "../../../apiHooks/getUncontrastGrandOverview.jsx";
import Spinner from "../../../sharedComponents/Spinner.jsx";

const Plot = createPlotlyComponent(Plotly);

export default function GrandOverviewPie() {
  const [searchParams, setSearchParams] = useSearchParams();
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
  const pageName = "grand_overview_pie";

  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`uncon_configs`],
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
  const yesNoOptions = [
    { label: "", value: "" },
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [
      "grand_overview_pie",
      "uncontrast",
      experimentsNum,
      significance,
      participantsExcluded,
      consciousnessMeasurePhases?.map((row) => row.label).join(","),
      consciousnessMeasureTypes?.map((row) => row.label).join(","),
      modeOfPresentation?.map((row) => row.label).join(","),
      processingDomain.map((row) => row.label).join(","),
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
      getUncontrastGrandOverview({
        min_number_of_experiments: experimentsNum,
        significance,
        consciousness_measure_phases: consciousnessMeasurePhases,
        consciousness_measure_types: consciousnessMeasureTypes,
        modes_of_presentation: modeOfPresentation,
        paradigms: paradigms,
        populations,
        processing_domain_types: processingDomain,
        suppressed_stimuli_categories: stimuliCategories,
        suppressed_stimuli_modalities: stimuliModalities,
        target_stimuli_categories: targetStimuliCategories,
        target_stimuli_modalities: targetStimuliModalities,
        tasks,
        types,
        are_participants_excluded: participantsExcluded?.value,
        outcome_types: outcome,
      }),
  });
  const values = [];
  const labels = [];

  data?.data?.series.map((row, index) => {
    values.push(row.value);
    labels.push(row.key);
  });
  const initialGraphData = [
    {
      direction: "clockwise",
      insidetextorientation: "horizontal",
      values: values,
      labels: labels,
      sort: false,
      type: "pie",
      hovertemplate: "%{label}: %{value} <extra></extra>",
      textinfo: "label+value",
      hole: 0.2,
      textfont: { size: 20 },
      textposition: "inside",
      domain: { x: [0, 1], y: [0, 1] },
      marker: {
        colors: designerColors,
        line: { width: 1, color: "white" },
      },
    },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    function updateMultiFilterState(setState, queryName, optionsArr) {
      setState(
        queryParams.getAll(queryName).map((item) => {
          return {
            value: Number(item) === parseFloat(item) ? parseInt(item) : item,
            label: optionsArr.find((x) => x.value == item)?.label,
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
      ? setParticipantsExcluded({
          value: queryParams.get("are_participants_excluded"),
          label: yesNoOptions.find(
            (option) =>
              option.value === queryParams.get("are_participants_excluded")
          )?.label,
        })
      : setParticipantsExcluded(null);

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
      "modes_of_presentation",
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
  }, [searchParams, configSuccess]);

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
            <SideControl headline={"Grand Overview Pie"}>
              <Text center lg weight="bold">
                Axis Controls
              </Text>
              <RangeInput
                number={experimentsNum}
                setNumber={(e) => {
                  buildUrl(pageName, "min_number_of_experiments", e, navigate);
                }}
              />
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
                      options={alphabetizeByLabels(
                        consciousnessMeasurePhaseArr
                      )}
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
                      options={alphabetizeByLabels(
                        consciousnessMeasureTypesArr
                      )}
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
                      options={alphabetizeByLabels(outcomeTypesArr)}
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
                      options={alphabetizeByLabels(modeOfPresentationArr)}
                      placeholder="Mode of Presentation"
                      aria-label="Mode of Presentation"
                      onChange={(e) => {
                        buildUrlForMultiSelect(
                          e,
                          "modes_of_presentation",
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
                      options={alphabetizeByLabels(paradigmsArr)}
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
                      options={alphabetizeByLabels(populationsArr)}
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
                      options={alphabetizeByLabels(processingDomainArr)}
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
                      options={alphabetizeByLabels(stimuliCategoriesArr)}
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
                      options={alphabetizeByLabels(stimuliModalitiesArr)}
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
                      options={alphabetizeByLabels(stimuliCategoriesArr)}
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
                      options={alphabetizeByLabels(stimuliModalitiesArr)}
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
                      options={alphabetizeByLabels(tasksArr)}
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
                      isMulti={false}
                      value={participantsExcluded}
                      options={yesNoOptions}
                      placeholder="Are Participants Excluded"
                      aria-label="Are Participants Excluded"
                      onChange={({ value }) => {
                        if (value === "true" || value === "false") {
                          const queryParams = new URLSearchParams(
                            location.search
                          );
                          queryParams.set("are_participants_excluded", value);
                          navigate(
                            "/" + pageName + "?" + queryParams.toString()
                          );
                        }
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
            <div className="h-full">
              <TopGraphText
                text={graphsHeaders["Parameter Distribution Pie"].figureText}
                legendLine={
                  graphsHeaders["Parameter Distribution Pie"].legendLine
                }
                firstLine={
                  graphsHeaders["Parameter Distribution Pie"].figureLine
                }
              />
              {isLoading ? (
                <Spinner />
              ) : data?.data.value ? (
                <Plot
                  data={initialGraphData}
                  config={plotConfig}
                  layout={{
                    width: screenHeight,
                    height: screenHeight - navHeight - footerHeight,
                    showlegend: false,
                    annotations: [
                      {
                        text:
                          // breakLongLines(data?.data.series_name, 11) +
                          // " <br />" +
                          "Total = " + data?.data.value,
                        showarrow: false,

                        style: { whiteSpace: "pre-wrap" },
                        font: {
                          size: 18,
                        },
                      },
                    ],
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
