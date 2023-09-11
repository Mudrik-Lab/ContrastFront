import React, { useState } from "react";
import { Text } from "../../../components/Reusble";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../../apiHooks/getExtraConfig";

import BasicClassification from "./BasicClassification";
import { rawTextToShow } from "../../../Utils/functions";
import Samples from "./Samples";
import Stimuli from "./Stimuli";
import Techniques from "./Techniques";
import Measures from "./Measures";
import ConsciousnessMeasures from "./ConsciousnessMeasures";
import Interpretations from "./Interpretations";
import Findings from "./Findings";
import Tasks from "./Tasks";
import Paradigms from "./Paradigms";
import { getExperiment } from "../../../apiHooks/getExperiment";
import { getStudy } from "../../../apiHooks/getStudies";
import {
  upladPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../../Utils/HardCoded";
import ResultsSummary from "./ResultsSummary";

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
  const [techniques, setTechniques] = useState(experimentData?.techniques);

  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  const {
    data,
    isSuccess,
    refetch: studyRefetch,
  } = useQuery({
    queryKey: [`submitted_study`, study.id],
    queryFn: () => study && getStudy({ id: study.id }),
  });

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
  console.log(extraConfig?.data.available_finding_tags_families);
  const AALOptions = extraConfig?.data.available_AAL_atlas_tag_types?.map(
    (type) => ({
      value: type,
      label: type,
    })
  );

  const experimentTypeOptions = extraConfig?.data.available_experiment_types;
  const analysisTypeOptions =
    extraConfig?.data.available_analysis_type_choices.map((type) => ({
      value: type,
      label: rawTextToShow(type),
    }));

  return (
    <>
      {extraConfigSuccess && setAddNewExperiment && (
        <div
          className="p-2 w-1/2 shadow-3xl flex flex-col gap-2 overflow-y-scroll"
          style={{
            height: `calc(100vh - ${
              uploadPaperUsedHeight + upladPaperPageTopSection + 10
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
            />

            <Paradigms
              fieldOptions={paradigmsFamilies}
              optionalParadigms={paradigms}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.paradigms}
            />

            <Samples
              fieldOptions={populations}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
            />
            <Tasks
              fieldOptions={tasks}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
            />
            <Stimuli
              fieldOptions={stimulusCategories}
              subCategories={stimulusSubCategories}
              modalities={stimulusModalities}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
            />
            <ConsciousnessMeasures
              fieldOptions={analysisMeasuresOptions}
              analysisPhaseOptions={analysisPhaseOptions}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData}
            />
            <Techniques
              fieldOptions={techniquesOptions}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.techniques}
              setTechniques={setTechniques}
            />

            <Measures
              fieldOptions={measuresOptions}
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
                techniquesOptions:
                  techniques?.map((tech) => ({
                    value: tech.id,
                    label: tech.name,
                  })) || techniquesOptions,
                findingTagsFamilies,
                findingTypes,
                AALOptions,
                analysisTypeOptions,
              }}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.finding_tags}
            />
            <Interpretations
              fieldOptions={theories}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.interpretations}
            />
            <ResultsSummary
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.results_summary}
            />
          </div>

          <button
            className="font-bold my-2"
            onClick={() => {
              setPaperToEdit(false);
              setAddNewExperiment(false);
              setNewPaper(false);
              studyRefetch();
            }}>
            Close Experiment
          </button>
        </div>
      )}
    </>
  );
}
