import { queryApi } from "../Utils/api";

export default async function useGetStudies() {
  return await queryApi({
    url: "http://localhost:8080/api/studies/studies/",
    method: "GET",
  });
}
