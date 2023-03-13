import React from "react";
import Navbar from "../../components/Navbar";
import { Text, WhiteButton } from "../../components/Reusble";
import { ReactComponent as Graph } from "../../assets/icons/start-exploring.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile-negative-icon.svg";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <div
        style={{ height: "512px" }}
        className="header w-full bg-black py-20 px-28 mt-14">
        <div className="headline w-full">
          <h1 className="text-white text-5xl font-bold mb-10">
            {" "}
            ConTraSt Database
          </h1>
          <Text color="white" weight={300} size={32} className="leading-10">
            examine trends
          </Text>
          <Text color="blue" weight={300} size={36} className="leading-10">
            in over 18,352 papers
          </Text>
          <Text color="white" weight={300} size={32} className="leading-10">
            studying theories of consciousness
          </Text>
        </div>
        <div className="header-buttons flex justify-start gap-4 mt-24">
          <WhiteButton>
            <Graph /> Start Exploring
          </WhiteButton>
          <div className="flex items-center gap-2">
            <Profile />
            <Text className="font-bold underline" color="white">
              Register & Contribute
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
