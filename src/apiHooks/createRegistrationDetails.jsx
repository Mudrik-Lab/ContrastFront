import { queryApi } from "../Utils/api";

export default async function createProfile({
  date_of_birth,
  self_identified_gender,
  academic_affiliation,
  country_of_residence,
  academic_stage,
  has_ASSC_membership = true,
}) {
  const requestData = {
    self_identified_gender,
    academic_affiliation,
    academic_stage,
    has_ASSC_membership,
  };

  if (country_of_residence !== "") {
    requestData.country_of_residence = country_of_residence;
  }
  if (date_of_birth !== "--") {
    requestData.date_of_birth = date_of_birth;
  }

  return await queryApi({
    url: "profiles/profiles/register/",
    method: "POST",
    isProtected: true,
    data: requestData,
  });
}
