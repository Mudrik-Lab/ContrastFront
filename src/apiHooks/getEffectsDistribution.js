import { queryApi } from "../Utils/api";

export default async function getEffectsDistribution({
  continuous_breakdown,
  min_number_of_experiments,
  significance,
  binSize,
}) {
  return await queryApi({
    url: `uncontrast_studies/experiments_graphs/distribution_of_effects_across_parameters`,
    params: {
      continuous_breakdown,
      min_number_of_experiments,
      significance,
      bin_size: binSize,
    },
    method: "GET",
  });
}
