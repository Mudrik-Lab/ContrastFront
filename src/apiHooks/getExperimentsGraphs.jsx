import { queryApi } from "../Utils/api";

export default async function getExperimentsGraphs(
  graphName,
  breakdown,
  theory,
  is_reporting,
  min_number_of_experiments
) {
  return await queryApi({
    url: `studies/experiments_graphs/${graphName}`,
    params: { breakdown, theory, is_reporting, min_number_of_experiments },
    method: "GET",
  });
}
