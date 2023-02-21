import { queryApi } from "../Utils/api";

export default async function useGetTopics() {
  return await queryApi({
    isProtected: true,
    url: "https://api.airtable.com/v0/appQHEMJ1PASK4Kfj/firstChart",
    method: "GET",
  });
}
