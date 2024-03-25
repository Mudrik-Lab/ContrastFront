import { queryApi } from "../Utils/api";

export default async function getConfiguration() {
  return await queryApi({
    url: `configuration/configuration/graphs/`,
    method: "GET",
  });
}
