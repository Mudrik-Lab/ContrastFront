import React from "react";
import Navbar from "../../components/Navbar";
import { ReactComponent as Desktop } from "../../assets/icons/desktop.svg";
import Logo from "../../assets/logoes/logo-negative.png";

import { Button, Text } from "../../components/Reusble";
export default function MobileScreen() {
  return (
    <div>
      <Navbar />
      <div className="h-screen bg-black flex flex-col justify-center items-center px-5 gap-14">
        <div className="flex flex-col items-center">
          <Desktop />
          <Text size={32} color="white" center>
            This Feature is currently only available for desktop
          </Text>
          <Text color="white" size={14}>
            Join us from a personal computer near you
          </Text>
        </div>
        <Button blue>Back to homepage</Button>
        <img src={Logo} alt="" />
      </div>
    </div>
  );
}
