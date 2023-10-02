import React from "react";
import { Text } from "./Reusble";
import { ReactComponent as SubmitIcon } from "../assets/icons/submit.svg";

export default function NoResults() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <SubmitIcon />
        <Text color={"gray"}>These parameters had given no results</Text>
        <Text xs color={"gray"}>
          These parameters had given no results
        </Text>
      </div>
    </div>
  );
}
