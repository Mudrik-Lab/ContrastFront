import { queryApi } from "../Utils/api";

export default async function sendContactUs({ email, subject, message }) {
  return await queryApi({
    url: `profiles/feedbacks/contact_us/`,
    method: "POST",
    data: {
      email,
      subject,
      message,
    },
  });
}
