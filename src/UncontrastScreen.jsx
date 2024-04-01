import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as React from "react";

const UncontrastScreens = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route
          path="/request-password-recovery"
          element={<RecoverPassword />}
        />
        <Route path="/reset_password" element={<ResetPassword />} /> */}
        <Route path="/" element={<h1>kjljlkj</h1>} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/terms-of-use" element={<TermOfUse />} />
        <Route path="/modes-of-governance" element={<ModesOfGoverance />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<Register />} />
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
      */}
      </Routes>
    </BrowserRouter>
  );
};

export default UncontrastScreens;
