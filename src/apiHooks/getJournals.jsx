import { queryApi } from "../Utils/api";

export default async function getJournals({
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
  min_number_of_experiments,
  isUncontrast,
  significance,
}) {
  return await queryApi({
    url: isUncontrast
      ? `uncontrast_studies/experiments_graphs/journals/`
      : `studies/experiments_graphs/journals/`,
    params: {
      min_number_of_experiments,
      significance,
      theory,
      is_reporting: is_reporting,
      type_of_consciousness: type_of_consciousness,
      theory_driven: theory_driven,
    },
    method: "GET",
  });
}
