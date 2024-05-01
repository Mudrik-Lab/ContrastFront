import { queryApi } from "../Utils/api";

export default async function getAcrossTheYears({
  breakdown,
  is_reporting,
  min_number_of_experiments,
  theory_driven,
  type_of_consciousness,
  isUncontrast,
}) {
  return await queryApi({
    url: isUncontrast
      ? `uncontrast_studies/experiments_graphs/trends_over_years/`
      : `studies/experiments_graphs/trends_over_years`,
    params: {
      breakdown,
      min_number_of_experiments,
      ...(isUncontrast ? {} : { is_reporting: is_reporting }),
      ...(isUncontrast ? {} : { type_of_consciousness: type_of_consciousness }),
      ...(isUncontrast ? {} : { theory_driven: theory_driven }),
    },
    method: "GET",
  });
}
