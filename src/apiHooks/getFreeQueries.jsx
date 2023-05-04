import { queryApi } from "../Utils/api";

export default async function getFreeQueries({
  breakdown,
  techniques,
  consciousness_measure_phases,
  is_reporting,
  min_number_of_experiments,
  consciousness_measure_types,
  finding_tags_families,
  finding_tags_types,
  measures,
}) {
  const techniquesArr = techniques?.map((t) => "&techniques=" + t.value);
  const consciousnessMeasurePhasesArr = consciousness_measure_phases?.map(
    (item) => "&consciousness_measure_phases=" + item.value
  );
  const consciousnessMeasureTypesArr = consciousness_measure_types?.map(
    (item) => "&consciousness_measure_types=" + item.value
  );
  const tagsFamiliesArr = finding_tags_families?.map(
    (item) => "&finding_tags_families=" + item.value
  );
  const tagsTypesArr = finding_tags_types?.map(
    (item) => "&finding_tags_types=" + item.value
  );
  const measuresArr = measures?.map((item) => "&measures=" + item.value);

  return await queryApi({
    url: `studies/experiments_graphs/parameters_distribution_free_queries/?${
      techniquesArr?.join("") +
      consciousnessMeasurePhasesArr?.join("") +
      consciousnessMeasureTypesArr?.join("") +
      tagsFamiliesArr?.join("") +
      tagsTypesArr?.join("") +
      measuresArr?.join("")
    }`,
    params: {
      breakdown,
      min_number_of_experiments,
      is_reporting,
    },
    method: "GET",
  });
}
