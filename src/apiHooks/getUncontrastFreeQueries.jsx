import {queryApi} from "../Utils/api";

export default async function getUncontrastFreeQueries({
                                                           breakdown,
                                                           min_number_of_experiments,
                                                           consciousness_measure_phases,
                                                           consciousness_measure_types,
                                                           processing_domain_types,
                                                           suppressed_stimuli_categories,
                                                           suppressed_stimuli_modalities,
                                                           suppression_methods_types,
                                                           target_stimuli_categories,
                                                           target_stimuli_modalities,
                                                           types,
                                                           populations,
                                                           tasks,

                                                       }) {

    const consciousnessMeasurePhasesArr = consciousness_measure_phases?.map(
        (item) => "&consciousness_measure_phases=" + item.value
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
    const suppressionMethodsTypesArr = suppression_methods_types?.map((item) => "&suppression_methods_types=" + item.value);
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
            (tasksArr?.join("") || "")
        }`,
        params: {
            breakdown,
            min_number_of_experiments,
        },
        method: "GET",
    });
}