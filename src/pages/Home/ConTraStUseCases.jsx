import React from "react";
import { Text } from "../../components/Reusble";
import Tempeleton from "../../assets/logoes/tempelton.png";
import TelAvivUni from "../../assets/logoes/tlv-uni.png";
import Cogtate from "../../assets/logoes/cogtate.png";

export default function ConTraStUseCases() {
  const cardsInfo = [
    {
      image: "https://player.vimeo.com/video/274353008?h=a5e71d0bc5",
      headline: "Find the papers that are most relevant to you",
      text: "Conduct your own queries, looking for different intersections of methods, approaches and paradigms. Download citations lists of relevant works that could help you map the field and get started!",
    },
    {
      image:
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
      headline: "Compare between the theories",
      text: "Choose parameters of interest and explore how these distribute between the different theories and within each one. This will allow you to ask meaningful questions about the ways in which the theories have been tested and studied, and perhaps give you ideas for you own new study",
    },
    {
      image:
        "https://www.fauna-flora.org/app/uploads/2022/11/AdobeStock_246102033_cropped-2-scaled.jpeg",
      headline: "Discover trends over time",
      text: "For each Parameters, explore how the experiments in the ConTraSt database distribute at each point in time, so to unravel interesting trends and changes in the field over the years",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2mGuiTnSMifrKst2aOFNmjdbBBbGemF_zHbI2oO9&s",
      headline: "Get a high level snapshot of findings",
      text: "For both anatomical and temporal findings, get plots that summarize the current state of affairs and provide an overview of the way theories of consciousness have been studied",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2mGuiTnSMifrKst2aOFNmjdbBBbGemF_zHbI2oO9&s",
      headline: "Simply have fun ",
      text: "You can also enjoy some of our plots that provide a more sociological view of the field: which theories are more popular in different countries and journals?...",
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
            <iframe src={card.image} alt="" />
            <Text center xl weight="bold">
              {card.headline}
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
