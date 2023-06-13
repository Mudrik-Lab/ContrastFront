import React from "react";
import Navbar from "../../components/Navbar";
import { ReactComponent as Graph } from "../../assets/icons/submit.svg";
import { ReactComponent as Message } from "../../assets/icons/message.svg";
import { ReactComponent as Light } from "../../assets/icons/lightball.svg";
import { ReactComponent as Paper } from "../../assets/icons/paper.svg";

import { Text, Spacer, Button, ButtonReversed } from "../../components/Reusble";
import CommunityBox from "../Home/CommunityBox";
import Footer from "../../components/Footer";
import { navHeight } from "../../Utils/HardCoded";

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <Spacer height={navHeight + 54} />
      <div className="mx-auto max-w-xl mb-16">
        <Text className="text-6xl" color="blue" center>
          Contact ConTraSt
        </Text>
        <div className=" contact-box mx-auto shadow-lg flex gap-4 px-5 py-5 ">
          <Button>
            <Message /> Give Us Feedback
          </Button>
          <ButtonReversed>
            <Paper /> Vet A Paper
          </ButtonReversed>
          <ButtonReversed>
            <Light /> Suggest A Feature
          </ButtonReversed>
        </div>
        <div className=" contact-box mx-auto shadow-lg flex flex-col p-5">
          <div className="flex justify-between gap-3">
            <div className="p-2 w-full">
              <Text color="blue" weight="bold">
                Name
              </Text>
              <input
                className="border-2 p-2 w-full mt-2 "
                type="text"
                maxLength={30}
                placeholder="John Doe"
              />
            </div>

            <div className="p-2 w-full">
              <Text color="blue" weight="bold">
                Email
              </Text>
              <input
                className="border-2 p-2 w-full mt-2"
                type="text"
                maxLength={30}
                placeholder="JohnDoe@example.com"
              />
            </div>
          </div>
          <div className="p-2 w-full ">
            <Text color="blue" weight="bold">
              Messege
            </Text>

            <textarea
              className="border-2 p-2 w-full mt-2"
              placeholder="Tell us..."
              rows="4"
            />
          </div>
          <div className="p-2">
            <Button>
              <Graph />
              Submit
            </Button>
          </div>
        </div>
      </div>
      <CommunityBox />
      <Spacer height={100} />
      <Footer />
    </div>
  );
}
