import { queryApi } from "../Utils/api";

export default async function getFrequencies({
  techniques,
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
}) {
  const techniquesArr = techniques?.map((t) => "&techniques=" + t.value);

  return await queryApi({
    url: `studies/experiments_graphs/frequencies/?${
      techniquesArr && techniquesArr.join("").slice(1)
    }`,
    params: {
      theory,
      is_reporting,
      theory_driven,
      type_of_consciousness,
    },
    method: "GET",
  });
}
