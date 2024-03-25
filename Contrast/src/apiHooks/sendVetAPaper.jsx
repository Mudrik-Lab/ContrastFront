import { queryApi } from "../Utils/api";

export default async function sendVetAPaper({
  email,
  DOI,
  comments,
  is_author,
}) {
  return await queryApi({
    url: `profiles/feedbacks/vet_a_paper/`,
    method: "POST",
    data: {
      email,
      DOI,
      comments,
      is_author,
    },
  });
}
