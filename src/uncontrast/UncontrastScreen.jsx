import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as React from "react";
import Homepage from "./pages/Home/Homepage.jsx";
import Aboutpage from "./pages/About/Aboutpage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import { isMoblile } from "../Utils/HardCoded.jsx";
import MobileScreen from "../sharedComponents/MobileScreen/MobileScreen.jsx";
import FreeQueriesBar from "./pages/FreeQueries/FreeQueriesBar.jsx";
import AcrossTheYears from "./pages/AcrossTheYears/AcrossTheYears.jsx";
import Journals from "./pages/Journals/Journals.jsx";
import ParametersDistributionPie from "./pages/ParametersDistributionPie/ParametersDistributionPie.jsx";
import ParametersDistributionBar from "./pages/ParametersDistributionBar/ParametersDistributionBar.jsx";
import ParametersDistributionExperimentsComparison from "./pages/ExperimentsComparison/ExperimentsComparison.jsx";
// import EffectsDistributionLines from "./pages/EffectsDistributionLines/EffectsDistributionLines.jsx";
import Login from "../contrast/pages/Login/Login.jsx";
import RecoverPassword from "../contrast/pages/Login/RecoverPassword.jsx";
import ResetPassword from "../contrast/pages/Login/ResetPassword.jsx";
import RegisterComponent from "../contrast/pages/Register/Register.jsx";
import SecondaryRegister from "../contrast/pages/Register/SecondaryRegister.jsx";
import ProtectedRoute from "../Utils/ProtectedRoute.jsx";
import TermOfUse from "../contrast/pages/TermsOfUse/TermsOfUse.jsx";
import ModesOfGoverance from "./pages/ModesOfGov/ModesOfGoverance.jsx";
import "./plotlyStyle.css"; // Import custom CSS for the plots

const UncontrastScreens = () => {
  const WorldMap = React.lazy(() => import("./pages/WorldMap/WorldMap"));

  const UploadNewPaper = React.lazy(() =>
    import("./pages/UploadNewPaper/UploadNewPaperPage")
  );

  const EffectsDistributionLines = React.lazy(() =>
    import("./pages/EffectsDistributionLines/EffectsDistributionLines")
  );

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/request-password-recovery"
            element={<RecoverPassword />}
          />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                path="/profile"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <SecondaryRegister />
                  </React.Suspense>
                }
              />
            }
          />

          <Route
            path="/upload-new-paper"
            element={
              <ProtectedRoute
                path="/upload-new-paper"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <UploadNewPaper />
                  </React.Suspense>
                }
              />
            }
          />
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms-of-use" element={<TermOfUse />} />
          <Route path="/modes-of-governance" element={<ModesOfGoverance />} />
          <Route
            path="/parameter-distribution-free-queries"
            element={isMoblile ? <MobileScreen /> : <FreeQueriesBar />}
          />
          <Route
            path="/experiments-comparison"
            element={
              isMoblile ? (
                <MobileScreen />
              ) : (
                <ParametersDistributionExperimentsComparison />
              )
            }
          />
          <Route
            path="/journals"
            element={isMoblile ? <MobileScreen /> : <Journals />}
          />
          <Route
            path="/trends-over-time"
            element={isMoblile ? <MobileScreen /> : <AcrossTheYears />}
          />
          <Route
            path="/unconsciousness-world-map"
            element={
              isMoblile ? (
                <MobileScreen />
              ) : (
                <React.Suspense fallback={<>...</>}>
                  <WorldMap />
                </React.Suspense>
              )
            }
          />

          <Route
            path="/parameter-distribution-pie"
            element={
              isMoblile ? <MobileScreen /> : <ParametersDistributionPie />
            }
          />
          <Route
            path="/parameter-distribution-bar"
            element={
              isMoblile ? <MobileScreen /> : <ParametersDistributionBar />
            }
          />
          <Route
            path="/distribution-of-experiments-across-parameters"
            element={
              isMoblile ? <MobileScreen /> : <EffectsDistributionLines />
            }
          />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default UncontrastScreens;
