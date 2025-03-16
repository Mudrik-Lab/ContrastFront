import { ca } from "date-fns/locale";
import { queryApi } from "../Utils/api";

export default async function getExtraConfig() {
  try {
    const res = await queryApi({
      url: `configuration/configuration/studies_form/`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}
