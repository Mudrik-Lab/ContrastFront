import { useSnapshot } from "valtio";
import { state } from "../../../state.jsx";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../../apiHooks/getExtraConfig.jsx";
import copy from "copy-to-clipboard";
import { isMoblile } from "../../../Utils/HardCoded.jsx";
import mobileBrain from "../../../assets/images/mobile-brain.jpeg";
import brain from "../../../assets/images/uncon-brain.png";
import Navbar from "../../../sharedComponents/Navbar.jsx";
import {
  Button,
  Text,
  WhiteButton,
} from "../../../sharedComponents/Reusble.jsx";
import PapersIconsMenu from "./PapersIconsMenu.jsx";
import CommunityBox from "./CommunityBox.jsx";
import UnconTraStUseCases from "./UnconTraStUseCases.jsx";
import Footer from "../../../sharedComponents/Footer.jsx";
import React from "react";
import { ReactComponent as Graph } from "../../../assets/icons/start-exploring.svg";
import { ReactComponent as Profile } from "../../../assets/icons/profile-negative-icon.svg";
import { ReactComponent as Quote } from "../../../assets/icons/cite-quote.svg";
import { ReactComponent as QouteIcon } from "../../../assets/icons/copy-to-clipboard-icon.svg";
import getUncontrastConfiguration from "../../../apiHooks/getUncontrastConfiguration.jsx";

export default function Homepage() {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery(
    [`more_configurations`, "uncontrast"],
    getUncontrastConfiguration
  );
  const cite = "uncontrustdb.tau.ac.il";
  const copyToClipboard = () => {
    copy(cite);
  };
  const containerStyle = {
    backgroundImage: `url(${isMoblile ? mobileBrain : brain})`,
  };
  return (
    <div>
      <Navbar />
      <div
        style={containerStyle}
        className="header h-full sm:h-[512px] py-10 sm:py-20 px-2 sm:px-28 mt-14 bg-no-repeat bg-cover bg-center relative">
        <a
          href="https://contrastdb.tau.ac.il/"
          target="_blank"
          className=" text-white text-lg font-bold absolute bottom-2 left-1/2">
          {" "}
          Also interested in studies of theories of consciousness? Visit the
          ConTraSt database
        </a>
        <div className="headline w-full text-center sm:text-left">
          <h1 className="text-white text-5xl font-bold mb-4">
            UnconTrust Database
          </h1>
          <h2 className="text-white text-3xl font-bold mb-4">(beta version)</h2>
          <div className="my-16">
            <h1 className="text-white text-3xl">Examine trends</h1>
            <h1 className="text-blue text-3xl">
              {" "}
              in {data?.data.approved_experiments_count} experiments
            </h1>
            <h1 className="text-white text-3xl">
              studying unconscious processing
            </h1>
          </div>
        </div>
        <div className="header-buttons flex flex-col items-center sm:flex-row sm:justify-start gap-4 mt-60 sm:mt-24">
          <WhiteButton
            onClick={() => navigate("/parameter-distribution-free-queries")}>
            <Graph /> Start Exploring
          </WhiteButton>
          <div className="flex items-center gap-2">
            <Profile />
            <a
              className="underline text-white font-bold"
              href={snap.auth ? "/upload-new-paper" : "/register"}>
              Register & Contribute
            </a>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="citing sm:max-w-[870px] mx-auto mt-10">
          <div className=" border cite-box bg-grayLight mx-auto sm:flex justify-between items-center gap-2 p-4">
            <div className="w-16">
              <Quote />
            </div>
            <Text>
              <a
                className="text-darkBlue underline break-all"
                href={cite}
                target="_blank">
                {cite}
              </a>
            </Text>
            <div className=" border-b my-4 sm:my-0 sm:border-r border-black sm:h-16 "></div>
            <div className=" flex flex-row justify-center sm:justify-start">
              <Button
                extraClass="text-lg sm:text-sm "
                black
                onClick={copyToClipboard}>
                <QouteIcon /> Copy Citation to Clipboard
              </Button>
            </div>
          </div>
        </div>
        <PapersIconsMenu />
        <CommunityBox />
        {!isMoblile && <UnconTraStUseCases />}
      </div>
      <Footer />
    </div>
  );
}
