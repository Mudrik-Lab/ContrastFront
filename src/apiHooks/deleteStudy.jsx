import { queryApi } from "../Utils/api";

export async function deleteStudy({ study_pk, isUncontrast }) {
  return await queryApi({
    url: isUncontrast
      ? `uncontrast_studies/submitted_studies/${study_pk}/`
      : `studies/submitted_studies/${study_pk}/`,
    method: "DELETE",
    isProtected: true,
  });
}
