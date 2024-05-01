import { queryApi } from "../Utils/api";

export default async function getAcrossTheYears({
  breakdown,
  is_reporting,
  min_number_of_experiments,
  theory_driven,
  type_of_consciousness,
  isUncontrast,
  significance,
}) {
  return await queryApi({
    url: isUncontrast
      ? `uncontrast_studies/experiments_graphs/trends_over_years/`
      : `studies/experiments_graphs/trends_over_years`,
    params: {
      breakdown,
      min_number_of_experiments,
      significance,
      is_reporting: is_reporting,
      type_of_consciousness: type_of_consciousness,
      theory_driven: theory_driven,
    },
    method: "GET",
  });
}
