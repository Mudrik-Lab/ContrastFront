import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import useGetStudies from "../apiHooks/useStudies";
import Navbar from "../components/Navbar";
import NestedPie from "../components/NestedPie";
import PlotlyBarChart from "../components/PlotlyBarChart";
import SimpleBarChart from "../components/SimpleBarChart";
import SimplePieCahrt from "../components/SimplePieCahrt";
import WorldMap from "../components/WorldMap";
import AcrossTheYears from "./Across the years/AcrossTheYears";
import FreeQueriesPage from "./FreeQueries/FreeQueriesPage";
import ParametersDistribution from "./Parameters Distribution/ParametersDistribution";
export const Home = () => {
  return (
    <div
      div
      className="w-full h-screen m-auto flex flex-col gap-9 overflow-scroll"
    >
      <Navbar />

      <AcrossTheYears />
    </div>
  );
};
