import React from "react";
import Navbar from "../../components/Navbar";
import copy from "copy-to-clipboard";
import { Button, Text, WhiteButton } from "../../components/Reusble";
import { ReactComponent as Graph } from "../../assets/icons/start-exploring.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile-negative-icon.svg";
import { ReactComponent as Quote } from "../../assets/cite-quote.svg";
import { ReactComponent as QouteIcon } from "../../assets/icons/copy-to-clipboard-icon.svg";
import PapersIconsMenu from "../../components/PapersIconsMenu";
import ConTraStUseCases from "./ConTraStUseCases";

export default function HomePage() {
  const cite =
    "Yaron, I., Melloni, L., Pitts, M., & Mudrik, L. (2022). The ConTraSt database for analysing and comparing empirical studies of consciousness theories. Nature Human Behaviour. https://www.nature.com/articles/s41562-021-01284-5";
  const copyToClipboard = () => {
    copy(cite);
  };
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
          s
        </div>
      </div>
      <div className="citing w-full mt-8 mb-10 px-80">
        <div className=" border cite-box bg-grayLight mx-auto flex justify-between items-center gap-4 p-4">
          <Quote />
          <Text>
            Yaron, I., Melloni, L., Pitts, M., & Mudrik, L. (2022). The ConTraSt
            <br />
            database for analysing and comparing empirical studies of <br />
            consciousness theories. Nature Human Behaviour. <br />
            <a
              className="text-blue underline"
              href="https://www.nature.com/articles/s41562-021-01284-5">
              https://www.nature.com/articles/s41562-021-01284-5
            </a>
          </Text>
          <div className=" border-r border-black h-16"></div>
          <div className=" flex flex-row">
            <Button
              style={{ fontSize: "14px" }}
              black
              onClick={copyToClipboard}>
              <QouteIcon /> Copy Cite to Clipboard
            </Button>
          </div>
        </div>
      </div>
      <PapersIconsMenu />

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
            download research references and mappings from over 18.352 papers
            and counting
          </li>
          <li>generate custom diagrams for unlimited use in your work</li>
          <li>
            submit your own papers and be a part of the collective conciseness!
          </li>
        </ul>
      </div>
      <ConTraStUseCases />
    </div>
  );
}
