import React from "react";
import { Button, Text, WhiteButton } from "../../components/Reusble";
import { ReactComponent as Profile } from "../../assets/icons/profile-negative-icon.svg";

export default function CommunityBox() {
  return (
    <div className="community-box w-144 bg-grayLight mx-auto flex justify-between items-center gap-8 p-8">
      <div className="flex flex-col justify-between h-full gap-32">
        <Text color="grayHeavy" center lg weight="bold">
          Be A Part Of The ConTraSt Community
        </Text>
        <Button>
          <Profile />
          Register Here
        </Button>
      </div>
      <div className=" border-r border-black h-64 "></div>
      <ul className="text-grayHeavy list-disc ml-4 text-xl ">
        <li>
          download research references and mappings from over 18.352 papers and
          counting
        </li>
        <li>generate custom diagrams for unlimited use in your work</li>
        <li>
          submit your own papers and be a part of the collective conciseness!
        </li>
      </ul>
    </div>
  );
}
