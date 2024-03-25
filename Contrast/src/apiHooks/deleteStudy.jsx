import { queryApi } from "../Utils/api";

export async function deleteStudy({ study_pk }) {
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/`,
    method: "DELETE",
    isProtected: true,
  });
}
