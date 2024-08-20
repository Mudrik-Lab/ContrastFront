import React from "react";
import Navbar from "../../../sharedComponents/Navbar";
import { Button, Spacer, Text } from "../../../sharedComponents/Reusble";
import { ReactComponent as Github } from "../../../assets/icons/github-small.svg";
import BrainImg from "../../../assets/images/brain-prism-tall.jpg";
import TeamMembersCards from "./TeamMembersCards";
import CommunityBox from "../Home/CommunityBox.jsx";
import Footer from "../../../sharedComponents/Footer";
import { isMoblile, navHeight } from "../../../Utils/HardCoded";

export default function Aboutpage() {
  const aLinkClass = "text-darkBlue underline cursor-pointer";
  return (
    <div id="about-page">
      <Navbar />
      <Spacer height={navHeight + 64} />
      <div className="max-w-[1018px] mx-auto">
        <h1 className="text-blue text-center text-6xl">About UnconTrust</h1>
        <div className="about-database sm:mt-10 mx-auto ">
          <Text xl3 className=" leading-snug" center>
            The database for Unconscious processing studies that we Trust
          </Text>
          <div className="h-auto flex flex-col sm:flex-row sm:gap-10 mt-6 max-w-[1250px] mx-auto sm:px-2">
            <div className="h-auto bg-black flex flex-col justify-center">
              <img src={BrainImg} alt="Brain Image" />
            </div>

            <Text className="px-4 sm:px-0 ">
              Welcome to the UnconTrust database website! This is an open access
              interactive website, featuring the database for behavioral studies
              of unconscious processing. Here, we focus on studies where the
              stimuli were not consciously processed, and their potential effect
              on behavior or subsequent processing was tested. On this website
              you can get a bird’s eye view on how such unconscious processes
              have been studied, and conduct your own queries on the data.
              Importantly, the UnconTrust team does not critically assess the
              papers for quality: we rely on the claims and classifications made
              by the authors. Thus, the data on this website should not be used
              to determine if unconscious processing actually occurs in
              different circumstances. Instead, it allows users to evaluate how
              the different parameters of the experiments are related to the
              reported effects, taken at face value, to examine trends and
              methodological choices made by researchers in the field, and to
              easily identify parameters that have received more or less
              scientific attention. We provide analytics on papers that have
              explored the processing of stimuli that were not consciously
              perceived, aiming at identifying trends in methodological choices,
              interpretations, findings, and more. Below is a list of plots and
              searches that can be generated. For each such plot/search you can
              also download a CSV file where all relevant papers are listed. We
              welcome the uploading of new, relevant, papers to the database! If
              you have a paper that explored such processing, feel free to{" "}
              <a href="/upload-new-paper" className={aLinkClass}>
                upload information about the paper here.
              </a>{" "}
              New uploads will be approved by{" "}
              <a className={aLinkClass} href="#steering_committee">
                the UnconTrust steering committee
              </a>{" "}
              . The UnconTrust database is based on the ConTraSt database, which
              was first introduced by Itay Yaron{" "}
              <a
                className={aLinkClass}
                href={"https://www.nature.com/articles/s41562-021-01284-5"}
                target="_blank">
                (see Yaron et al., 2022).
              </a>{" "}
              UnconTrust has been created by Maor Schreiber and Francois
              Stockart, based on two meta-analyses conducted in the Mudrik lab
              (Schreiber et al., in preparation; Stockart et al., in
              preparation). We similarly aim at expanding our database to
              include more papers, and accordingly call users in the community
              to participate in building and extending it. We hope that it will
              become a major hub for the community of consciousness studies,{" "}
              <a className={aLinkClass} href="/contact">
                {" "}
                and welcome your message and suggestions.
              </a>
            </Text>
          </div>
          <div className="px-4 sm:px-0">
            <div className=" openSource-box max-w-[815px] bg-grayLight sm:flex justify-between items-center gap-4 px-6 py-4 mx-auto my-16">
              <div className="sm:w-[165px] ">
                <Text xl3 weight="bold" center={isMoblile}>
                  We Are{isMoblile ? " " : <br />} Open Source
                </Text>
              </div>

              <div className="max-w-[390px]">
                <Text>
                  {/*TODO: connect links*/}
                  We believe in open-science! In this link, you can find a CSV
                  file with all the data presented on this website and the code
                  for creating the queries and graphs. The data is licensed
                  under{" "}
                  <a
                    className="text-darkBlue underline"
                    href="https://creativecommons.org/licenses/by-sa/4.0/"
                    target="_blank">
                    CC-BY-SA-4.0 creative commons
                  </a>{" "}
                  open license and the code under the GNU GPLv3 open source
                  license
                </Text>
              </div>
              <div className="h-4  sm:border-r border-black sm:h-28"></div>
              <div className=" flex flex-row justify-center ">
                <Button
                  extraClass="text-sm"
                  black
                  onClick={() =>
                    window.open(
                      "https://github.com/Mudrik-Lab/Contrast2",
                      "_blank"
                    )
                  }>
                  <Github /> Get Source Code
                </Button>
              </div>
            </div>
            <div id="steering_committee">
              <Text xl3 center>
                UnconTruSt Steering Committee
              </Text>
              <TeamMembersCards />
              <Spacer height={40} />
              <CommunityBox />
              <Spacer height={120} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
