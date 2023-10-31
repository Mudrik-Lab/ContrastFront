import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import AcrossTheYears from "./pages/AcrossTheYears/AcrossTheYears";
import FreeQueriesPage from "./pages/FreeQueries/FreeQueriesBar";
import ParametersDistributionBar from "./pages/ParametersDistributionBar/ParametersDistributionBar";
import ContactPage from "./pages/ContactPage/ContactPage";
import Frequencies from "./pages/Frequencies/Frequencies";
import Journals from "./pages/Journals/Journals";
import Timing from "./pages/Timing/Timings";
import ParametersDistributionPie from "./pages/ParametersDistributionPie/ParametersDistributionPie";
import ParametersDistributionTheoriesComparison from "./pages/TheoriesComparison/TheoriesComparison";
import TheoryDriven from "./pages/TheoryDriven/TheoryDriven";

import UploadNewPaper from "./pages/UploadNewPaper/UploadNewPaperPage";
import TermOfUse from "./pages/TermsOfUse/TermsOfUse";
import AnatomicalFindings from "./pages/AnatomicalFindings/AnatomicalFindings";
import MobileScreen from "./pages/MobileScreen/MobileScreen";
import { isMoblile } from "./Utils/HardCoded";
import ModesOfGoverance from "./pages/ModesOfGov/ModesOfGoverance";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./Utils/ProtectedRoute";
import SecondaryRegister from "./pages/Register/SecondaryRegister";
import RecoverPassword from "./pages/Login/RecoverPassword";
import ResetPassword from "./pages/Login/ResetPassword";

import * as React from "react";
// import { Routes, Route, Link } from 'react-router-dom';

const WorldMap = React.lazy(() =>
  import("./pages/ConsciousnessWorldMap/WorldMap")
);
// const About = React.lazy(() => import('./pages/About'));

// const App = () => {
//   return (
//     <>
//       ...

//       <Routes>
//         <Route
//           index
//           element={
//             <React.Suspense fallback={<>...</>}>
//               <Home />
//             </React.Suspense>
//           }
//         />
//         <Route
//           path="about"
//           element={
//             <React.Suspense fallback={<>...</>}>
//               <About />
//             </React.Suspense>
//           }
//         />
//         <Route path="*" element={<NoMatch />} />
//       </Routes>
//     </>
//   );
// };

const Screens = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/request-password-recovery"
          element={<RecoverPassword />}
        />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms-of-use" element={<TermOfUse />} />
        <Route path="/modes-of-governance" element={<ModesOfGoverance />} />
        <Route path="/temp" element={<MobileScreen />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<SecondaryRegister />} />
        <Route
          path="/upload-new-paper"
          element={
            <ProtectedRoute
              path="/upload-new-paper"
              element={<UploadNewPaper />}
            />
          }
        />
        <Route
          path="/parameter-distribution-free-queries"
          element={isMoblile ? <MobileScreen /> : <FreeQueriesPage />}
        />
        <Route
          path="/parameter-distribution-bar"
          element={isMoblile ? <MobileScreen /> : <ParametersDistributionBar />}
        />
        <Route
          path="/parameter-distribution-pie"
          element={isMoblile ? <MobileScreen /> : <ParametersDistributionPie />}
        />{" "}
        <Route
          path="/theory-driven"
          element={isMoblile ? <MobileScreen /> : <TheoryDriven />}
        />
        <Route
          path="/trends-over-time"
          element={isMoblile ? <MobileScreen /> : <AcrossTheYears />}
        />
        <Route
          path="/theories-comparison"
          element={
            isMoblile ? (
              <MobileScreen />
            ) : (
              <ParametersDistributionTheoriesComparison />
            )
          }
        />
        <Route
          path="/anatomical-findings"
          element={isMoblile ? <MobileScreen /> : <AnatomicalFindings />}
        />
        <Route
          path="/frequencies"
          element={isMoblile ? <MobileScreen /> : <Frequencies />}
        />
        <Route
          path="/journals"
          element={isMoblile ? <MobileScreen /> : <Journals />}
        />
        <Route
          path="/timings"
          element={isMoblile ? <MobileScreen /> : <Timing />}
        />
        <Route
          path="/consciousness-world-map"
          element={
            isMoblile ? (
              <MobileScreen />
            ) : (
              <React.Suspense fallback={<>...</>}>
                {" "}
                <WorldMap />
              </React.Suspense>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Screens;
