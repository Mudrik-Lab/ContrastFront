import { queryApi } from "../Utils/api";

export default async function getNations({
  is_reporting,
  theory_driven,
  type_of_consciousness,
  theory,
  min_number_of_experiments,
}) {
  const theoriesArr = theory?.map((t) => "&theory=" + t.value);
  console.log(theory);
  return await queryApi({
    url: `studies/experiments_graphs/nations_of_consciousness/?${theoriesArr
      ?.join("")
      .slice(1)}`,
    params: {
      is_reporting,
      theory_driven,
      type_of_consciousness,
      min_number_of_experiments,
    },
    method: "GET",
  });
}
