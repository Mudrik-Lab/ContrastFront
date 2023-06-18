import { queryApi } from "../Utils/api";
async function loginApi({ data }) {
  return await queryApi({
    url: `http://localhost:8080/api-token-auth/`,
    method: "POST",
    data,
  })
    .then((res) => res)
    .catch((error) => {
      return { error: error };
    });
}

export default async function useLogin(username, password) {
  const data = {
    username,
    password,
  };

  return await loginApi({ data: data });
}
