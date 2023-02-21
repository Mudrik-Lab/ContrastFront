import { queryApi } from "../Utils/api";

export default async function useGetParamaetersDist() {
  return await queryApi({
    url: "http://localhost:8080/api/studies/experiments_graphs/parameters_distribution_bar/",
    method: "GET",
  });
}
