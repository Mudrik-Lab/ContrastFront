import * as React from "react";
import useGetTodos from "../apiHooks/useGetTodos";
import SimpleBarChart from "../components/SimpleBarChart";
export const Home = () => {
  return (
    <div div className="w-full h-screen m-auto flex flex-col gap-9">
      <h1>SimpleBarChart</h1>
      <SimpleBarChart />
    </div>
  );
};
