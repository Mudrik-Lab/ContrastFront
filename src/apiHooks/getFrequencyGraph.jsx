import { queryApi } from "../Utils/api";

export default async function getFrequencies({
  techniques,
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
}) {
  const arr = techniques?.map((t) => "&techniques=" + t.value);
  console.log(arr.join(""));
  return await queryApi({
    url: `studies/experiments_graphs/frequencies/?${arr.join("").slice(1)}`,
    params: {
      theory,
      is_reporting,
      theory_driven,
      type_of_consciousness,
    },
    method: "GET",
  });
}
