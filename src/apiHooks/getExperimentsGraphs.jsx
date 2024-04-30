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
      ...(isUncontrast ? {} : { is_reporting: is_reporting }),
      ...(isUncontrast ? {} : { type_of_consciousness: type_of_consciousness }),
      ...(isUncontrast ? {} : { theory_driven: theory_driven }),
      ...(isUncontrast ? {} : { interpretation: interpretation }),
    },
    method: "GET",
  });
}
