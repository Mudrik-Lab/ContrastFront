import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactComponent as Accessibility } from "./assets/icons/accessibility-icon.svg";
import { ReactComponent as Close } from "./assets/icons/remove-icon.svg";
import "./App.css";
import Screens from "./Screens";

function App() {
  const [open, setOpen] = React.useState(false);
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
      <div className="fixed top-1/2 flex flex-row-reverse items-start ">
        <div className=" justify-end items-center h-16 w-16 bg-sky-900 z-50 rounded-r-full p-2">
          {open ? (
            <Close className="w-12 h-12" onClick={() => setOpen(false)} />
          ) : (
            <Accessibility
              className="w-12 h-12"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
        {open && (
          <div className="bg-sky-900 h-[400px] w-[400px] p-2 pl-0">
            <div className="bg-white h-full w-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
