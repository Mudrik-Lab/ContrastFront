import React from "react";
import { Text } from "../../components/Reusble";

export default function FindingsTags({ experiment }) {
  const Element = ({ headline, text }) => {
    return (
      <div className="flex gap-2">
        <div className="w-1/2">
          <Text weight={"bold"} color={"grayReg"}>
            {headline}
          </Text>
        </div>

        <div className="w-1/2">
          <Text>{text}</Text>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-wrap justify-between gap-y-2 ">
      {experiment.finding_tags.map((tag, index) => {
        return (
          <div
            className="flex w-[49%] items-start border border-blue border-x-4 p-2 rounded-md overflow-hidden"
            key={tag.family + index}>
            <div className="w-4">
              <Text weight={"bold"} color={"blue"}>
                {index + 1}
              </Text>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className=" w-full flex flex-col gap-2">
                <Element headline={"Technique"} text={tag.technique} />
                <Element headline={"Type"} text={tag.type} />
                <Element headline={"Family"} text={tag.family} />

                {tag.family === "Temporal" ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Element headline={"Onset"} text={tag.onset} />
                    <Element headline={"Offset"} text={tag.offset} />
                  </div>
                ) : tag.family === "Frequency" ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Element
                      headline={"Correlation sign"}
                      text={tag.correlation_sign}
                    />
                    <Element
                      headline={" Band lower bound"}
                      text={tag.band_lower_bound}
                    />
                    <Element
                      headline={"Band hiegher bound"}
                      text={tag.band_higher_bound}
                    />
                    <Element
                      headline={"Analysis type"}
                      text={tag.analysis_type}
                    />
                  </div>
                ) : tag.family === "Spatial Areas" ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Element
                      headline={" AAL atlas tag"}
                      text={tag.AAL_atlas_tag}
                    />
                  </div>
                ) : tag.family === "Miscellaneous" ? (
                  <Element headline={"Notes"} text={tag.notes} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
