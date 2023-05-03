import { queryApi } from "../Utils/api";

export default async function getTimings({
  techniques,
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
  tags,
  min_number_of_experiments,
}) {
  const techniquesArr = techniques?.map((t) => "&techniques=" + t.value);
  const tagsArr = tags?.map((t) => "&tags_types=" + t.value);

  return await queryApi({
    url: `studies/experiments_graphs/timings/?${
      techniquesArr?.join("") + tagsArr?.join("")
    }`,
    params: {
      theory,
      is_reporting,
      theory_driven,
      type_of_consciousness,
      min_number_of_experiments,
    },
    method: "GET",
  });
}
