import React, { useState } from "react";
import { Text } from "../../../../sharedComponents/Reusble";
import { useQuery } from "@tanstack/react-query";
import { rawTextToShow } from "../../../../Utils/functions";
import Samples from "./Samples";
import Stimuli from "./Stimuli";
import ConsciousnessMeasures from "./ConsciousnessMeasures";
import Findings from "./Findings";
import Tasks from "./Tasks";
import Paradigms from "./Paradigms";
import {
  uploadPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../../../Utils/HardCoded";
import ResultsSummary from "./ResultsSummary";
import getUncontrastConfiguration from "../../../../apiHooks/getUncontrastConfiguration";
import BasicClassification from "./BasicClassification";

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
  const { data: configurations, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getUncontrastConfiguration
  );

  console.log(configurations);

  const paradigmsFamilies =
    configurations?.data.available_paradigms_families.map((family) => ({
      value: family.name,
      label: family.name,
    }));

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
  const paradigms = configurations?.data.available_paradigms;
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

  const findingTypes = configurations?.data.available_finding_tags_types?.map(
    (type) => ({
      value: type.id,
      label: type.name,
      family: type.family,
    })
  );
  const findingTagsFamilies =
    configurations?.data.available_finding_tags_families?.map((type) => ({
      value: type.id,
      label: type.name,
    }));
  const AALOptions = configurations?.data.available_AAL_atlas_tag_types?.map(
    (type) => ({
      value: type,
      label: type,
    })
  );

  const analysisTypeOptions =
    configurations?.data.available_analysis_type_choices.map((type) => ({
      value: type,
      label: rawTextToShow(type),
    }));
  const shouldCheckAllClassificationsFilled = false;
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
              theories={[]}
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
          </div>
          <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
            <Text color="grayReg" weight={"bold"}>
              Findings
            </Text>

            <Findings
              fieldOptions={{
                techniquesOptions: techniques?.map((tech) => ({
                  value: tech.id || tech.value,
                  label: tech.name || tech.label,
                })),
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
