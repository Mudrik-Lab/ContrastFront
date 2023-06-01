import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Screens from "./Screens";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60000, // Cache data for 60 minute
        refetchOnMount: false, // Don't refetch data when the component mounts
        refetchOnWindowFocus: false, // Don't refetch data when the window regains focus
        refetchInterval: 60 * 60000, // Refetch data every 60 minute
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Screens />
      </QueryClientProvider>
    </div>
  );
}

export default App;
