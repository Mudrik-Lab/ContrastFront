import * as React from "react";
import useGetTodos from "../apiHooks/useGetTodos";
import NestedPie from "../components/NestedPie";
import PlotlyBarChart from "../components/PlotlyBarChart";
import SimpleBarChart from "../components/SimpleBarChart";
import SimplePieCahrt from "../components/SimplePieCahrt";
import WorldMap from "../components/WorldMap";
export const Home = () => {
  return (
    <div div className="w-full m-auto flex flex-col gap-9 overflow-scroll">
      <h1>SimpleBarChart</h1>
      <SimpleBarChart />
      <SimplePieCahrt />
      <NestedPie />
      <WorldMap />
    </div>
  );
};
