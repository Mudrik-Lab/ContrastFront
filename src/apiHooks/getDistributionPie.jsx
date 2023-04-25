import { queryApi } from "../Utils/api";

export default async function getDistributionPie({
  breakdown,
  is_reporting,
  theory_driven,
  type_of_consciousness,
  min_number_of_experiments,
}) {
  return await queryApi({
    url: `studies/experiments_graphs/parameters_distribution_pie/`,
    params: {
      breakdown,
      is_reporting,
      theory_driven,
      type_of_consciousness,
      min_number_of_experiments,
    },
    method: "GET",
  });
}
