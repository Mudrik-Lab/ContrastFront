import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../App.css";
import useAuth from "../apiHooks/useAuth.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContrastScreens from "./ContrastScreens.jsx";

function AppContrast() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60000, // Cache data for 60 minute
        refetchOnMount: false, // Don't refetch data when the component mounts
        refetchOnWindowFocus: false, //  refetch data when the window regains focus
        refetchInterval: 10 * 60000, // Refetch data every 10 minute
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
          <ContrastScreens />
        </QueryClientProvider>
      )}
    </div>
  );
}

export default AppContrast;
