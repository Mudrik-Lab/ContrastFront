import { queryApi } from "../Utils/api";

export default async function getJournals(theory) {
  return await queryApi({
    url: `studies/experiments_graphs/journals/`,
    params: { theory },
    method: "GET",
  });
}
