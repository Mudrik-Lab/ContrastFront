import { queryApi } from "../Utils/api";

export default async function getUser() {
  return await queryApi({
    url: `profiles/profiles/home/`,
    method: "GET",
    isProtected: true,
  });
}
