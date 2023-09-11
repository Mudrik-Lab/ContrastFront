import { queryApi } from "../Utils/api";

export async function setNotes({
  study_pk,
  experiment_pk,
  note,
  classification,
}) {
  return await queryApi({
    url: `/studies/submitted_studies/${study_pk}/experiments/${experiment_pk}/set_${classification}_notes/`,
    method: "POST",
    isProtected: true,
    data: { note },
  });
}