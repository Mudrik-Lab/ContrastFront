import { queryApi } from "../Utils/api";

export default async function getFreeQueries({
  breakdown,
  is_reporting,
  min_number_of_experiments,
  type_of_consciousness,
  interpretations,
  theory_driven,
  techniques,
  consciousness_measure_phases,
  consciousness_measure_types,
  finding_tags_families,
  finding_tags_types,
  measures,
  paradigm_families,
  paradigms,
  populations,
  stimuli_categories,
  stimuli_modalities,
  tasks,
  interpretation_theories,
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
  const paradigmFamiliesArr = paradigm_families?.map(
    (item) => "&paradigm_families=" + item.value
  );
  const paradigmsArr = paradigms?.map((item) => "&paradigms=" + item.value);
  const populationArr = populations?.map(
    (item) => "&populations=" + item.value
  );
  const stimuliCategoriesArr = stimuli_categories?.map(
    (item) => "&stimuli_categories=" + item.value
  );
  const stimuliModalitiesArr = stimuli_modalities?.map(
    (item) => "&stimuli_modalities=" + item.value
  );
  const tasksArr = tasks?.map((item) => "&tasks=" + item.value);
  const theoryDrivenArr = theory_driven?.map(
    (item) => "&theory_driven=" + item.value
  );
  const interpretationTheoriesArr = interpretation_theories?.map(
    (item) => "&interpretation_theories=" + item.value
  );
  const interpretationsArr = interpretations?.map(
    (item) => "&interpretations_types=" + item.value
  );

  return await queryApi({
    url: `studies/experiments_graphs/parameters_distribution_free_queries/?${
      (techniquesArr?.join("") || "") +
      (consciousnessMeasurePhasesArr?.join("") || "") +
      (consciousnessMeasureTypesArr?.join("") || "") +
      (tagsFamiliesArr?.join("") || "") +
      (tagsTypesArr?.join("") || "") +
      (measuresArr?.join("") || "") +
      (paradigmFamiliesArr?.join("") || "") +
      (paradigmsArr?.join("") || "") +
      (populationArr?.join("") || "") +
      (stimuliCategoriesArr?.join("") || "") +
      (stimuliModalitiesArr?.join("") || "") +
      (interpretationsArr?.join("") || "") +
      (theoryDrivenArr?.join("") || "") +
      (interpretationTheoriesArr?.join("") || "") +
      (tasksArr?.join("") || "")
    }`,
    params: {
      breakdown,
      min_number_of_experiments,
      is_reporting,
      type_of_consciousness,
    },
    method: "GET",
  });
}
