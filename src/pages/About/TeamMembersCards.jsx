import React from "react";
import { Text } from "../../components/Reusble";
import Temp from "../../assets/images/liad.jpg";
import ShowMoreText from "react-show-more-text";
import { ReactComponent as Email } from "../../assets/icons/email.svg";
import { ReactComponent as LinkdIn } from "../../assets/icons/linkdIn.svg";

export default function TeamMembersCards() {
  const teamMembersInfo = [
    {
      image: Temp,
      name: "Prof. L. Mudrik",
      position: "Project Manager",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo faucibus lacus quis laoreet. Vestibulum ante ipsum primis in. Nam commodo faucibus lacus quis laoreet",
      linkdIn: "",
      email: "",
    },
    {
      image: Temp,
      name: "Prof. L. Mudrik",
      position: "Project Manager",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo faucibus lacus quis laoreet. Vestibulum ante ipsum primis in",
      linkdIn: "",
      email: "",
    },
    {
      image: Temp,
      name: "Prof. L. Mudrik",
      position: "Project Manager",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo faucibus lacus quis laoreet. Vestibulum ante ipsum primis in",
      linkdIn: "",
      email: "",
    },
    {
      image: Temp,
      name: "Prof. L. Mudrik",
      position: "Project Manager",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo faucibus lacus quis laoreet. Vestibulum ante ipsum primis in",
      linkdIn: "",
      email: "",
    },
    {
      image: Temp,
      name: "Prof. L. Mudrik",
      position: "Project Manager",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo faucibus lacus quis laoreet. Vestibulum ante ipsum primis in",
      linkdIn: "",
      email: "",
    },
    {
      image: Temp,
      name: "Prof. L. Mudrik",
      position: "Project Manager",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo faucibus lacus quis laoreet. Vestibulum ante ipsum primis in",
      linkdIn: "",
      email: "",
    },
    {
      image: Temp,
      name: "Prof. L. Mudrik",
      position: "Project Manager",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo faucibus lacus quis laoreet. Vestibulum ante ipsum primis in",
      linkdIn: "",
      email: "",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center w-256 px-24 my-6 gap-5  gap-y-7 mx-auto">
      {teamMembersInfo.map((card) => (
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
          <Text center md weight="bold">
            {card.name}
          </Text>
          <Text center md>
            {card.position}
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
          <div className="flex justify-center gap-3 mt-2">
            <a href={card.email}>
              <Email />
            </a>
            <a href={card.lindkIn}>
              <LinkdIn />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
