import React from "react";
import Navbar from "../../components/Navbar";
import { ReactComponent as Graph } from "../../assets/icons/submit.svg";

import { Text, Spacer, navHeight, Button } from "../../components/Reusble";
import CommunityBox from "../Home/CommunityBox";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <Spacer height={navHeight + 64} />
      <div className="mx-auto max-w-xl mb-16">
        <Text size={57} color="blue" center>
          Contact ConTraSt
        </Text>
        <div className=" contact-box mx-auto shadow-lg flex flex-col p-4">
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
          <div className="mx-auto">
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
