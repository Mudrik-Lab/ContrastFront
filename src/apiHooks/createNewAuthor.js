import { queryApi } from "../Utils/api";

export async function createNewAuthor(name, isUncontrast) {
  return await queryApi({
    url: isUncontrast ? `uncontrast_studies/authors/` : `studies/authors/`,
    method: "POST",
    isProtected: true,
    data: { name },
  });
}
