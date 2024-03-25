import React from "react";
import { Button, Text } from "../../../shared/Reusble.jsx";
import { ReactComponent as Profile } from "../../assets/icons/profile-negative-icon.svg";
import { isMoblile } from "../../Utils/HardCoded";

export default function CommunityBox() {
  return (
    <div className="w-144 bg-grayLight mx-auto p-8 flex ">
      <div className="flex flex-col justify-between pr-8 border-r border-black">
        <div>
          <Text color="black" weight="bold" xl3 center={isMoblile}>
            Join the ConTraSt community
          </Text>
        </div>

        <div>
          <Button>
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
            Submit your own papers and be a part of the ConTraSt database!
          </li>
        </ul>
      </div>
    </div>
  );
}
