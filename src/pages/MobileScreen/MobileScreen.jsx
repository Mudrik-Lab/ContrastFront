import React from "react";
import Navbar from "../../components/Navbar";
import { ReactComponent as Desktop } from "../../assets/icons/desktop.svg";
import { ReactComponent as Graph } from "../../assets/graph.svg";
import Logo from "../../assets/logoes/logo-negative.png";
import { Button, Text } from "../../../shared/Reusble.jsx";
import { navHeight, screenHeight } from "../../Utils/HardCoded";
import { useNavigate } from "react-router-dom";

export default function MobileScreen() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div
        style={{ height: screenHeight - navHeight, marginTop: navHeight }}
        className=" bg-black flex flex-col justify-center items-center px-5 gap-14">
        <div className="flex flex-col items-center">
          <Desktop />
          <Text className="text-3xl" color="white" center>
            This Feature is currently only available for desktop
          </Text>
          <Text color="white" className="text-sm">
            Join us from a personal computer near you
          </Text>
        </div>
        <Button onClick={() => navigate("/")}>Back to homepage</Button>
        <img src={Logo} alt="" />
      </div>
      <Graph />
    </div>
  );
}
