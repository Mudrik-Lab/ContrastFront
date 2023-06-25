/** @format */

import axios from "axios";
import { getToken, isValidToken } from "./tokenHandler";


export async function queryApi({
  url,
  method,
  data = null,
 
  params
}) {
   const token = await getToken();
   isValidToken(token)
   
   
  try {
    if(isValidToken(token)){ 
      return axios({
        method,
        url: url,
        headers:  { Authorization: `Bearer ${token}` },
        data,
        params
      });
    } else{
      return axios({
        method,
        url: url,
       
        data,
        params
      });
    }
    
  } catch (error) {
    console.log(error, url);
    return { error: error };
  }
}
