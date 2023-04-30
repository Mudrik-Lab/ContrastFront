import { queryApi } from "../Utils/api";

export default async function getFreeQueries({
  breakdown,
  theory,
  is_reporting,
  min_number_of_experiments,
  type_of_consciousness,
  theory_driven,
  interpretation,
}) {
  return await queryApi({
    url: `studies/experiments_graphs/parameters_distribution_free_queries/`,
    params: {
      breakdown,
      theory,
      is_reporting,
      min_number_of_experiments,
      type_of_consciousness,
      theory_driven,
      interpretation,
    },
    method: "GET",
  });
}
