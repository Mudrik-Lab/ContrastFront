import { queryApi } from "../Utils/api";

export default async function useGetStudy(study_id) {
  return await queryApi({
    url: `http://localhost:8080/api/studies/studies/${study_id}`,
    method: "GET",
  });
}
