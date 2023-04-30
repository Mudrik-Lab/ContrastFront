import React from "react";

import { Text } from "../../components/Reusble";
import { useNavigate } from "react-router-dom";

export default function PapersIconsMenu() {
  const navigate = useNavigate();

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
          {graphsHeaders.map((paper) => (
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
