import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as React from "react";
import Homepage from "./pages/Home/Homepage.jsx";
import Aboutpage from "./pages/About/Aboutpage.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import {isMoblile} from "../Utils/HardCoded.jsx";
import MobileScreen from "../sharedComponents/MobileScreen/MobileScreen.jsx";
import FreeQueriesBar from "./pages/FreeQueries/FreeQueriesBar.jsx";

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
            </Routes>
        </BrowserRouter>
    );
};

export default UncontrastScreens;
