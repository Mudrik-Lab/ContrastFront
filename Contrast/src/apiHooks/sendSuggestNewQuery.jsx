import { queryApi } from "../Utils/api";

export default async function sendSuggestNewQuery({ email, suggestions }) {
  return await queryApi({
    url: `profiles/feedbacks/suggest_new_query/`,
    method: "POST",
    data: {
      email,
      suggestions,
    },
  });
}
