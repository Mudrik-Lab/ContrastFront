import { queryApi } from "../Utils/api";

export async function createExperiments({
  is_reporting,
  type_of_consciousness,
  theory_driven,
  experiment_type,
  study_pk,
}) {
  const requestData = {
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
  is_reporting,
  type_of_consciousness,
  theory_driven,
  experiment_type,
  study_pk,
  id,
}) {
  const requestData = {
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

export async function addPropertyToexperiment({
  property_id,
  study_pk,
  experiment_pk,
  classificationName,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/add_${classificationName}/`,
    method: "POST",
    isProtected: true,
    data: { id: property_id },
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
