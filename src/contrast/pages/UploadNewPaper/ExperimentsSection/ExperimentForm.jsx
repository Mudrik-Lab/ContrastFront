import React, { useEffect, useState } from "react";
import { Text } from "../../../../sharedComponents/Reusble";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../../../apiHooks/getExtraConfig";

import BasicClassification from "./BasicClassification";
import {
  alphabetizeByLabels,
  rawTextToShow,
} from "../../../../Utils/functions";
import Samples from "./Samples";
import Stimuli from "./Stimuli";
import Techniques from "./Techniques";
import Measures from "./Measures";
import ConsciousnessMeasures from "./ConsciousnessMeasures";
import Interpretations from "./Interpretations";
import Findings from "./Findings";
import Tasks from "./Tasks";
import Paradigms from "./Paradigms";

import {
  uploadPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../../../Utils/HardCoded";
import ResultsSummary from "./ResultsSummary";

export default function ExperimentForm({
  study,
  setAddNewExperiment,
  setExperimentToEdit,
  experimentData,
  isEditMode,
  refetch,
  setNewPaper,
}) {
  const [experimentID, setExperimentID] = useState(experimentData?.id);
  const [isStudyFit, setIsStudyFit] = useState(false);

  const [minimumClassifications, setMinimumClassifications] = useState({
    paradigms: experimentData?.paradigms?.length || 0,
    samples: experimentData?.samples?.length || 0,
    tasks: experimentData?.tasks?.length || 0,
    stimuli: experimentData?.stimuli?.length || 0,
    consciousnessMeasures: experimentData?.consciousness_measures?.length || 0,
    techniques: experimentData?.techniques?.length || 0,
    measures: experimentData?.measures?.length || 0,
  });
  const [techniques, setTechniques] = useState(
    experimentData?.techniques || []
  );
  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );

  const paradigmsFamilies = extraConfig?.data.available_paradigms_families.map(
    (family) => ({ value: family.name, label: family.name })
  );
  const populations = extraConfig?.data.available_populations_types.map(
    (population) => ({ value: population, label: rawTextToShow(population) })
  );
  const tasks = extraConfig?.data.available_tasks_types.map((task) => ({
    value: task.id,
    label: task.name,
  }));
  const paradigms = extraConfig?.data.available_paradigms;
  const stimulusCategories =
    extraConfig?.data.available_stimulus_category_type.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })); // name,id
  const stimulusSubCategories =
    extraConfig?.data.available_stimulus_sub_category_type.map(
      (subCategory) => ({
        value: subCategory.id,
        label: subCategory.name,
        parent: subCategory.parent,
      })
    ); //name, id, parent(by id number)
  const stimulusModalities =
    extraConfig?.data.available_stimulus_modality_type.map((modality) => ({
      value: modality.id,
      label: modality.name,
    })); // name, id
  let techniquesOptions = extraConfig?.data.available_techniques.map(
    (tech) => ({
      value: tech.id,
      label: tech.name,
    })
  );
  const measuresOptions = extraConfig?.data.available_measure_types?.map(
    (measure) => ({
      value: measure.id,
      label: measure.name,
    })
  );

  const analysisPhaseOptions =
    extraConfig?.data.available_consciousness_measure_phase_type?.map(
      (measure) => ({
        value: measure.id,
        label: measure.name,
      })
    );
  const analysisMeasuresOptions =
    extraConfig?.data.available_consciousness_measure_type?.map((measure) => ({
      value: measure.id,
      label: measure.name,
    }));

  const theories = extraConfig?.data.available_theories?.map((theory) => ({
    value: theory.id,
    label: theory.name,
    parentId: theory.parent_id,
  }));
  const findingTypes = extraConfig?.data.available_finding_tags_types?.map(
    (type) => ({
      value: type.id,
      label: type.name,
      family: type.family,
    })
  );
  const findingTagsFamilies =
    extraConfig?.data.available_finding_tags_families?.map((type) => ({
      value: type.id,
      label: type.name,
    }));
  const AALOptions = extraConfig?.data.available_AAL_atlas_tag_types?.map(
    (type) => ({
      value: type,
      label: type,
    })
  );

  const experimentTypeOptions =
    extraConfig?.data.available_experiment_types.map((type) => ({
      value: type.value,
      label: rawTextToShow(type.name),
    }));
  const analysisTypeOptions =
    extraConfig?.data.available_analysis_type_choices.map((type) => ({
      value: type,
      label: rawTextToShow(type),
    }));
  const shouldCheckAllClassificationsFilled = false;

  useEffect(() => {
    setIsStudyFit(experimentData?.study === study.id);
  }, [study]);

  return (
    <>
      {extraConfigSuccess && setAddNewExperiment && (
        <div
          className="p-2 w-1/2 shadow-3xl flex flex-col gap-2 overflow-y-scroll"
          style={{
            height: `calc(100vh - ${
              uploadPaperUsedHeight + uploadPaperPageTopSection + 10
            }px)`,
          }}>
          <div>
            <Text weight={"bold"} color={"grayReg"}>
              {study.title?.slice(0, 20)}...
            </Text>
            <Text weight={"bold"} lg>
              {isEditMode
                ? experimentData.title
                : `Experiment#${study?.experiments?.length + 1}`}
            </Text>
          </div>

          <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
            <Text color="grayReg" weight={"bold"}>
              Experiment Classifications
            </Text>

            <BasicClassification
              theories={theories}
              fieldOptions={experimentTypeOptions}
              experimentData={experimentData}
              study_id={study.id}
              setExperimentID={setExperimentID}
              isEditMode={isEditMode}
              refetch={refetch}
            />

            <Paradigms
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={paradigmsFamilies}
              optionalParadigms={paradigms}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.paradigms}
              notes={experimentData?.paradigms_notes}
            />

            <Samples
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={populations}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
              notes={experimentData?.sample_notes}
            />
            <Tasks
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={tasks}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
            />
            <Stimuli
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={stimulusCategories}
              subCategories={stimulusSubCategories}
              modalities={stimulusModalities}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
            />
            <ConsciousnessMeasures
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={analysisMeasuresOptions}
              analysisPhaseOptions={analysisPhaseOptions}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
            />
            <Techniques
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={techniquesOptions}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.techniques}
              setTechniques={setTechniques}
              techniques={techniques}
            />

            <Measures
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={alphabetizeByLabels(measuresOptions)}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.measures}
            />
          </div>
          <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
            <Text color="grayReg" weight={"bold"}>
              Findings
            </Text>

            <Findings
              fieldOptions={{
                techniquesOptions: techniquesOptions.filter((item2) =>
                  techniques.some((item1) => item1.id === item2.value)
                ),

                findingTagsFamilies,
                findingTypes,
                AALOptions,
                analysisTypeOptions,
              }}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={
                shouldCheckAllClassificationsFilled
                  ? Object.values(minimumClassifications).includes(0)
                  : !experimentID
              }
              values={experimentData?.finding_tags}
            />
            <Interpretations
              fieldOptions={theories}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={
                shouldCheckAllClassificationsFilled
                  ? Object.values(minimumClassifications).includes(0)
                  : !experimentID
              }
              values={experimentData?.interpretations}
            />
            <ResultsSummary
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={
                shouldCheckAllClassificationsFilled
                  ? Object.values(minimumClassifications).includes(0)
                  : !experimentID
              }
              values={experimentData?.results_summary}
            />
          </div>

          <button
            className="font-bold my-2"
            onClick={() => {
              setExperimentToEdit(false);
              setAddNewExperiment(false);
              setNewPaper(false);
              refetch();
            }}>
            Save & Close Experiment
          </button>
        </div>
      )}
    </>
  );
}
