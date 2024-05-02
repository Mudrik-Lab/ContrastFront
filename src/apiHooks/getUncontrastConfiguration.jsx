import { queryApi } from "../Utils/api";

export default async function getUncontrastConfiguration() {
  return await queryApi({
    url: `configuration/configuration/uncon_studies_form/`,
    method: "GET",
  });
}
