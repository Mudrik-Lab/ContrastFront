import React from "react";
import { Text } from "../../components/Reusble";
import Liad from "../../assets/images/Liad.jpg";
import Anil from "../../assets/images/Anil.jpg";
import Axel from "../../assets/images/Axel.jpg";
import LuciaM from "../../assets/images/LuciaM.png";
import LucieC from "../../assets/images/LucieC.jpg";
import Megan from "../../assets/images/Megan.jpeg";
import Ned from "../../assets/images/Ned.jpg";
import Steve from "../../assets/images/Steve.jpg";

import ShowMoreText from "react-show-more-text";
import { ReactComponent as Email } from "../../assets/icons/email.svg";
import { ReactComponent as LinkdIn } from "../../assets/icons/linkdIn.svg";

export default function TeamMembersCards() {
  const foundingBoardBios = [
    {
      name: "Liad Mudrik",
      image: Liad,
      text: "School of Psychological Sciences and Sagol School of Neuroscience,Tel Aviv University.",
      website: "https://mudriklab.tau.ac.il",
    },
    {
      name: "Stephen Fleming",
      image: Steve,
      title: "Professor of Cognitive Neuroscience",
      text: "University College London",
      website: "https://metacoglab.org/",
    },
    {
      name: "Megan Peters",
      image: Megan,
      text: "Department of Cognitive Sciences, University of California Irvine",
      website: "	https://faculty.sites.uci.edu/cnclab",
    },
    {
      name: "Anil Seth",
      image: Anil,
      text: "Sussex Centre for Consciousness Science and Canadian Institute for Advanced Research, Program on Brain, Mind, and Consciousness",
      website: " www.anilseth.com",
    },
    {
      name: " Axel Cleeremans",
      image: Axel,
      title: "Director",
      text: "Center for Research in Cognition & Neurosciences, Université libre de Bruxelles (BELGIUM)",
      website: "	Axc.ulb.be, crcn.ulb.be",
    },
    {
      name: "Lucie Charles",
      image: LucieC,
      text: "	Department of Psychology, Queen Mary University of London",
      website: "	https://sites.google.com/site/luciecharlesneuro/home?pli=1",
    },
    {
      name: "Lucia Melloni",
      image: LuciaM,
      text: "Neural Circuits, Consciousness, and Cognition Research Group, Max Planck Institute for Empirical Aesthetics, Germany Department of Neurology, NYU Grossman School of Medicine, US",
      website:
        "	https://www.aesthetics.mpg.de/en/research/research-group-neural-circuits-consciousness-and-cognition.html ",
    },
    {
      name: "Ned Block",
      image: Ned,
      title: "Silver Professor",
      text: "Departments of Philosophy, Psychology, and Center for Neural Science New York University",
      website: "	https://www.nedblock.us",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center w-256 px-24 my-6 gap-5  gap-y-7 mx-auto">
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
