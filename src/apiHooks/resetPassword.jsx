import { queryApi } from "../Utils/api";

export default async function resetPassword({ email, password, token }) {
  return await queryApi({
    url: `profiles/profiles/reset_password/`,
    method: "POST",
    data: {
      email,
      password,
      token,
    },
  });
}
