import React from "react";
import Navbar from "../../components/Navbar";
import { Text, Spacer, ButtonReversed } from "../../components/Reusble";
import CommunityBox from "../Home/CommunityBox";
import Footer from "../../components/Footer";
import { navHeight } from "../../Utils/HardCoded";
import { useState } from "react";
import ContactUs from "./ContactUs";
import SuggestingNewQueries from "./SuggestingNewQueries";
import VettingPaper from "./VettingPaper";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const [chosen, setChosen] = useState("contact-us");
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <Spacer height={navHeight + 20} />
      <div className="container w-[730px] mx-auto">
        <h1 className="text-blue text-center text-6xl  mb-8">
          Contact ConTraSt
        </h1>
        <div className="w-full mx-auto text-base">
          <p className="text-justify">
            Here you can{" "}
            <span
              className="underline font-bold cursor-pointer"
              onClick={() => {
                setChosen("new-query");
                window.location.href = "#contact-forms";
              }}
              href="#contact-forms">
              suggest new queries
            </span>{" "}
            you think we should add to the website, suggest{" "}
            <a className="underline font-bold " href="">
              corrections to classifications
            </a>{" "}
            done in one of our entries,{" "}
            <span
              className="underline font-bold cursor-pointer"
              onClick={() => {
                setChosen("feedback");
                window.location.href = "#contact-forms";
              }}
              href="#contact-forms">
              give us feedback
            </span>{" "}
            about your experience using the website, or{" "}
            <span
              className="underline font-bold cursor-pointer"
              onClick={() => {
                setChosen("contact-us");
                window.location.href = "#contact-forms";
              }}
              href="#contact-forms">
              just write to us
            </span>{" "}
            and let us know what’s on your mind.
            <br />
            <br />
            There’s more:
            <li>
              If you would like to add a study to our database, please{" "}
              <a className="underline font-bold " href="upload-new-paper">
                follow this link
              </a>
            </li>
            <li>
              If you want to find out if a paper is included in the database, so
              to know if you should add it, or to double-check our
              classifications, you can{" "}
              <a
                className="underline font-bold "
                href="parameter-distribution-free-queries">
                download a CSV
              </a>{" "}
              with the list of all included experiments.
            </li>
          </p>
        </div>
        <Spacer height={20} />
        <div className="mx-auto py-4 px-4 w-full bg-black mb-4 flex flex-col items-center gap-4 rounded-md">
          <h3 className="text-2xl font-bold text-blue ">
            We would love to hear from you!
          </h3>
          <div className="flex gap-4">
            <ButtonReversed
              isChosen={chosen === "contact-us"}
              onClick={() => setChosen("contact-us")}>
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_641_5196)">
                  <path
                    d="M16.5 8C16.5 11.866 12.918 15 8.5 15C7.70765 15.0011 6.91859 14.8982 6.153 14.694C5.569 14.99 4.228 15.558 1.972 15.928C1.772 15.96 1.62 15.752 1.699 15.566C2.053 14.73 2.373 13.616 2.469 12.6C1.244 11.37 0.5 9.76 0.5 8C0.5 4.134 4.082 1 8.5 1C12.918 1 16.5 4.134 16.5 8Z"
                    fill={chosen === "contact-us" ? "#66BFF1" : "white"}
                  />
                </g>
              </svg>
              Contact Us
            </ButtonReversed>
            <ButtonReversed
              isChosen={chosen === "new-query"}
              onClick={() => setChosen("new-query")}>
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_641_5206)">
                  <path
                    d="M2.5 6.00019C2.49997 5.0094 2.7453 4.03403 3.21408 3.16116C3.68287 2.28828 4.36051 1.54509 5.18651 0.997926C6.01251 0.450765 6.96115 0.116669 7.94773 0.0254724C8.93432 -0.0657246 9.92813 0.0888152 10.8404 0.475293C11.7527 0.86177 12.5551 1.46816 13.176 2.2403C13.7968 3.01245 14.2168 3.92633 14.3984 4.90034C14.58 5.87434 14.5175 6.87816 14.2166 7.82215C13.9157 8.76614 13.3858 9.62093 12.674 10.3102C12.471 10.5062 12.315 10.7102 12.221 10.9292L11.459 12.6982C11.4203 12.7878 11.3563 12.8642 11.2747 12.9179C11.1931 12.9716 11.0976 13.0002 11 13.0002H6C5.90219 13.0004 5.80648 12.9718 5.72472 12.9182C5.64296 12.8645 5.57874 12.788 5.54 12.6982L4.779 10.9282C4.67004 10.6944 4.51611 10.4845 4.326 10.3102C3.74763 9.75136 3.28783 9.08167 2.9741 8.34114C2.66036 7.60061 2.49912 6.80444 2.5 6.00019ZM5.5 14.5002C5.5 14.3676 5.55268 14.2404 5.64645 14.1466C5.74022 14.0529 5.8674 14.0002 6 14.0002H11C11.1326 14.0002 11.2598 14.0529 11.3536 14.1466C11.4473 14.2404 11.5 14.3676 11.5 14.5002C11.5 14.6328 11.4473 14.76 11.3536 14.8537C11.2598 14.9475 11.1326 15.0002 11 15.0002L10.776 15.4472C10.693 15.6133 10.5654 15.753 10.4075 15.8506C10.2496 15.9483 10.0677 16.0001 9.882 16.0002H7.118C6.93234 16.0001 6.75037 15.9483 6.59248 15.8506C6.43458 15.753 6.30699 15.6133 6.224 15.4472L6 15.0002C5.8674 15.0002 5.74022 14.9475 5.64645 14.8537C5.55268 14.76 5.5 14.6328 5.5 14.5002Z"
                    fill={chosen === "new-query" ? "#66BFF1" : "white"}
                  />
                </g>
              </svg>
              Suggest New Query
            </ButtonReversed>
            <ButtonReversed
              isChosen={chosen === "vet-a-paper"}
              onClick={() => setChosen("vet-a-paper")}>
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_641_5188)">
                  <path
                    d="M9 2.68712C9.654 1.99812 10.782 1.80112 12.112 1.93512C13.346 2.05912 14.615 2.45812 15.5 2.82812V12.7511C14.582 12.4011 13.393 12.0591 12.213 11.9411C11.119 11.8301 9.935 11.9021 9 12.4331V2.68712ZM8.5 1.78312C7.515 0.936125 6.087 0.810125 4.787 0.940125C3.273 1.09312 1.745 1.61213 0.793 2.04513C0.705649 2.08485 0.631575 2.14888 0.579621 2.22956C0.527667 2.31024 0.500027 2.40416 0.5 2.50012V13.5001C0.500023 13.5838 0.521037 13.6661 0.561117 13.7395C0.601197 13.813 0.659062 13.8752 0.729411 13.9204C0.79976 13.9657 0.880345 13.9926 0.963783 13.9987C1.04722 14.0047 1.13085 13.9898 1.207 13.9551C2.089 13.5551 3.51 13.0741 4.887 12.9351C6.296 12.7931 7.477 13.0221 8.11 13.8121C8.15685 13.8705 8.21622 13.9177 8.28372 13.95C8.35122 13.9824 8.42513 13.9992 8.5 13.9992C8.57487 13.9992 8.64878 13.9824 8.71628 13.95C8.78378 13.9177 8.84315 13.8705 8.89 13.8121C9.523 13.0221 10.704 12.7931 12.112 12.9351C13.49 13.0741 14.912 13.5551 15.793 13.9551C15.8692 13.9898 15.9528 14.0047 16.0362 13.9987C16.1197 13.9926 16.2002 13.9657 16.2706 13.9204C16.3409 13.8752 16.3988 13.813 16.4389 13.7395C16.479 13.6661 16.5 13.5838 16.5 13.5001V2.50012C16.5 2.40416 16.4723 2.31024 16.4204 2.22956C16.3684 2.14888 16.2944 2.08485 16.207 2.04513C15.255 1.61213 13.727 1.09312 12.213 0.940125C10.913 0.809125 9.485 0.936125 8.5 1.78312Z"
                    fill={chosen === "vet-a-paper" ? "#66BFF1" : "white"}
                  />
                </g>
              </svg>
              Vet A Paper
            </ButtonReversed>
            <ButtonReversed
              isChosen={chosen === "feedback"}
              onClick={() => setChosen("feedback")}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1186_9510)">
                  <path
                    d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM8.5 4.5C8.5 4.36739 8.44732 4.24021 8.35355 4.14645C8.25979 4.05268 8.13261 4 8 4C7.86739 4 7.74021 4.05268 7.64645 4.14645C7.55268 4.24021 7.5 4.36739 7.5 4.5V7.5H4.5C4.36739 7.5 4.24021 7.55268 4.14645 7.64645C4.05268 7.74021 4 7.86739 4 8C4 8.13261 4.05268 8.25979 4.14645 8.35355C4.24021 8.44732 4.36739 8.5 4.5 8.5H7.5V11.5C7.5 11.6326 7.55268 11.7598 7.64645 11.8536C7.74021 11.9473 7.86739 12 8 12C8.13261 12 8.25979 11.9473 8.35355 11.8536C8.44732 11.7598 8.5 11.6326 8.5 11.5V8.5H11.5C11.6326 8.5 11.7598 8.44732 11.8536 8.35355C11.9473 8.25979 12 8.13261 12 8C12 7.86739 11.9473 7.74021 11.8536 7.64645C11.7598 7.55268 11.6326 7.5 11.5 7.5H8.5V4.5Z"
                    fill={chosen === "feedback" ? "#66BFF1" : "white"}
                  />
                </g>
              </svg>
              Give Us Feedback
            </ButtonReversed>
          </div>
        </div>
        <Spacer height={10} />
        <div id="contact-forms " className="w-full mx-auto">
          {chosen === "contact-us" ? (
            <ContactUs />
          ) : chosen === "new-query" ? (
            <SuggestingNewQueries />
          ) : chosen === "vet-a-paper" ? (
            <VettingPaper />
          ) : chosen === "feedback" ? (
            <Feedback />
          ) : (
            <></>
          )}
        </div>
      </div>
      <Spacer height={30} />
      <CommunityBox />
      <Spacer height={100} />
      <Footer />
    </div>
  );
}
