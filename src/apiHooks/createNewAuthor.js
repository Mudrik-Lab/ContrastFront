import { queryApi } from "../Utils/api";

export async function createNewAuthor(
   name
  ) {
    return await queryApi({
      url: `studies/authors/`,
      method: "POST",
      isProtected: true,
      data: {name},
    });
  }