import React, { useState } from "react";
import { Text } from "../../../../sharedComponents/Reusble";
import { useQuery } from "@tanstack/react-query";
import { rawTextToShow } from "../../../../Utils/functions";
import Samples from "./Samples";
import SuppressedStimuli from "./SuppressedStimuli";
import ConsciousnessMeasures from "./ConsciousnessMeasures";
import Findings from "./Findings";
import Tasks from "./Tasks";
import Paradigms from "./Paradigms";
import {
  uploadPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../../../Utils/HardCoded";
import getUncontrastConfiguration from "../../../../apiHooks/getUncontrastConfiguration";
import SuppressionMethod from "./SuppressionMethod";
import ProcessingDomain from "./ProcessingDomain";
import TargetStimuli from "./TargetStimuli";

export default function ExperimentForm({
  study,
  setAddNewExperiment,
  setPaperToEdit,
  experimentData,
  isEditMode,
  refetch,
  setNewPaper,
}) {
  const [experimentID, setExperimentID] = useState(experimentData?.id);
  const [minimumClassifications, setMinimumClassifications] = useState({
    paradigms: experimentData?.paradigm?.length || 0,
    samples: experimentData?.samples?.length || 0,
    tasks: experimentData?.tasks?.length || 0,
    stimuli: experimentData?.suppressed_stimuli?.length || 0,
    consciousnessMeasures: experimentData?.consciousness_measures?.length || 0,
    techniques: experimentData?.techniques?.length || 0,
    measures: experimentData?.measures?.length || 0,
  });
  const [techniques, setTechniques] = useState(
    experimentData?.techniques || []
  );
  const { data: configurations, isSuccess } = useQuery(
    [`uncon_configurations`],
    getUncontrastConfiguration
  );

  const mainParadigms = configurations?.data.available_main_paradigm_type?.map(
    (main) => ({
      value: main.id,
      label: main.name,
    })
  );
  const paradigms = configurations?.data.available_specific_paradigm_type;

  const experimentTypeOptions =
    configurations?.data.available_experiment_types.map((type) => ({
      value: type.value,
      label: rawTextToShow(type.name),
    }));

  const populations = configurations?.data.available_populations_types.map(
    (population) => ({ value: population, label: rawTextToShow(population) })
  );
  const tasks = configurations?.data.available_tasks_types.map((task) => ({
    value: task.id,
    label: task.name,
  }));

  const stimulusCategories =
    configurations?.data.available_stimulus_category_type.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })); // name,id
  const stimulusSubCategories =
    configurations?.data.available_stimulus_sub_category_type.map(
      (subCategory) => ({
        value: subCategory.id,
        label: subCategory.name,
        parent: subCategory.parent,
      })
    ); //name, id, parent(by id number)
  const stimulusModalities =
    configurations?.data.available_stimulus_modality_type.map((modality) => ({
      value: modality.id,
      label: modality.name,
    })); // name, id

  const mainSuppressionMethod =
    configurations?.data.available_suppression_method_types?.map((main) => ({
      value: main.id,
      label: main.name,
    }));
  const subSuppressionMethod =
    configurations?.data.available_suppression_method_sub_types;

  const mainProcessingDomain =
    configurations?.data.available_processing_main_domain_types?.map(
      (main) => ({
        value: main.id,
        label: main.name,
      })
    );

  const analysisPhaseOptions =
    configurations?.data.available_consciousness_measure_phase_type?.map(
      (measure) => ({
        value: measure.id,
        label: measure.name,
      })
    );
  const analysisMeasuresOptions =
    configurations?.data.available_consciousness_measure_type?.map(
      (measure) => ({
        value: measure.id,
        label: measure.name,
      })
    );
  const consciousnessMeasuresSubType =
    configurations?.data.available_consciousness_measure_sub_type;
  const outcomeOptions = configurations?.data.available_outcomes_type?.map(
    (type) => ({
      value: type.id,
      label: type.name,
    })
  );

  const shouldCheckAllClassificationsFilled = false;
  return (
    <>
      {isSuccess && setAddNewExperiment && (
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

            <Paradigms
              setMinimumClassifications={setMinimumClassifications}
              setExperimentID={setExperimentID}
              experimentID={experimentID}
              minimumClassifications={minimumClassifications}
              fieldOptions={mainParadigms}
              optionalParadigms={paradigms}
              experiment_pk={experimentID}
              study_pk={study.id}
              values={experimentData?.paradigm}
            />

            <Samples
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={populations}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
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
            <SuppressedStimuli
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

            <TargetStimuli
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

            <SuppressionMethod
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={mainSuppressionMethod}
              optionalSubTypes={subSuppressionMethod}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.suppression_methods}
            />
            <ProcessingDomain
              setMinimumClassifications={setMinimumClassifications}
              minimumClassifications={minimumClassifications}
              fieldOptions={mainProcessingDomain}
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
              consciousnessMeasuresSubType={consciousnessMeasuresSubType}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
            />
          </div>
          <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
            <Text color="grayReg" weight={"bold"}>
              Findings
            </Text>

            <Findings
              fieldOptions={outcomeOptions}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={
                shouldCheckAllClassificationsFilled
                  ? Object.values(minimumClassifications).includes(0)
                  : !experimentID
              }
              values={experimentData?.finding_tags}
            />
            {/*
            <ResultsSummary
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={
                shouldCheckAllClassificationsFilled
                  ? Object.values(minimumClassifications).includes(0)
                  : !experimentID
              }
              values={experimentData?.results_summary}
            /> */}
          </div>

          <button
            className="font-bold my-2"
            onClick={() => {
              setPaperToEdit(false);
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
