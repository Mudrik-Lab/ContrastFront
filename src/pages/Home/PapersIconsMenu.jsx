import React from "react";
import { ReactComponent as ParameterDist } from "../../assets/icons/parameter-distribution.svg";
import { ReactComponent as ParameterDist2 } from "../../assets/icons/parameter-distribution2.svg";
import { ReactComponent as TheoriesComparison } from "../../assets/icons/theories-comparison.svg";
import { ReactComponent as TheoryDriven } from "../../assets/icons/theory-driven.svg";
import { ReactComponent as ParameterTheory } from "../../assets/icons/parameter&theory.svg";
import { ReactComponent as Trends } from "../../assets/icons/trends.svg";
import { ReactComponent as Timing } from "../../assets/icons/timing.svg";
import { ReactComponent as Frequencies } from "../../assets/icons/frequencies.svg";
import { ReactComponent as Journals } from "../../assets/icons/journals.svg";
import { ReactComponent as AnatomicalFindings } from "../../assets/icons/anatomical-findings.svg";
import { ReactComponent as WorldMap } from "../../assets/icons/consciousness-world -map.svg";
import { Text } from "../../components/Reusble";
import { useNavigate } from "react-router-dom";

export default function PapersIconsMenu() {
  const navigate = useNavigate();
  const iconsButtons = [
    {
      text: "Parameter Distribution",
      icon: <ParameterDist />,
      route: "/parameter-distribution",
    },
    {
      text: "Theories Comparison",
      icon: <TheoriesComparison />,
      route: "/theories-comparison",
    },
    {
      text: "parameter-distribution-bar",
      icon: <ParameterDist2 />,
      route: "/parameter-distribution-bar",
    },
    {
      text: "Parameter & Theory Distribution",
      icon: <ParameterTheory />,
      route: "/parameter-distribution-pie",
    },
    {
      text: "Trends Across Time",
      icon: <Trends />,
      route: "/across-the-years",
    },
    {
      text: "Theory Driven",
      icon: <TheoryDriven />,
      route: "/theory-driven",
    },
    {
      text: "Timing",
      icon: <Timing />,
      route: "/timing",
    },
    {
      text: "Frequencies",
      icon: <Frequencies />,
      route: "/frequencies",
    },
    // {
    //   text: "Anatomical Findings",
    //   icon: <AnatomicalFindings />,
    //   route: "/",
    // },

    {
      text: "Journals",
      icon: <Journals />,
      route: "/",
    },
    {
      text: "Consciousness World Map",
      icon: <WorldMap />,
      route: "/",
    },
  ];

  return (
    <div className="papers-visual-items w-full mt-8 px-48">
      <div className=" mx-auto p-4 flex flex-col items-center gap-6">
        <h1 className="text-4xl">
          Conduct Queries And Visually Examine Trends In Empirical Papers
        </h1>
        <Text weight="bold" lg>
          With A Range OF Unique Data Visualization Tools:{" "}
        </Text>
        <div className="graphs-icons-box flex flex-wrap justify-center max-w-3xl mx-auto gap-8 mt-4">
          {iconsButtons.map((paper) => (
            <div
              id={paper.text}
              className="flex flex-col w-24 items-center cursor-pointer p-2 hover:bg-grayLight"
              onClick={() => navigate(paper.route)}>
              {paper.icon}
              <Text center>{paper.text}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
