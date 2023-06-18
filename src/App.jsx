import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactComponent as Accessibility } from "./assets/icons/accessibility-icon.svg";
import { ReactComponent as Close } from "./assets/icons/remove-icon.svg";
import { ReactComponent as ContrastIcon } from "./assets/icons/noun-contrast.svg";
import { ReactComponent as TextIcon } from "./assets/icons/noun-text.svg";
import "./App.css";
import Screens from "./Screens";
import { BigButton, Button } from "./components/Reusble";
import { updateTextClass } from "./Utils/functions";
import classNames from "classnames";
import useAuth from "./apiHooks/useAuth";

function App() {
  const [open, setOpen] = React.useState(false);
  const [isHighContrast, setIsHighContrast] = React.useState(false);
  const [isBiggerText, setIsBiggerText] = React.useState(false);

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
    <div
      className={classNames(
        `${isHighContrast ? "bg-white text-black" : ""} App `
      )}
      onClick={() => (open ? setOpen(false) : null)}>
      <div>
        {isLoadingToken ? (
          <div className="text-blue text-3xl">Loading...</div>
        ) : (
          <QueryClientProvider client={client}>
            <Screens />
          </QueryClientProvider>
        )}
      </div>
      <div className="fixed top-1/4 flex flex-row-reverse items-start z-50 ">
        <div className=" justify-end items-center h-16 w-16 bg-darkBlue  rounded-r-full p-2 border border-white border-l-0">
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
          <div className="bg-darkBlue h-40 w-80 p-2 pl-0 border border-white border-l-0">
            <div className="bg-white h-full w-full flex justify-between p-2 gap-2">
              <BigButton
                icon={<ContrastIcon />}
                text={"Increase contrast"}
                onClick={() => setIsHighContrast(true)}></BigButton>
              <BigButton
                extraClass={classNames(`${isBiggerText ? "opacity-50" : ""}`)}
                icon={<TextIcon />}
                disabled={isBiggerText}
                text={"Enlarge text"}
                onClick={() => {
                  updateTextClass();
                  setIsBiggerText(true);
                }}>
                {" "}
              </BigButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
