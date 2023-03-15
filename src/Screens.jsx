import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { QueryClient } from "@tanstack/react-query";
import WorldMap from "./components/WorldMap";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";

const client = new QueryClient();
const Screens = () => {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/1" element={<Home />} />
          <Route path="/map" element={<WorldMap />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Screens;
