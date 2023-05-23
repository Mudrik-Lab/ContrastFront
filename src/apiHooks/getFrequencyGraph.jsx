import { queryApi } from "../Utils/api";
import { fixArraytoURL } from "../Utils/functions";

export default async function getFrequencies({
  techniques,
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
}) {
  const techniquesArr = fixArraytoURL(techniques, "techniques");

  return await queryApi({
    url: `studies/experiments_graphs/frequencies/?${techniquesArr?.slice(1)}`,
    params: {
      theory,
      is_reporting,
      theory_driven,
      type_of_consciousness,
    },
    method: "GET",
  });
}
