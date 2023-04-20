import { queryApi } from "../Utils/api";

export default async function getFrequencies(techniques, theory) {
  return await queryApi({
    url: `studies/experiments_graphs/frequencies`,
    params: { techniques, theory },
    method: "GET",
  });
}
