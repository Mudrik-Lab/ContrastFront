import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { QueryClient } from "@tanstack/react-query";
import WorldMap from "./components/WorldMap";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import AcrossTheYears from "./pages/Across the years/AcrossTheYears";
import FreeQueriesPage from "./pages/FreeQueries/FreeQueriesBar";
import ParametersDistributionBar from "./pages/Parameters Distribution Bar/ParametersDistributionBar";
import ContactPage from "./pages/ContactPage/ContactPage";
import Frequencies from "./pages/Frequencies/Frequencies";
import Journals from "./pages/Journals/Journals";
import Timing from "./pages/Timing/Timing";
import ParametersDistributionPie from "./pages/Parameters Distribution Pie/ParametersDistributionPie";
import ParametersDistributionTheoriesComparison from "./pages/Parameters Distribution Theories/ParametersDistributionTheoriesComparison";
import TheoryDriven from "./pages/Theory Driven/TheoryDriven";
import getConfiguration from "./apiHooks/getConfiguration";
import getExtraConfig from "./apiHooks/getExtraConfig";
import NestedPie from "./components/NestedPie";

const Screens = () => {
  const { data: configuration, isSuccess: configurationSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );

  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/parameter-distribution-free-queries"
          element={<FreeQueriesPage />}
        />
        <Route
          path="/parameter-distribution-bar"
          element={<ParametersDistributionBar />}
        />
        <Route
          path="/parameter-distribution-pie"
          element={<ParametersDistributionPie />}
        />{" "}
        <Route path="/theory-driven" element={<TheoryDriven />} />
        <Route path="/across-the-years" element={<AcrossTheYears />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/theories-comparison"
          element={<ParametersDistributionTheoriesComparison />}
        />
        <Route path="/frequencies" element={<Frequencies />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/timing" element={<Timing />} />
        <Route path="/consciousness-world-map" element={<WorldMap />} />
        <Route path="/try" element={<NestedPie />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Screens;
