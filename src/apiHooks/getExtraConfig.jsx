import { queryApi } from "../Utils/api";

export default async function getExtraConfig() {
  return await queryApi({
    url: `configuration/configuration/studies_form/`,
    method: "GET",
  });
}
