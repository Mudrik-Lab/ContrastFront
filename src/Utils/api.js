/** @format */

import axios from "axios";

// import * as tokenHandler from "./tokenHandler";

export async function queryApi({
  url,
  method,
  data = null,
  isProtected,
  params
}) {
    // const token = tokenHandler.getToken();
    const token = "keyGsJHfx22k81Gdj";
    const x = import.meta.env.VITE_API_URL
    console.log(x)
  try {
    return axios({
      method,
      url: x + url,
      headers: isProtected && { Authorization: `Bearer ${token}` },
      data,
      params
    });
  } catch (error) {
    console.log(error, url);
    return { error: error };
  }
}
