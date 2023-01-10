import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { QueryClient } from "@tanstack/react-query";
import WorldMap from "./components/WorldMap";

const client = new QueryClient();
const Screens = () => {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<WorldMap />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Screens;
