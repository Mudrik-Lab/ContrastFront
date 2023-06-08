import React from "react";

import { Text } from "../../components/Reusble";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "flowbite-react";
import { graphsHeaders } from "../../Utils/GraphsDetails";

export default function PapersIconsMenu() {
  const navigate = useNavigate();

  return (
    <div className="papers-visual-items w-full mt-8 sm:px-48">
      <div className=" mx-auto p-0 sm:p-4 flex flex-col items-center gap-6">
        <h1 className="text-4xl text-center">
          Conduct Queries And Visually Examine Trends In Empirical Papers
        </h1>
        <Text center weight="bold" lg>
          With A Range of Unique Data Visualization Tools:{" "}
        </Text>
        <div className="graphs-icons-box flex flex-wrap justify-center max-w-3xl mx-auto gap-8 mt-4">
          {graphsHeaders.map((paper) => (
            <div
              key={paper.text}
              className="flex flex-col w-24 items-center cursor-pointer p-2 hover:bg-grayLight"
              onClick={() => navigate(paper.route)}>
              <Tooltip content={paper.tooltip} trigger="hover">
                <div className="flex flex-col justify-start items-center gap-3">
                  {" "}
                  {paper.icon}
                  <p className="text-center leading-5">{paper.text}</p>
                </div>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
