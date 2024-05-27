import { queryApi } from "../Utils/api";

export async function deleteExperiment({
  study_pk,
  experiment_pk,
  isUncontrast,
}) {
  return await queryApi({
    url: isUncontrast
      ? `uncontrast_studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/`
      : `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/`,
    method: "DELETE",
    isProtected: true,
  });
}

export async function deletePropertyFromExperiment({
  classificationName,
  study_pk,
  experiment_pk,
  property_id,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/remove_${classificationName.slice(
      0,
      classificationName.length - 1
    )}/`,
    method: "POST",
    isProtected: true,
    data: { id: property_id },
  });
}

export async function deleteFieldFromExperiments({
  study_pk,
  experiment_pk,
  classificationName,
  id,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/${classificationName}/${id}/`,
    method: "DELETE",
    isProtected: true,
  });
}
