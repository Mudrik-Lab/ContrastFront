import { proxy } from "valtio";

export const state = proxy({
  auth: null,
  path: "/",
  user: {},
  tempUsername: null,
  serverError: false,
});
