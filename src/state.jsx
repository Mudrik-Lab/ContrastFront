import { proxy } from "valtio";

export const state = proxy({
  auth: null,
  path: "/",
  user: {
    id: null,
    user: null,
    date_of_birth: null,
    self_identified_gender: null,
    academic_affiliation: null,
    country_of_residence: null,
    academic_stage: null,
    has_ASSC_membership: null,
    username: null,
    email: null,
  },
});
