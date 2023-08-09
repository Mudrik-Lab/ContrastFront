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

  const handleRefetch = () => {
    console.log("refetch");
    studyRefetch();
    setPaperToEdit(data?.data);
  };

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
  const techniquesOptions = extraConfig?.data.available_techniques.map(
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

  return (
    <>
      {extraConfigSuccess && setAddNewExperiment && (
        <div className="p-2 h-full w-[49%] shadow-3xl flex flex-col gap-2">
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
              experimentData={experimentData}
              study_id={study.id}
              setExperimentID={setExperimentID}
              isEditMode={isEditMode}
            />

            <Paradigms
              filedOptions={paradigmsFamilies}
              optionalParadigms={paradigms}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.paradigms}
            />
            <Interpretations
              filedOptions={theories}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.interpretations}
            />
            <Samples
              filedOptions={populations}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.samples}
            />
            <Tasks
              filedOptions={tasks}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.tasks}
            />
            <Stimuli
              filedOptions={stimulusCategories}
              subCategories={stimulusSubCategories}
              modalities={stimulusModalities}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.stimuli}
            />
            <ConsciousnessMeasures
              filedOptions={analysisMeasuresOptions}
              analysisPhaseOptions={analysisPhaseOptions}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.consciousness_measures}
            />
            <Techniques
              filedOptions={techniquesOptions}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.techniques}
            />

            <Measures
              filedOptions={measuresOptions}
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
              filedOptions={{
                techniquesOptions,
                findingTagsFamilies,
                findingTypes,
              }}
              experiment_pk={experimentID}
              study_pk={study.id}
              disabled={!experimentID}
              values={experimentData?.finding_tags}
            />
          </div>

          <button
            className="font-bold my-2"
            onClick={() => {
              setPaperToEdit(false);
              setAddNewExperiment(false);
              setNewPaper(false);
              // handleRefetch();
              // refetch();

              // !isEditMode && setAddNewExperiment(false);
            }}>
            Exit
          </button>
        </div>
      )}
    </>
  );
}
