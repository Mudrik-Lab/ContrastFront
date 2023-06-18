/** @format */

import axios from "axios";
import { getToken } from "./tokenHandler";


export async function queryApi({
  url,
  method,
  data = null,
  isProtected,
  params
}) {
   const token = getToken();
    
    // const x = import.meta.env.VITE_API_URL
    // console.log(x)
  try {
    return axios({
      method,
      url: url,
      headers: isProtected && { Authorization: `Bearer ${token}` },
      data,
      params
    });
  } catch (error) {
    console.log(error, url);
    return { error: error };
  }
}
