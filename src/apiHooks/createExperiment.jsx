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
}) {
  const requestData = {
    paradigm: chosenParadigm,
  };

  return await queryApi({
    url: `uncontrast_studies/submitted_studies/${study_pk}/experiments/`,
    method: "POST",
    isProtected: true,
    data: requestData,
  });
}

export async function updateUncontrastExperiments({
  study_pk,
  chosenParadigm,
  experiment_id,
}) {
  const requestData = {
    paradigm: parseInt(chosenParadigm),
  };

  return await queryApi({
    url: `uncontrast_studies/submitted_studies/${study_pk}/experiments/${experiment_id}/`,
    method: "PATCH",
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
  property_id,
  study_pk,
  experiment_pk,
  classificationName,
  isUncontrast,
}) {
  let UrlPrefix = isUncontrast ? "uncontrast_" : "";

  return await queryApi({
    url: `${UrlPrefix}studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/add_${classificationName.slice(
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
  console.log(field);
  let UrlPrefix = isUncontrast ? "uncontrast_" : "";
  return await queryApi({
    url: `${UrlPrefix}studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/${field_name}/`,
    method: "POST",
    isProtected: true,
    data: field,
  });
}
