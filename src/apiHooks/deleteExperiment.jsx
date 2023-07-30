import { queryApi } from "../Utils/api";

export async function deleteExperiment({ study_pk, experiment_pk }) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/`,
    method: "DELETE",
    isProtected: true,
  });
}

export async function deleteExperimentsParadigm({
  study_pk,
  experiment_pk,
  paradigm,
}) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/remove_paradigm/`,
    method: "POST",
    isProtected: true,
    data: { id: paradigm },
  });
}
