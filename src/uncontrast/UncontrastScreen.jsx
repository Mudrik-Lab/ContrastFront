import {BrowserRouter, Route, Routes} from "react-router-dom";
import * as React from "react";
import Homepage from "./pages/Home/Homepage.jsx";
import Aboutpage from "./pages/About/Aboutpage.jsx";

const UncontrastScreens = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Homepage/>}/>
                <Route path="/about" element={<Aboutpage/>}/>

            </Routes>
        </BrowserRouter>
    );
};

export default UncontrastScreens;
