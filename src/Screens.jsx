import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { QueryClient } from "@tanstack/react-query";
import WorldMap from "./components/WorldMap";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import AcrossTheYears from "./pages/Across the years/AcrossTheYears";
import FreeQueriesPage from "./pages/FreeQueries/FreeQueriesPage";
import ParametersDistributionBar from "./pages/Parameters DistributionBar/ParametersDistributionBar";
import ContactPage from "./pages/ContactPage/ContactPage";
import ParametersDistributionTheoriesComparison from "./pages/ParametersDistributionTheoriesComparison/ParametersDistributionTheoriesComparison";
import Frequencies from "./pages/Frequencies/Frequencies";
import Journals from "./pages/Journals/Journals";
import SimplePieCahrt from "./components/SimplePieCahrt";
import Timing from "./pages/Timing/Timing";
import getConfuguration from "./apiHooks/getConfiguration";

const client = new QueryClient();
const Screens = () => {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Parameter-Distribution" element={<FreeQueriesPage />} />
          <Route
            path="/Parameter-Distribution-bar"
            element={<ParametersDistributionBar />}
          />
          <Route path="/Across-The-Years" element={<AcrossTheYears />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route
            path="/Theories-Comparison"
            element={<ParametersDistributionTheoriesComparison />}
          />
          <Route path="/Frequencies" element={<Frequencies />} />
          <Route path="/Journals" element={<Journals />} />
          <Route path="/SimplePieCahrt" element={<SimplePieCahrt />} />
          <Route path="/Timing" element={<Timing />} />
          <Route path="/Consciousness-World-Map" element={<WorldMap />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Screens;
