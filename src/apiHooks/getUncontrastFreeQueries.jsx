import { queryApi } from "../Utils/api";

export default async function getUncontrastFreeQueries({
  breakdown,
  min_number_of_experiments,
  consciousness_measure_phases,
  consciousness_measure_types,
  mode_of_presentation,
  paradigms,
  populations,
  processing_domain_types,
  significance,
  suppressed_stimuli_categories,
  suppressed_stimuli_modalities,
  suppression_methods_types,
  target_stimuli_categories,
  target_stimuli_modalities,
  types,
  tasks,
  are_participants_excluded,
  outcome_types,
}) {
  const consciousnessMeasurePhasesArr = consciousness_measure_phases?.map(
    (item) => "&consciousness_measure_phases=" + item.value
  );
  const paradigmsArr = paradigms?.map((item) => "&paradigms=" + item.value);
  const modeOfPresentationArr = mode_of_presentation?.map(
    (item) => "&mode_of_presentation=" + item.value
  );
  const consciousnessMeasureTypesArr = consciousness_measure_types?.map(
    (item) => "&consciousness_measure_types=" + item.value
  );
  const processingDomainTypesArr = processing_domain_types?.map(
    (item) => "&processing_domain_types=" + item.value
  );
  const suppressedStimuliCategoriesArr = suppressed_stimuli_categories?.map(
    (item) => "&suppressed_stimuli_categories=" + item.value
  );
  const typesArr = types?.map((item) => "&types=" + item.value);
  const suppressedStimuliModalitiesArr = suppressed_stimuli_modalities?.map(
    (item) => "&suppressed_stimuli_modalities=" + item.value
  );
  const suppressionMethodsTypesArr = suppression_methods_types?.map(
    (item) => "&suppression_methods_types=" + item.value
  );
  const populationArr = populations?.map(
    (item) => "&populations=" + item.value
  );
  const targetStimuliCategoriesArr = target_stimuli_categories?.map(
    (item) => "&target_stimuli_categories=" + item.value
  );
  const targetStimuliModalitiesArr = target_stimuli_modalities?.map(
    (item) => "&target_stimuli_modalities=" + item.value
  );
  const tasksArr = tasks?.map((item) => "&tasks=" + item.value);
  const outcomeArr = outcome_types?.map(
    (item) => "&outcome_types=" + item.value
  );

  return await queryApi({
    url: `uncontrast_studies/experiments_graphs/parameters_distribution_free_queries/?${
      (consciousnessMeasurePhasesArr?.join("") || "") +
      (consciousnessMeasureTypesArr?.join("") || "") +
      (processingDomainTypesArr?.join("") || "") +
      (suppressedStimuliCategoriesArr?.join("") || "") +
      (typesArr?.join("") || "") +
      (suppressedStimuliModalitiesArr?.join("") || "") +
      (suppressionMethodsTypesArr?.join("") || "") +
      (populationArr?.join("") || "") +
      (targetStimuliCategoriesArr?.join("") || "") +
      (targetStimuliModalitiesArr?.join("") || "") +
      (tasksArr?.join("") || "") +
      (outcomeArr?.join("") || "")
    }`,
    params: {
      breakdown,
      are_participants_excluded,
      min_number_of_experiments,
      significance,
    },
    method: "GET",
  });
}
