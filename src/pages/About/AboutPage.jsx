import React from "react";
import Navbar from "../../components/Navbar";
import { Button, Spacer, Text } from "../../components/Reusble";
import { ReactComponent as Github } from "../../assets/icons/github-small.svg";
import BrainImg from "../../assets/images/brain-prism-tall.jpg";
import TeamMembersCards from "./TeamMembersCards";
import CommunityBox from "../Home/CommunityBox";
import Footer from "../../components/Footer";
import { navHeight } from "../../Utils/HardCoded";

export default function AboutPage() {
  const aLinkClass = "text-blue cursor-pointer";
  return (
    <div id="about-page">
      <Navbar />
      <Spacer height={navHeight + 64} />
      <div className="max-w-[1018px] mx-auto">
        <Text size={57} color="blue" center>
          About ConTraSt
        </Text>
        <div className="about-database mt-16 mx-auto ">
          <Text size={43} center>
            The Consciousness Theories Studies (ConTraSt) database
          </Text>
          <div className="h-auto flex gap-10 mt-6 max-w-[1250px] mx-auto px-2">
            <div className="h-auto bg-black flex flex-col justify-center">
              <img src={BrainImg} alt="" />
            </div>

            <Text md>
              Welcome to the ConTraSt database website! This is an open access
              interactive website, featuring the Consciousness Theories Studies
              (ConTraSt) database. Below you can get a bird’s eye view on how
              theories of consciousness have been studied and conduct your own
              queries on the data. Here, we focus on four leading families of
              theories: Global Workspace theories, Integrated Information
              Theories, Higher Order Thought theories and First order &
              predictive processing theories. We provide analytics on papers
              that interpret their findings in light of these theories, aiming
              at identifying trends in methodological choices, interpretations,
              findings, and more, by classifying and quantifying the original
              authors’ point of view with regard to their studies Below is a
              list of plots and searches that can be generated. For each such
              plot/search you can also download a CSV file where all relevant
              papers are listed. We welcome the uploading of new, relevant,
              papers to the database! If you have a paper that refers to one of
              the above-mentioned families of theories, feel free to{" "}
              <a className={aLinkClass} href="/upload-new-paper">
                upload information about the paper here.
              </a>{" "}
              New uploads will be approved by{" "}
              <a className={aLinkClass} href="#steering_committee">
                the ConTraSt steering committee
              </a>
              . The ConTraSt database was first created by Itay Yaron{" "}
              <a
                className={aLinkClass}
                href="https://www.nature.com/articles/s41562-021-01284-5">
                (see Yaron et al., 2022);{" "}
              </a>
              We have now expanded it to include more papers, and to allow users
              in the community to participate in building and extending it. We
              hope that it will become a major hub for the community of
              consciousness studies,{" "}
              <a className={aLinkClass} href="/contact">
                and welcome your feedback and suggestions
              </a>
            </Text>
          </div>
          <div className=" openSource-box max-w-[815px] bg-grayLight sm:flex justify-between items-center gap-4 px-6 py-4 mx-auto my-16">
            <div className="w-[165px]">
              <Text className={"leading-8 break-keep"} weight="bold" size={30}>
                We Are <br /> Open Source
              </Text>
            </div>

            <div className="max-w-[390px]">
              <Text md>
                We believe in open-science! In this link, you can find our full
                database and the codes for creating the queries
              </Text>
            </div>
            <div className=" border-r border-black h-16"></div>
            <div className=" flex flex-row ">
              <Button
                style={{ fontSize: "14px" }}
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
            <Text size={43} center>
              ConTraSt Steering Committee
            </Text>
            <TeamMembersCards />
            <Spacer height={40} />
            <CommunityBox />
            <Spacer height={120} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
