import React from "react";
import { Text } from "../../../sharedComponents/Reusble";
import Tempeleton from "../../../assets/logoes/tempelton.png";
import TelAvivUni from "../../../assets/logoes/tlv-uni.png";
import Cifar from "../../../assets/logoes/cifar.png";

export default function UnconTraStUseCases() {
  const cardsInfo = [
    {
      video:
        "https://player.vimeo.com/video/972052687?h=9afb6fdd5d&title=0&byline=0&portrait=0",
      title: "Find the papers that are most relevant to you",
      text: "Conduct your own queries, looking for different intersections of methods, approaches and paradigms. Download citations lists of relevant works that could help you map the field and get started!",
    },

    {
      video:
        "https://player.vimeo.com/video/972052873?h=9afb6fdd5d&title=0&byline=0&portrait=0",
      title: "Discover trends over time",
      text: "For each Parameters, explore how the experiments in the UnconTrust database distribute at each point in time, so to unravel interesting trends and changes in the field over the years",
    },

    {
      video:
        "https://player.vimeo.com/video/972052780?h=9afb6fdd5d&title=0&byline=0&portrait=0",
      title: "Simply have fun ",
      text: "You can also enjoy some of our plots that provide a more sociological view of the field: which theories are more popular in different countries and journals?...",
    },
    {
      video:
        "https://player.vimeo.com/video/972052937?h=9afb6fdd5d&title=0&byline=0&portrait=0",
      title: "Submit a paper to our database",
      text: "Watch this video to see how to add a paper to our database. In any case you encounter a problem, feel free to contact us through the contact form.",
    },
  ];
  return (
    <div className=" sm:w-256 mx-auto my-20 flex flex-col items-center sm:gap-8 ">
      <h1 className="text-4xl sm:text-5xl text-center sm:text-left ">
        UnconTrust Use Cases
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
        <a href="https://www.arc-cogitate.com/" target="_blank">
          <img src={Cifar} width={110} alt="https://cifar.ca/ " />{" "}
        </a>{" "}
        <a
          href="https://live-templeton-next-nhemv.appa.pantheon.site/"
          target="_blank">
          <img
            src={Tempeleton}
            alt="https://live-templeton-next-nhemv.appa.pantheon.site/"
          />{" "}
        </a>
        <a href="https://www.tau.ac.il/" target="_blank">
          <img src={TelAvivUni} alt="https://www.tau.ac.il/" />{" "}
        </a>{" "}
      </div>
    </div>
  );
}
