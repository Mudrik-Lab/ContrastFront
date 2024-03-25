import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactComponent as Accessibility } from "./assets/icons/accessibility-icon.svg";
import { ReactComponent as Close } from "./assets/icons/remove-icon.svg";
import { ReactComponent as ContrastIcon } from "./assets/icons/noun-contrast.svg";
import { ReactComponent as TextIcon } from "./assets/icons/noun-text.svg";
import "./App.css";
import Screens from "./Screens";
import { BigButton, Button } from "../shared/Reusble.jsx";
import { updateTextClass } from "./Utils/functions";
import classNames from "classnames";
import useAuth from "./apiHooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { isLoadingToken, snap } = useAuth();
  return (
    <div>
      {isLoadingToken ? (
        <div className="text-blue text-3xl">Loading...</div>
      ) : (
        <QueryClientProvider client={client}>
          <ToastContainer
            style={{
              width: 450,
              height: 200,
            }}
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Screens />
        </QueryClientProvider>
      )}
    </div>
  );
}

export default App;
