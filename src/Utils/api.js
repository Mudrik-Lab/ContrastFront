/** @format */

import axios from "axios";
// import * as tokenHandler from "./tokenHandler";
export async function queryApi({
  url,
  method,
  data = null,
  isProtected = true,
  params
}) {
    // const token = tokenHandler.getToken();
    const token = "keyGsJHfx22k81Gdj";

  try {
    return axios({
      method,
    //   url: process.env.VITE_API_URL + url,
      url:url,
      headers: isProtected && { Authorization: `Bearer ${token}` },
      data,
      params
    });
  } catch (error) {
    console.log(error, url);
    return { error: error };
  }
}
