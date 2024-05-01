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
  available_populations,
  footerHeight,
  isMoblile,
  navHeight,
  plotConfig,
  screenWidth,
  sideSectionClass,
  uncontrastParametersOptions,
} from "../../../Utils/HardCoded";
import getExtraConfig from "../../../apiHooks/getExtraConfig";
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
import getUncontrastFreeQueries from "../../../apiHooks/getUncontrastFreeQueries.jsx";

const Plot = createPlotlyComponent(Plotly);

export default function FreeQueriesBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [experimentsNum, setExperimentsNum] = useState();
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
  const [significance, setSignificance] = useState();
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

  const tagsTypesArr = extraConfigSuccess
    ? extraConfig?.data.available_finding_tags_types.map((type, index) => ({
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

  const { data, isLoading } = useQuery({
    queryKey: [
      "parameters_distribution_free_queries",
      "uncontrast",
      selected?.value,
      experimentsNum,
      significance,
      consciousnessMeasurePhases?.map((row) => row.label).join(","),
      consciousnessMeasureTypes?.map((row) => row.label).join(","),
      populations?.map((row) => row.label).join(","),
      stimuliCategories?.map((row) => row.label).join(","),
      stimuliModalities?.map((row) => row.label).join(","),
      tasks?.map((row) => row.label).join(","),
    ],
    queryFn: () =>
      getUncontrastFreeQueries({
        breakdown: selected.value,
        min_number_of_experiments: experimentsNum,
        consciousness_measure_phases: consciousnessMeasurePhases,
        consciousness_measure_types: consciousnessMeasureTypes,
        populations,
        significance,
        target_stimuli_categories: stimuliCategories,
        target_stimuli_modalities: stimuliModalities,
        tasks,
        // types,
        // processing_domain_types,
        // suppressed_stimuli_categories,
        // suppressed_stimuli_modalities,
        // suppression_methods_types,
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

    if (queryParams.get("breakdown")) {
      setSelected({
        value: queryParams.get("breakdown"),
        label: rawTextToShow(queryParams.get("breakdown")),
      });
    } else {
      setSelected(uncontrastParametersOptions[0]);
    }
    if (extraConfigSuccess) {
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
              {extraConfigSuccess && (
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
