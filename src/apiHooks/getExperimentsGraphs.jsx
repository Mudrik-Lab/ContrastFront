import { queryApi } from "../Utils/api";

export default async function getExperimentsGraphs(
  graphName,
  breakdown,
  theory
) {
  return await queryApi({
    url: `studies/experiments_graphs/${graphName}`,
    params: { breakdown, theory },
    method: "GET",
  });
}
