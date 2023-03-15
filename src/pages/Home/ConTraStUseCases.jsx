import React from "react";
import { Text } from "../../components/Reusble";
import { ReactComponent as Tempeleton } from "../../assets/logoes/tempelton.svg";
import { ReactComponent as TelAvivUni } from "../../assets/logoes/tel-aviv-uni.svg";
import { ReactComponent as Cogtate } from "../../assets/logoes/cogtate.svg";
import { ReactComponent as All } from "../../assets/logoes/all-logoes-together.svg";

export default function ConTraStUseCases() {
  const cardsInfo = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2mGuiTnSMifrKst2aOFNmjdbBBbGemF_zHbI2oO9&s",
      headline: "Find the papers that are most relevant to you",
      text: "This website allows researchers to conduct queries and examine trends in empirical papers that either tested or mentioned at least one of the following theories of consciousness",
    },
    {
      image:
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
      headline: "Find the papers that are most relevant to you",
      text: "This website allows researchers to conduct queries and examine trends in empirical papers that either tested or mentioned at least one of the following theories of consciousness",
    },
    {
      image:
        "https://www.fauna-flora.org/app/uploads/2022/11/AdobeStock_246102033_cropped-2-scaled.jpeg",
      headline: "Find the papers that are most relevant to you",
      text: "This website allows researchers to conduct queries and examine trends in empirical papers that either tested or mentioned at least one of the following theories of consciousness",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2mGuiTnSMifrKst2aOFNmjdbBBbGemF_zHbI2oO9&s",
      headline: "Find the papers that are most relevant to you",
      text: "This website allows researchers to conduct queries and examine trends in empirical papers that either tested or mentioned at least one of the following theories of consciousness",
    },
  ];
  return (
    <div
      style={{ width: "calc(384px*2 + 48px )" }}
      className=" w-256 mx-auto my-20 flex flex-col items-center gap-8 ">
      <h1 className="text-5xl ">ConTraSt Use Cases</h1>
      <div className="ConTraStUseCases flex flex-wrap gap-12 justify-center">
        {cardsInfo.map((card) => (
          <div className="card bg-grayLight flex flex-col justify-center p-6 w-96">
            <img src={card.image} alt="" />
            <Text center lg weight="bold">
              {card.headline}
            </Text>
            <Text>{card.text}</Text>
          </div>
        ))}
        <div className="simply-fun border bg-grayLight py-6 w-full">
          <Text center lg weight="bold">
            Simply have fun
          </Text>
          <div className="px-40 mt-4">
            <Text center>
              This website allows researchers to conduct queries and examine
              trends in empirical papers that either tested or mentioned at
              least one of the following theories of consciousness :{" "}
            </Text>
          </div>
        </div>
      </div>
      <div className="footer flex justify-center items-center gap-6">
        {/* <Cogtate />
        <Tempeleton />
        <TelAvivUni /> */}
        <All />
      </div>
    </div>
  );
}
