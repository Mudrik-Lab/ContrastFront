import { queryApi } from "../Utils/api";

export async function craeteNewAuthor(
   name
  ) {
    return await queryApi({
      url: `studies/authors/`,
      method: "POST",
      isProtected: true,
      data: {name},
    });
  }