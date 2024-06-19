import React from "react";
import { Button, Text } from "../../../sharedComponents/Reusble";
import { ReactComponent as Profile } from "../../../assets/icons/profile-negative-icon.svg";
import { isMoblile } from "../../../Utils/HardCoded";
import { useNavigate } from "react-router-dom";

export default function CommunityBox() {
  const navigate = useNavigate();
  return (
    <div className="lg:w-144 bg-grayLight mx-auto p-8 lg:flex ">
      <div className="flex flex-col justify-between pr-8 border-r sm:border-black">
        <div>
          <Text color="black" weight="bold" xl3 center={isMoblile}>
            Join the UnconTrust community
          </Text>
        </div>

        <div className="mx-auto my-4">
          <Button onClick={() => navigate("/register")}>
            <Profile />
            Register Here{" "}
          </Button>
        </div>
      </div>
      <div className="pl-8">
        <ul className="text-black list-disc ml-4 text-xl ">
          <li>
            Download research references and information about over 400
            experiments and counting
          </li>
          <li>Generate custom figures for unlimited use in your work</li>
          <li>
            Submit your own papers and be a part of the UnconTrust database!
          </li>
        </ul>
      </div>
    </div>
  );
}
