import { queryApi } from "../Utils/api";

export default async function createExperiments({
  consciousness_measures,
  finding_description,
  interpretations,
  is_reporting,
  measures,
  notes,
  paradigms,
  samples,
  stimuli,
  tasks,
  techniques,
  theory_driven,
  theory_driven_theories,
  finding_tags,
  type,
  study_pk,
}) {
  const requestData = {
    consciousness_measures,
    finding_description,
    interpretations,
    is_reporting,
    measures,
    notes,
    paradigms,
    samples,
    stimuli,
    tasks,
    techniques,
    theory_driven,
    theory_driven_theories,
    finding_tags,
    type,
    study_pk,
  };

  return await queryApi({
    url: `studies/submitted_studies/${study_pk}/experiments`,
    method: "POST",
    isProtected: true,
    data: requestData,
  });
}
