/** @format */

import axios from "axios";
import { getToken, isValidToken } from "./tokenHandler";
import { toast } from "react-toastify";
import { ToastErrorBox } from "../sharedComponents/Reusble";

export const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// a response interceptor
axiosInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // for no network at all
    if (error.message === "Network Error") {
      toast.error("Network Error");
    }

    // for status of: 408, 500, 502, 503, 504
    if (error.response) {
      const status = error.response.status;
      const isServerProblem = [408, 500, 502, 503, 504].includes(status);

      if (isServerProblem) {
        toast.error(<ToastErrorBox errors={"Please try again later"} />);
      }
    }

    return Promise.reject(error);
  }
);

export async function queryApi({
  url,
  method,
  data = null,

  params,
}) {
  const token = await getToken();
  isValidToken(token);

  try {
    if (isValidToken(token)) {
      return axiosInterceptor({
        method,
        url,
        headers: { Authorization: `Bearer ${token}` },
        data,
        params,
      });
    } else {
      return axiosInterceptor({
        method,
        url,
        data,
        params,
      });
    }
  } catch (error) {
    console.log(error, url);
    return { error: error };
  }
}
