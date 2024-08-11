import { Site } from "../config/siteType";
import { queryApi } from "../Utils/api";

export async function sendStudyToReview(study_pk) {
  const isUncontrast = Site.type === "uncontrast";
  let UrlPrefix = isUncontrast ? "uncontrast_" : "";
  return await queryApi({
    url: `${UrlPrefix}studies/submitted_studies/${study_pk}/submit_to_review/`,
    method: "POST",
    isProtected: true,
  });
}
