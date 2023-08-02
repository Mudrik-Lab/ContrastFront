import { queryApi } from "../Utils/api";

export async function deleteExperiment({ study_pk, experiment_pk }) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/`,
    method: "DELETE",
    isProtected: true,
  });
}

export async function deletePropertyFromExperiment({
  classificationName,
  study_pk,
  experiment_pk,
  paradigm_id,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/remove_${classificationName}/`,
    method: "POST",
    isProtected: true,
    data: { id: paradigm_id },
  });
}

export async function deleteFieldFromExperiments({
  study_pk,
  experiment_pk,
  field_name,
  id,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/${field_name}/${id}/`,
    method: "DELETE",
    isProtected: true,
  });
}
