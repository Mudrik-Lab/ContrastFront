import { queryApi } from "../Utils/api";

export default async function getFrequencies({
  techniques,
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
  min_number_of_experiments,
}) {
  const techniquesArr = techniques?.map((t) => "&techniques=" + t.value);
  console.log(techniquesArr.join(""));
  return await queryApi({
    url: `studies/experiments_graphs/frequencies/?${techniquesArr
      .join("")
      .slice(1)}`,
    params: {
      theory,
      is_reporting,
      theory_driven,
      type_of_consciousness,
      min_number_of_experiments,
    },
    method: "GET",
  });
}
