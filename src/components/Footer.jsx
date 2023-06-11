import React from "react";
import Logo from "../assets/logoes/logo-negative.png";
import { Text } from "./Reusble";
import { ReactComponent as Drorsoft } from "../assets/logoes/drorsoft-logo.svg";
import classNames from "classnames";

export default function Footer({ isFixed }) {
  return (
    <div
      className={classNames(
        `${
          isFixed ? "absolute bottom-0" : ""
        } w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:px-16 bg-black rounded-t-lg sm:rounded-none`
      )}>
      <div className="flex gap-3 items-center ">
        <img src={Logo} alt="" />
        <div className=" border-r border-white h-10 "></div>
        <Text sm color="white">
          High Level <br /> Cognition Lab
        </Text>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:gap-14 my-6 sm:my-0">
        <Text color="white">
          <a href="/terms-of-use">Terms of Use</a>
        </Text>
        <Text color="white">
          <a href="/modes-of-governance">Modes of Governance</a>{" "}
        </Text>
      </div>
      <div className=" sm:mr-10">
        <Text color="white">
          <a href="https://www.drorsoft.com/" target="_blank">
            Developed by <Drorsoft />
          </a>
        </Text>
      </div>
    </div>
  );
}
