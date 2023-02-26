import { queryApi } from "../Utils/api";

export default async function useGetExpiramentsGraphs(graphName, breakdown) {
  console.log(breakdown);
  return await queryApi({
    url: `http://localhost:8080/api/studies/experiments_graphs/${graphName}`,
    params: { breakdown },
    method: "GET",
  });
}
