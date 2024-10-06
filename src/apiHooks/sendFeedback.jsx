import { queryApi } from "../Utils/api";

export default async function sendFeedback({
  email,
  queries_score,
  experience_score,
  completeness_score,
  paper_uploading_score,
  comments,
}) {
  const isUncontrast = Site.type === "uncontrast";
  return await queryApi({
    url: isUncontrast
      ? `profiles/feedbacks_uncontrast/site_feedback/`
      : `profiles/feedbacks/site_feedback/`,
    method: "POST",
    data: {
      email,
      queries_score,
      experience_score,
      completeness_score,
      paper_uploading_score,
      comments,
    },
  });
}
