import React from "react";
import Navbar from "../../components/Navbar";
import { Button, Spacer, Text } from "../../components/Reusble";
import { ReactComponent as Github } from "../../assets/icons/github-small.svg";
import BrainImg from "../../assets/images/dreamstime.png";
import TeamMembersCards from "./TeamMembersCards";
import CommunityBox from "../Home/CommunityBox";
import Footer from "../../components/Footer";
import { navHeight } from "../../components/HardCoded";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <Spacer height={navHeight + 64} />
      <div className="px-56">
        <Text size={57} color="blue" center>
          About ConTraSt
        </Text>
        <div className="about-database mt-16 mx-auto ">
          <Text size={43} center>
            The Consciousness Theories Studies (ConTraSt) database
          </Text>
          <div className="flex gap-10 mt-6 max-w-6xl mx-auto">
            <img src={BrainImg} alt="" />
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
              the above-mentioned families of theories, feel free to upload
              information about the paper here [ADD LINK to the form]. New
              uploads will be approved by the ConTraSt steering committee [ADD
              LINK to the list of the members). The ConTraSt database was first
              created by Itay Yaron{" "}
              <a href="https://www.nature.com/articles/s41562-021-01284-5">
                (see Yaron et al., 2022)
              </a>
              ; We have now expanded it to include more papers, and to allow
              users in the community to participate in building and extending
              it. We hope that it will become a major hub for the community of
              consciousness studies, and welcome your feedback and suggestions
              [ADD LINK to form].
            </Text>
          </div>
          <div className=" openSource-box w-256 bg-grayLight flex justify-between items-center gap-4 px-10 py-2 mx-auto my-16">
            <Text weight="bold" size={32}>
              We Are Open Source
            </Text>
            <div className=" border-r border-black h-16"></div>
            <div>
              <Text md>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                commodo faucibus lacus quis laoreet.{" "}
              </Text>
            </div>
            <div className=" border-r border-black h-16"></div>
            <div className=" flex flex-row">
              <Button style={{ fontSize: "14px" }} black>
                <Github /> Get Source Code
              </Button>
            </div>
          </div>
          <div>
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
