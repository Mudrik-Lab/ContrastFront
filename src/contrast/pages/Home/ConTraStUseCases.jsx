import React from "react";
import { Text } from "../../../sharedComponents/Reusble";
import Tempeleton from "../../../assets/logoes/tempelton.png";
import TelAvivUni from "../../../assets/logoes/tlv-uni.png";
import Cogtate from "../../../assets/logoes/cogtate.png";

export default function ConTraStUseCases() {
  const cardsInfo = [
    {
      video: "https://player.vimeo.com/video/864370519?h=b3c1541d39",
      title: "Find the papers that are most relevant to you",
      text: "Conduct your own queries, looking for different intersections of methods, approaches and paradigms. Download citations lists of relevant works that could help you map the field and get started!",
    },
    {
      video: "https://player.vimeo.com/video/870160361?h=73778ff75e",
      title: "Compare between the theories",
      text: "Choose parameters of interest and explore how these distribute between the different theories and within each one. This will allow you to ask meaningful questions about the ways in which the theories have been tested and studied, and perhaps give you ideas for you own new study",
    },
    {
      video: "https://player.vimeo.com/video/870160728?h=6dfa7054fc",
      title: "Discover trends over time",
      text: "For each Parameters, explore how the experiments in the ConTraSt database distribute at each point in time, so to unravel interesting trends and changes in the field over the years",
    },
    {
      video: "https://player.vimeo.com/video/870160616?h=9afb6fdd5d",
      title: "Get a high level snapshot of findings",
      text: "For both anatomical and temporal findings, get plots that summarize the current state of affairs and provide an overview of the way theories of consciousness have been studied",
    },
    {
      video:
        "https://player.vimeo.com/video/870160616?h=9afb6fdd5d&title=0&byline=0&portrait=0",
      title: "Simply have fun ",
      text: "You can also enjoy some of our plots that provide a more sociological view of the field: which theories are more popular in different countries and journals?...",
    },
    {
      video:
        "https://player.vimeo.com/video/898841169?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      title: "Submit a paper to our database",
      text: "Watch this video to see how to add a paper to our database. In any case you encounter a problem, feel free to contact us through the contact form.",
    },
  ];
  return (
    <div className=" sm:w-256 mx-auto my-20 flex flex-col items-center sm:gap-8 ">
      <h1 className="text-4xl sm:text-5xl text-center sm:text-left ">
        ConTraSt Use Cases
      </h1>
      <div className="ConTraStUseCases sm:flex sm:flex-wrap gap-12 justify-center mx-auto">
        {cardsInfo.map((card) => (
          <div
            className="card shadow-xl flex flex-col justify-center p-6 sm:w-96 mt-2 sm:mt-0"
            key={card.text}>
            <iframe
              title={card.title}
              alt={card.title}
              src={card.video}
              width="350"
              height="220"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
            />

            <Text center xl weight="bold">
              {card.title}
            </Text>
            <Text>{card.text}</Text>
          </div>
        ))}
      </div>

      <div className="footer flex justify-center items-center gap-6 mt-8 sm:mt-0">
        <a
          href="https://live-templeton-next-nhemv.appa.pantheon.site/"
          target="_blank">
          <img
            src={Tempeleton}
            alt="https://live-templeton-next-nhemv.appa.pantheon.site/"
          />{" "}
        </a>
        <a href="https://www.arc-cogitate.com/" target="_blank">
          <img src={Cogtate} alt="https://www.arc-cogitate.com/ " />{" "}
        </a>{" "}
        <a href="https://www.tau.ac.il/" target="_blank">
          <img src={TelAvivUni} alt="https://www.tau.ac.il/" />{" "}
        </a>{" "}
      </div>
    </div>
  );
}
