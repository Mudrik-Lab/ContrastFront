import { queryApi } from "../Utils/api";

export default async function getFreeQueries({
  breakdown,
  techniques,
  consciousness_measure_phases,
  is_reporting,
  min_number_of_experiments,
}) {
  const techniquesArr = techniques?.map((t) => "&techniques=" + t.value);
  const consciousnessMeasurePhasesArr = consciousness_measure_phases?.map(
    (item) => "&consciousness_measure_phases=" + item.value
  );

  return await queryApi({
    url: `studies/experiments_graphs/parameters_distribution_free_queries/?${
      techniquesArr?.join("").slice(1) + consciousnessMeasurePhasesArr?.join("")
    }`,
    params: {
      breakdown,
      min_number_of_experiments,
      is_reporting,
    },
    method: "GET",
  });
}
