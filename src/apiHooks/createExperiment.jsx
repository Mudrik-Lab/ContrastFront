import { queryApi } from "../Utils/api";

export async function createExperiments({
  is_reporting,
  type_of_consciousness,
  theory_driven,
  experiment_type,
  study_pk,
  theory_driven_theories,
}) {
  const requestData = {
    is_reporting,
    type_of_consciousness,
    theory_driven,
    type: experiment_type,
    theory_driven_theories,
  };
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/`,
    method: "POST",
    isProtected: true,
    data: requestData,
  });
}
export async function createUncontrastExperiments({
  study_pk,
  chosenParadigm,
  // experiment_findings_notes,
  // type,
  // is_target_same_as_suppressed_stimulus,
  // is_target_stimulus,
  // consciousness_measures_notes,
}) {
  console.log(chosenParadigm);
  const requestData = {
    paradigm: chosenParadigm,
    // experiment_findings_notes,
    // type,
    // is_target_same_as_suppressed_stimulus,
    // is_target_stimulus,
    // consciousness_measures_notes,
  };

  return await queryApi({
    url: `uncontrast_studies/submitted_studies/${study_pk}/experiments/`,
    method: "POST",
    isProtected: true,
    data: requestData,
  });
}

export async function editExperiments({
  is_reporting,
  type_of_consciousness,
  theory_driven,
  experiment_type,
  study_pk,
  id,
  theory_driven_theories,
}) {
  const requestData = {
    is_reporting,
    type_of_consciousness,
    theory_driven,
    type: experiment_type,
    theory_driven_theories,
  };
  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments/${id}/`,
    method: "PATCH",
    isProtected: true,
    data: requestData,
  });
}

export async function addPropertyToexperiment({
  isUncontrast,
  property_id,
  study_pk,
  experiment_pk,
  classificationName,
}) {
  let UrlPrefix = isUncontrast ? "uncontrast_" : "";

  return await queryApi({
    url: `${UrlPrefix}uncontrast_studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/add_${classificationName.slice(
      0,
      classificationName.length - 1
    )}/`,
    method: "POST",
    isProtected: true,
    data: { id: property_id },
  });
}

export async function addFieldToexperiment({
  isUncontrast,
  field,
  study_pk,
  experiment_pk,
  field_name,
}) {
  let UrlPrefix = isUncontrast ? "uncontrast_" : "";
  return await queryApi({
    url: `${UrlPrefix}studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/${field_name}/`,
    method: "POST",
    isProtected: true,
    data: field,
  });
}
