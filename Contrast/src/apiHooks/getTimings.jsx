import { queryApi } from "../Utils/api";
import { fixArraytoURL } from "../Utils/functions";

export default async function getTimings({
  techniques,
  theory,
  is_reporting,
  theory_driven,
  type_of_consciousness,
  tags,
}) {
  const techniquesArr = fixArraytoURL(techniques, "techniques");
  const tagsArr = fixArraytoURL(tags, "tags_types");

  return await queryApi({
    url: `studies/experiments_graphs/timings/?${
      techniquesArr?.slice(1) + tagsArr
    }`,
    params: {
      theory,
      is_reporting,
      theory_driven,
      type_of_consciousness,
    },
    method: "GET",
  });
}
