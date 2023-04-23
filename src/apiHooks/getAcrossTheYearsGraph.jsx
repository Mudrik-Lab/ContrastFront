import { queryApi } from "../Utils/api";

export default async function getAcrossTheYears({
  breakdown,
  is_reporting,
  min_number_of_experiments,
  theory_driven,
  type_of_consciousness,
}) {
  return await queryApi({
    url: `studies/experiments_graphs/across_the_years`,
    params: {
      breakdown,
      is_reporting,
      min_number_of_experiments,
      type_of_consciousness,
      theory_driven,
    },
    method: "GET",
  });
}
