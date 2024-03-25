import { queryApi } from "../Utils/api";

export default async function getFormConfig() {
  return await queryApi({
    url: `configuration/configuration/registration_form/`,
    method: "GET",
  });
}
