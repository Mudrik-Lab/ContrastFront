import { queryApi } from "../Utils/api";

export async function deleteExperiment({ study_pk, experiment_pk }) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/`,
    method: "DELETE",
    isProtected: true,
  });
}
