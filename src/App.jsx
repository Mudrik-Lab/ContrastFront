import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Screens from "./Screens";

function App() {
  const client = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Screens />
      </QueryClientProvider>
    </div>
  );
}

export default App;
