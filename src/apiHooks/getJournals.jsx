import { queryApi } from "../Utils/api";

export default async function getJournals({
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
  min_number_of_experiments,
  isUncontrast,
}) {
  return await queryApi({
    url: isUncontrast
      ? `uncontrast_studies/experiments_graphs/journals/`
      : `studies/experiments_graphs/journals/`,
    params: {
      min_number_of_experiments,
      ...(isUncontrast ? {} : { theory }),
      ...(isUncontrast ? {} : { is_reporting: is_reporting }),
      ...(isUncontrast ? {} : { type_of_consciousness: type_of_consciousness }),
      ...(isUncontrast ? {} : { theory_driven: theory_driven }),
    },
    method: "GET",
  });
}
