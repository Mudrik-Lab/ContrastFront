import { queryApi } from "../Utils/api";

export default async function useGetPie() {
  return await queryApi({
    isProtected: true,
    url: "https://api.airtable.com/v0/appQHEMJ1PASK4Kfj/second-PieCharts",
    method: "GET",
  });
}
