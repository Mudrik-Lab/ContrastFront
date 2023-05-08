import React from "react";
import { Text } from "../../components/Reusble";

import ShowMoreText from "react-show-more-text";
import { ReactComponent as Email } from "../../assets/icons/email.svg";
import { foundingBoardBios } from "../../components/HardCoded";

export default function TeamMembersCards() {
  return (
    <div className="flex flex-wrap justify-center w-256 px-24 my-6 gap-5 gap-y-7 mx-auto">
      {foundingBoardBios.map((card) => (
        <div className="team-member-card w-48 flex flex-col items-center">
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

          <div className="min-h-[110px] max-h-[200px]">
            <Text center md weight="bold">
              {card.name}
            </Text>
            <Text center sm weight="bold">
              {card.title ? card.title : <br />}
            </Text>
            <ShowMoreText
              className="text-sm text-grayHeavy break-keep"
              lines={1}
              more="Show more"
              less="Show less"
              anchorClass="show-more-less-clickable"
              onClick={() => console.log("first")}
              width={280}
              truncatedEndingComponent={"... "}>
              {card.text}
            </ShowMoreText>
          </div>
          <div className="flex justify-center gap-3 mt-2">
            <a href={card.website} target="_blank">
              <Email />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
