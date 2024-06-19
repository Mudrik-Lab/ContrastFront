import { queryApi } from "../Utils/api";

export default async function getNations({
  is_reporting,
  theory_driven,
  type_of_consciousness,
  theory,
  min_number_of_experiments,
  isUncontrast,
}) {
  const theoriesArr = theory?.map((t) => "&theory=" + t.value);
  const url = isUncontrast
    ? "uncontrast_studies/experiments_graphs/nations_of_consciousness"
    : `studies/experiments_graphs/nations_of_consciousness/?${theoriesArr
        ?.join("")
        .slice(1)}`;

  return await queryApi({
    url: url,
    params: {
      min_number_of_experiments,
      is_reporting: is_reporting,
      type_of_consciousness: type_of_consciousness,
      theory_driven: theory_driven,
    },
    method: "GET",
  });
}
