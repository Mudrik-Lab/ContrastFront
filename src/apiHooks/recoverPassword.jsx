import { queryApi } from "../Utils/api";

export default async function recoverPassword({ email }) {
  return await queryApi({
    url: `profiles/profiles/request_password_reset/`,
    method: "POST",
    data: {
      email,
    },
  });
}
