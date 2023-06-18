import { queryApi } from "../Utils/api";

export default async function createProfile({
  date_of_birth,
  self_identified_gender,
  academic_affiliation,
  country_of_residence,
  academic_stage,
  has_ASSC_membership = true,
}) {
  return await queryApi({
    url: `profiles/profiles/register/`,
    method: "POST",
    data: {
      date_of_birth,
      self_identified_gender,
      academic_affiliation,
      country_of_residence,
      academic_stage,
      has_ASSC_membership,
    },
  });
}
