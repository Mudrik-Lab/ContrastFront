import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { QueryClient } from "@tanstack/react-query";
import WorldMap from "./components/WorldMap";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import AcrossTheYears from "./pages/Across the years/AcrossTheYears";
import FreeQueriesPage from "./pages/FreeQueries/FreeQueriesPage";
import ParametersDistribution from "./pages/Parameters Distribution/ParametersDistribution";
import ContactPage from "./pages/ContactPage/ContactPage";

const client = new QueryClient();
const Screens = () => {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Free-Queries" element={<FreeQueriesPage />} />
          <Route
            path="/Parameter-Distribution"
            element={<ParametersDistribution />}
          />
          <Route path="/Parameter-Distribution-bar" element={<WorldMap />} />
          <Route path="/Across-The-Years" element={<AcrossTheYears />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Consciousness-World-Map" element={<WorldMap />} />
          <Route path="/Consciousness-World-Map" element={<WorldMap />} />
          <Route path="/Consciousness-World-Map" element={<WorldMap />} />
          <Route path="/Consciousness-World-Map" element={<WorldMap />} />
          <Route path="/Consciousness-World-Map" element={<WorldMap />} />
          <Route path="/Consciousness-World-Map" element={<WorldMap />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Screens;
