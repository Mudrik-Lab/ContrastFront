import React from "react";
import Navbar from "../../components/Navbar";
import { Button, Spacer, Text } from "../../components/Reusble";
import { ReactComponent as Github } from "../../assets/icons/github-small.svg";
import BrainImg from "../../assets/images/dreamstime.png";

export default function AboutPage() {
  const navHeight = 60;
  return (
    <div>
      <Navbar />
      <Spacer height={navHeight + 64} />
      <div className="px-56">
        <Text size={57} color="blue" center>
          About ConTraSt
        </Text>
        <div className="about-database mt-16">
          <Text size={43} center>
            The Consciousness Theories Studies (ConTraSt) database
          </Text>
          <div className="flex gap-10 mt-6">
            <img src={BrainImg} alt="" />
            <Text md>
              This website allows researchers to conduct queries and examine
              trends in empirical papers that either tested or mentioned at
              least one of the following theories of consciousness : Global
              Neuronal Workspace (1,2), Integrated Information Theory (3,4),
              Recurrent Processing Theory (5,6) and Higher Order Theories (7,8).
              Below is a list of plots and searches that can be generated. For
              each such plot/search you can also download a CSV file where all
              relevant papers are listed. All details about the database and
              included papers can be found in our preprint. Currently, the
              datasets includes papers that were published by October 2019. We
              are now working on adding all relevant papers that meet the
              criteria and were published since.
              <br /> Importantly, we are also exploring ways for making this
              website more interactive and community-based so that users could
              upload additional papers, and possibly also include more theories.
              This is still under work, and we will update when we have news! If
              you are interested in helping us in the process, please contact us
              : ContrastDB@gmail.com
            </Text>
          </div>
          <div className=" border openSource-box bg-grayLight flex justify-between items-center gap-4 px-6 py-2 mx-28 my-16">
            <Text weight="bold" size={32}>
              We Are Open Source
            </Text>
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
            <div className="flex flex-wrap w-256 px-28 my-6">
              <div className="team-member-card w-48 border flex flex-col items-center">
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundImage: `url(${BrainImg})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}></div>
                <Text center md weight="bold">
                  Prof. L. Mudrik
                </Text>
                <Text center md>
                  Project Manager
                </Text>
                <Text color="grayHeavy">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  commodo faucibus lacus quis laoreet. Vestibulum ante ipsum
                  primis in
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
