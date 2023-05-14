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
        } w-full flex justify-between items-center py-4 px-16 bg-black `
      )}>
      <div className="flex gap-3 items-center">
        <img src={Logo} alt="" />
        <div className=" border-r border-white h-10 "></div>
        <Text sm color="white">
          {" "}
          High Level <br /> Cognition Lab{" "}
        </Text>
      </div>
      <div className="flex gap-14">
        <Text color="white">
          <a href="/terms-of-use">Terms of Use</a>
        </Text>
        <Text color="white">Modes of Governance</Text>
      </div>
      <div className="mr-10">
        <Text color="white">
          <a href="https://www.drorsoft.com/" target="_blank">
            Developed by <Drorsoft />
          </a>
        </Text>
      </div>
    </div>
  );
}
