import React from "react";
import Logo from "../assets/logoes/logo-negative.png";
import UnconLogo from "../assets/logoes/uncon-negative.png";
import CifarLogo from "../assets/logoes/cifar.png";
import { Text } from "./Reusble";
import { ReactComponent as Drorsoft } from "../assets/logoes/drorsoft-logo.svg";
import classNames from "classnames";
import { footerHeight } from "../Utils/HardCoded";
import { Site } from "../config/siteType";

export default function Footer({ isFixed }) {
  const isUncontrast = Site.type === "uncontrast";
  return (
    <div
      style={{ height: footerHeight }}
      className={classNames(
        `${
          isFixed && "absolute bottom-0"
        } w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:px-16 bg-black rounded-t-lg sm:rounded-none`
      )}>
      <div className="flex gap-2 items-center w-1/3">
        <div className="logo-cifar flex gap-1 items-center ">
          <img
            src={isUncontrast ? UnconLogo : Logo}
            width={100}
            alt="footer logo"
          />
          <div className="invisible lg:visible border-r border-white h-8 "></div>
          <Text xs color="white" className={"invisible lg:visible"}>
            High Level <br /> Cognition Lab
          </Text>
        </div>
        <div className="logo-cifar flex gap-1 items-center ">
          <img src={CifarLogo} alt="CifarLogo" width={"60px"} />
          <div className="invisible lg:visible border-r border-white h-8 "></div>
          <Text xs color="white" className={"invisible lg:visible"}>
            High Level <br /> Cognition Lab
          </Text>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center sm:flex-row sm:gap-2 lg:gap-14 my-6 sm:my-0 w-1/2">
        <Text color="white">
          <a href="/terms-of-use">Terms of Use</a>
        </Text>
        <Text color="white">
          <a href="/modes-of-governance">Modes of Governance</a>{" "}
        </Text>
        <Text color="white">
          <a
            href="https://english.tau.ac.il/accessibility_statement"
            target="_blank">
            Accessibilty Statement
          </a>
        </Text>
      </div>
      <div className="flex justify-end w-1/3">
        <div className="w-20">
          <Text color="white">
            <a
              href="https://www.drorsoft.com?utm_source=contrastDB&utm_medium=footer&utm_campaign=ongoing&ref=contrastDB/"
              target="_blank">
              <span className="whitespace-nowrap">Powered by</span> <Drorsoft />
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
}
