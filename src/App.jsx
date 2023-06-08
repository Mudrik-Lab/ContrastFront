import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactComponent as Accessibility } from "./assets/icons/accessibility-icon.svg";
import { ReactComponent as Close } from "./assets/icons/remove-icon.svg";
import "./App.css";
import Screens from "./Screens";
import { Button } from "./components/Reusble";
import classNames from "classnames";

function App() {
  const [open, setOpen] = React.useState(false);
  const elementRef = React.useRef(null);

  const handleIncreaseContrast = () => {
    if (elementRef.current) {
      const currentColor = getComputedStyle(elementRef.current).color;
      const contrastedColor = increaseContrast(currentColor, 10);
      elementRef.current.style.color = contrastedColor;
    }
  };

  const handleEnlargeFonts = () => {
    console.log(elementRef.current);

    if (elementRef.current) {
      enlargeFonts(elementRef.current, 2);
    }
  };
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
    <div className="App" ref={elementRef}>
      <QueryClientProvider client={client}>
        <Screens />
      </QueryClientProvider>
      <div className="fixed top-1/2 flex flex-row-reverse items-start z-50">
        <div className=" justify-end items-center h-16 w-16 bg-sky-900  rounded-r-full p-2">
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
            <div className="bg-white h-full w-full">
              <Button onClick={handleIncreaseContrast}>
                Increase Contrast
              </Button>
              <Button onClick={handleEnlargeFonts}>Enlarge Fonts</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
