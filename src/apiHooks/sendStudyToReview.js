import { queryApi } from "../Utils/api";

export async function sendStudyToReview(study_pk) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/submit_to_review/`,
    method: "POST",
    isProtected: true,
  });
}
