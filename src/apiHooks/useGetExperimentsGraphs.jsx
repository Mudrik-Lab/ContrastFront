import { queryApi } from "../Utils/api";

export default async function useGetExperimentsGraphs(graphName, breakdown) {
  console.log(breakdown);
  return await queryApi({
    url: `studies/experiments_graphs/${graphName}`,
    params: { breakdown },
    method: "GET",
  });
}
