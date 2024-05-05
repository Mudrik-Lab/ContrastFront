import { queryApi } from "../Utils/api";

export default async function getExperimentsGraphs({
  graphName,
  breakdown,
  theory,
  is_reporting,
  min_number_of_experiments,
  type_of_consciousness,
  theory_driven,
  interpretation,
  isUncontrast,
  significance,
}) {
  const url = isUncontrast
    ? "uncontrast_studies/experiments_graphs"
    : "studies/experiments_graphs";
  return await queryApi({
    url: `${url}/${graphName}/`,
    params: {
      breakdown,
      theory,
      min_number_of_experiments,
      significance,
      is_reporting,
      type_of_consciousness,
      theory_driven,
      interpretation,
    },
    method: "GET",
  });
}
