import { queryApi } from "../Utils/api";

export default async function getExperimentsGraphs({
  graphName,
  breakdown,
  theory,
  is_reporting,
  min_number_of_experiments,
  type_of_consciousness,
  theory_driven,
}) {
  return await queryApi({
    url: `studies/experiments_graphs/${graphName}`,
    params: {
      breakdown,
      theory,
      is_reporting,
      min_number_of_experiments,
      type_of_consciousness,
      theory_driven,
    },
    method: "GET",
  });
}
