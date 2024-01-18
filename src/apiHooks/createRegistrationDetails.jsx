import { queryApi } from "../Utils/api";

export default async function createProfile({
  id,
  date_of_birth,
  self_identified_gender,
  academic_affiliation,
  country_of_residence,
  academic_stage,
  has_opted_for_contrast_updates = true,
}) {
  const requestData = {
    self_identified_gender,
    academic_affiliation,
    academic_stage,
    has_opted_for_contrast_updates,
  };

  if (country_of_residence !== "") {
    requestData.country_of_residence = country_of_residence;
  }
  if (date_of_birth !== "--") {
    requestData.date_of_birth = date_of_birth;
  }

  return await queryApi({
    url: `profiles/profiles/${id}/`,
    method: "PATCH",
    isProtected: true,
    data: requestData,
  });
}
