import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as React from "react";
import Homepage from "./pages/Home/Homepage.jsx";
import Aboutpage from "./pages/About/Aboutpage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import {isMoblile} from "../Utils/HardCoded.jsx";
import MobileScreen from "../sharedComponents/MobileScreen/MobileScreen.jsx";
import FreeQueriesBar from "./pages/FreeQueries/FreeQueriesBar.jsx";
import AcrossTheYears from "./pages/AcrossTheYears/AcrossTheYears.jsx";

const UncontrastScreens = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Homepage/>}/>
                <Route path="/about" element={<Aboutpage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route
                    path="/parameter-distribution-free-queries"
                    element={isMoblile ? <MobileScreen /> : <FreeQueriesBar />}
                />
                <Route
                    path="/trends-over-time"
                    element={isMoblile ? <MobileScreen /> : <AcrossTheYears />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default UncontrastScreens;
