import React from "react";
import Logo from "../assets/logoes/logo-negative.png";
import UnconLogo from "../assets/logoes/uncon-negative.png";
import { Text } from "./Reusble";
import { ReactComponent as Drorsoft } from "../assets/logoes/drorsoft-logo.svg";
import classNames from "classnames";
import { footerHeight } from "../Utils/HardCoded";
import { Site } from "../config/siteType";

export default function Footer({ isFixed }) {
  const isUncontrast = Site.type === "uncontrast";
  return (
    <div
      className={classNames(
        `${
          isFixed && "absolute bottom-0"
        }h-max-${footerHeight} w-full flex flex-col sm:flex-row justify-between items-center py-4 sm:px-16 bg-black rounded-t-lg sm:rounded-none`
      )}>
      <div className="flex gap-3 items-center ">
        <img
          src={isUncontrast ? UnconLogo : Logo}
          width={110}
          alt="footer logo"
        />
        <div className="invisible lg:visible border-r border-white h-10 "></div>
        <Text xs color="white" className={"invisible lg:visible"}>
          High Level <br /> Cognition Lab
        </Text>
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:gap-2 lg:gap-14 my-6 sm:my-0">
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
      <div className=" sm:mr-2">
        <Text color="white">
          <a
            href="https://www.drorsoft.com?utm_source=contrastDB&utm_medium=footer&utm_campaign=ongoing&ref=contrastDB/"
            target="_blank">
            <span className="whitespace-nowrap">Powered by</span> <Drorsoft />
          </a>
        </Text>
      </div>
    </div>
  );
}
