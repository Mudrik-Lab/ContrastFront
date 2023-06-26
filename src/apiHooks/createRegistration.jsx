import { queryApi } from "../Utils/api";

export default async function createRegistration({
  username,
  password,
  email,
}) {
  return await queryApi({
    url: `profiles/profiles/register_user/`,
    method: "POST",
    data: {
      username,
      password,
      email,
    },
  });
}
