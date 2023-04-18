import { queryApi } from "../Utils/api";

export default async function getConfuguration() {
  return await queryApi({
    url: `configuration/configuration/graphs`,
    method: "GET",
  });
}
