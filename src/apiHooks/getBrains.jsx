import { queryApi } from "../Utils/api";

export default async function getBrains({
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
  min_number_of_experiments
}) {

  return await queryApi({
    url: `studies/experiments_graphs/brain_images/`,
    params: {
      theory,
      is_reporting,
      theory_driven,
      type_of_consciousness,
      min_number_of_experiments
    },
    method: "GET",
  });
}
