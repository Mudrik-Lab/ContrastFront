import * as React from "react";
import useGetTodos from "../apiHooks/useGetTodos";
export const Home = () => {
  const { data: todos } = useGetTodos();

  return <div></div>;
};
