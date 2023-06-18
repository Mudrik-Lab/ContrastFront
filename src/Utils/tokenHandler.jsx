import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const setToken = (token) => {
  Cookies.set("token", token, { expires: 120 });

  console.log("Set Cookie to: " + Cookies.get("token"));
  return token;
};

export const setRefreshToken = (refreshToken) => {
  Cookies.set("refresh_token", refreshToken);
  console.log("Set Cookie to: " + Cookies.get("token"));
  return refreshToken;
};

export const getToken = () => {
  const res = Cookies.get("token");
  return res;
};

export const removeToken = () => {
  Cookies.remove("token");
};

export const isValidToken = (token) => {
  // check if there is a token
  if (!token) {
    return false;
  }

  // check the date of the token
  const decoded = jwt_decode(token);

  const isUpToDate = decoded.exp > (new Date().getTime() + 86400000) / 1000;
  const isUser = decoded.user_id;

  return isUser && isUpToDate;
};

// TODO: finish this one
// export const refreshToken = (token) => {};
