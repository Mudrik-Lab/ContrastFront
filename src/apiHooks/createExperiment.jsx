import { queryApi } from "../Utils/api";

export async function createExperiments({
  finding_description,
  is_reporting,
  type_of_consciousness,
  theory_driven,
  experiment_type,
  study_pk,
}) {
  const requestData = {
    finding_description,
    is_reporting,
    type_of_consciousness,
    theory_driven,
    type: experiment_type,
  };
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/`,
    method: "POST",
    isProtected: true,
    data: requestData,
  });
}

export async function editExperiments({
  finding_description,
  is_reporting,
  type_of_consciousness,
  theory_driven,
  experiment_type,
  study_pk,
  id,
}) {
  const requestData = {
    finding_description,
    is_reporting,
    type_of_consciousness,
    theory_driven,
    type: experiment_type,
  };
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${id}/`,
    method: "PATCH",
    isProtected: true,
    data: requestData,
  });
}

export async function addParadigmToexperiment({
  paradigm,
  study_pk,
  experiment_pk,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/add_paradigm/`,
    method: "POST",
    isProtected: true,
    data: { id: paradigm },
  });
}

export async function addFieldToexperiment({
  field,
  study_pk,
  experiment_pk,
  field_name,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/${field_name}/`,
    method: "POST",
    isProtected: true,
    data: field,
  });
}

// export async function createExperimentsssss({ measures }) {
//   const requestData = {
//     consciousness_measures,
//     finding_description,
//     interpretations,
//     is_reporting,
//     measures,
//     notes,
//     paradigms,
//     samples,
//     stimuli,
//     tasks,
//     techniques,
//     theory_driven,
//     theory_driven_theories,
//     finding_tags,
//     type,
//     study_pk,
//   };

//   return await queryApi({
//     url: `studies/submitted_studies/${study_pk}/experiments`,
//     method: "POST",
//     isProtected: true,
//     data: requestData,
//   });
// }
