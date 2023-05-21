import React from "react";
import { Text } from "../../components/Reusble";
import ShowMoreText from "react-show-more-text";
import { ReactComponent as Web } from "../../assets/icons/website.svg";
import { foundingBoardBios } from "../../Utils/HardCoded";

export default function TeamMembersCards() {
  return (
    <div className="flex flex-wrap justify-center w-256 px-24 my-6 gap-5 gap-y-7 mx-auto ">
      {foundingBoardBios.map((card) => (
        <div className="team-member-card w-48 flex flex-col items-center shadow-lg p-2 rounded-lg relative">
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundImage: `url(${card.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}></div>

          <div className="min-h-[180px] max-h-[260px]">
            <div className="flex flex-col justify-center items-center h-16 mb-4">
              <Text center md weight="bold">
                {card.name}
              </Text>
              <Text center size={14}>
                {card.title}
              </Text>
            </div>

            <ShowMoreText
              className="text-sm text-grayHeavy break-keep text-center mb-10"
              lines={1}
              more="Show more"
              less="Show less"
              anchorClass="show-more-less-clickable"
              onClick={() => console.log("first")}
              width={280}
              expanded={false}
              textStyle={{ textAlign: "center" }}
              truncatedEndingComponent={"... "}>
              {card.text}
            </ShowMoreText>
          </div>
          <div className="absolute  bottom-2">
            <a href={card.website} target="_blank">
              <Web />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
