import React from "react";
import { Button, Text, WhiteButton } from "../../components/Reusble";
import { ReactComponent as Profile } from "../../assets/icons/profile-negative-icon.svg";

export default function CommunityBox() {
  return (
    <div className="community-box w-144 bg-grayLight mx-auto flex justify-between items-start gap-8 p-8">
      <div className="flex flex-col justify-between h-full gap-32 ">
        <Text color="grayHeavy" size={32} weight="bold" lineHeight={8}>
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
          Download research references and information about over 400
          experiments and counting
        </li>
        <li>Generate custom figures for unlimited use in your work</li>
        <li>Submit your own papers and be a part of the ConTraSt database!</li>
      </ul>
    </div>
  );
}
