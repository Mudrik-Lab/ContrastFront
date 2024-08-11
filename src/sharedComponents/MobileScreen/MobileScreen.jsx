import React from "react";
import Navbar from "../Navbar.jsx";
import { ReactComponent as Desktop } from "../../assets/icons/desktop.svg";
import { ReactComponent as Graph } from "../../assets/graph.svg";
import Logo from "../../assets/logoes/logo-negative.png";
import UnconLogo from "../../assets/logoes/uncon-negative.png";
import { Button, Text } from "../Reusble.jsx";
import { navHeight, screenHeight } from "../../Utils/HardCoded.jsx";
import { useNavigate } from "react-router-dom";
import { Site } from "../../config/siteType.js"; //"../site/Site";

export default function MobileScreen() {
  const navigate = useNavigate();
  const isUncontrust = Site.type === "uncontrast";
  return (
    <div>
      <Navbar />
      <div
        style={{ height: screenHeight - navHeight, marginTop: navHeight }}
        className=" bg-black flex flex-col justify-center items-center px-5 gap-14">
        <div className="flex flex-col items-center">
          <Desktop />
          <Text xl3 color="white" center>
            This Feature is currently only available for desktop
          </Text>
          <Text color="white" className="text-sm">
            Join us from a personal computer near you
          </Text>
        </div>
        <Button onClick={() => navigate("/")}>Back to homepage</Button>
        <img
          src={isUncontrust ? UnconLogo : Logo}
          alt="logo on mobile screen"
          width={120}
        />
      </div>
      <Graph />
    </div>
  );
}
