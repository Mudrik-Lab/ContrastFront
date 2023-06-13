import React from "react";
import { Text } from "../../components/Reusble";
import ShowMoreText from "react-show-more-text";
import { ReactComponent as Web } from "../../assets/icons/website.svg";
import karine from "../../assets/images/Karine.jpg";
import { foundingBoardBios } from "../../Utils/FoundersBios";

export default function TeamMembersCards() {
  return (
    <div>
      <div className="flex flex-wrap justify-center sm:w-[900px] sm:px-24 my-6 gap-5 gap-y-7 mx-auto ">
        {foundingBoardBios
          .sort((a, b) => {
            if (a.secondName < b.secondName) {
              return -1;
            }
            if (a.secondName > b.secondName) {
              return 1;
            }
            return 0;
          })
          .map((card) => (
            <div
              className="team-member-card w-40 sm:w-48 flex flex-col items-center shadow-lg p-2 rounded-lg relative"
              key={card.name}>
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
                <div className="flex flex-col justify-center items-center my-4">
                  <Text center lg weight="bold">
                    {card.name}
                  </Text>
                </div>

                <ShowMoreText
                  className="text-sm text-grayHeavy break-keep text-center mb-10"
                  lines={1}
                  more="Show more"
                  less="Show less"
                  anchorClass="show-more-less-clickable"
                  width={280}
                  expanded={false}
                  textStyle={{ textAlign: "center" }}
                  truncatedEndingComponent={"... "}>
                  {card.text}
                </ShowMoreText>
              </div>
              <div className="absolute  bottom-2">
                <a
                  href={card.website}
                  aria-label="link to member's website"
                  target="_blank">
                  <Web />
                </a>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-24 mx-auto ">
        <div className="Karine's-card w-48 flex flex-col items-center shadow-lg p-2 rounded-lg relative">
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundImage: `url(${karine})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}></div>

          <div className="w-[150px]">
            <div className="flex flex-col justify-center items-center my-4">
              <Text center lg weight="bold">
                {"Karine Jospe"}
              </Text>
            </div>

            <ShowMoreText
              className="text-sm text-grayHeavy break-keep text-center mb-10"
              lines={1}
              more="Show more"
              less="Show less"
              anchorClass="show-more-less-clickable"
              width={280}
              expanded={false}
              textStyle={{ textAlign: "center" }}
              truncatedEndingComponent={"... "}>
              Website Manager
            </ShowMoreText>
          </div>
          <div className="absolute  bottom-2">
            <a
              href={
                "https://people.socsci.tau.ac.il/mu/mudriklab/people/#gkit-popup"
              }
              aria-label="link to Karine's website"
              target="_blank">
              <Web />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
