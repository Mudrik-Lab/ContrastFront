import React from "react";
import Navbar from "../../components/Navbar";
import copy from "copy-to-clipboard";
import { Button, Spacer, Text, WhiteButton } from "../../components/Reusble";
import { ReactComponent as Graph } from "../../assets/icons/start-exploring.svg";
import { ReactComponent as Profile } from "../../assets/icons/profile-negative-icon.svg";
import { ReactComponent as Quote } from "../../assets/cite-quote.svg";
import { ReactComponent as QouteIcon } from "../../assets/icons/copy-to-clipboard-icon.svg";
import PapersIconsMenu from "./PapersIconsMenu";
import ConTraStUseCases from "./ConTraStUseCases";
import CommunityBox from "./CommunityBox";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import brain from "../../assets/images/XwW4T0UQ.jpeg";
import mobileBrain from "../../assets/images/mobile-brain.jpeg";
import { isMoblile } from "../../Utils/HardCoded";

export default function HomePage() {
  const navigate = useNavigate();
  const cite =
    "Yaron, I., Melloni, L., Pitts, M., & Mudrik, L. (2022). The ConTraSt database for analysing and comparing empirical studies of consciousness theories. Nature Human Behaviour. https://www.nature.com/articles/s41562-021-01284-5";
  const copyToClipboard = () => {
    copy(cite);
  };
  const containerStyle = {
    backgroundImage: `url(${isMoblile ? mobileBrain : brain})`,
  };
  console.log(isMoblile);
  return (
    <div>
      <Navbar />
      <div
        style={containerStyle}
        className="header h-full sm:h-[512px] py-10 sm:py-20 px-2 sm:px-28 mt-14 bg-no-repeat bg-cover bg-center ">
        <div className="headline w-full text-center sm:text-left">
          <h1 className="text-white text-5xl font-bold mb-10">
            {" "}
            ConTraSt Database
          </h1>
          <Text color="white" weight={300} size={32} className="leading-10">
            Examine trends
          </Text>
          <Text color="blue" weight={300} size={36} className="leading-10">
            in over 400 experiments
          </Text>
          <Text color="white" weight={300} size={32} className="leading-10">
            studying theories of consciousness
          </Text>
        </div>
        <div className="header-buttons flex flex-col items-center sm:flex-row sm:justify-start gap-4 mt-60 sm:mt-24">
          <WhiteButton
            onClick={() => navigate("/parameter-distribution-free-queries")}>
            <Graph /> Start Exploring
          </WhiteButton>
          <div className="flex items-center gap-2">
            <Profile />
            <Text className="underline" bold color="white">
              Register & Contribute
            </Text>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="citing sm:max-w-[830px] mx-auto mt-10">
          <div className=" border cite-box bg-grayLight mx-auto sm:flex justify-between items-center gap-2 p-4">
            <Quote />
            <Text>
              Yaron, I., Melloni, L., Pitts, M., & Mudrik, L. (2022). The
              ConTraSt
              {!isMoblile ? <br /> : " "}
              database for analysing and comparing empirical studies of{" "}
              {!isMoblile ? <br /> : " "}
              consciousness theories. Nature Human Behaviour.
              {!isMoblile ? <br /> : " "}
              <a
                className="text-darkBlue underline"
                href="https://www.nature.com/articles/s41562-021-01284-5"
                target="_blank">
                https://www.nature.com/articles/s41562-021-01284-5
              </a>
            </Text>
            <div className=" border-b my-4 sm:my-0 sm:border-r border-black sm:h-16 "></div>
            <div className=" flex flex-row justify-center sm:justify-start">
              <Button
                extraClass="text-[18px] sm:text-sm "
                black
                onClick={copyToClipboard}>
                <QouteIcon /> Copy Cite to Clipboard
              </Button>
            </div>
          </div>
        </div>
        <PapersIconsMenu />
        <CommunityBox />
        <ConTraStUseCases />
      </div>
      <Footer />
    </div>
  );
}
