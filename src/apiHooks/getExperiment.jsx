import { queryApi } from "../Utils/api";

export async function getExperiment({ study_pk, experiment_pk }) {
  console.log(study_pk, experiment_pk);
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${experiment_pk}`,
    method: "GET",
    isProtected: true,
  });
}
