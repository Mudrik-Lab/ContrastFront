import React from "react";
import { CircledIndex, Text } from "../../components/Reusble";
import { ENUM } from "../../Utils/HardCoded";

export default function FindingsTags({ experiment, findingOptions }) {
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
            key={tag.type + index}>
            <div className="h-full flex items-center">
              <CircledIndex index={index} />
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <div className=" w-full flex flex-col gap-2">
                <Element
                  headline={"Technique"}
                  text={
                    findingOptions.techniques.find(
                      (row) => row.id === tag.technique
                    )?.name
                  }
                />
                <Element
                  headline={"Family"}
                  text={
                    findingOptions.families.find((row) => row.id === tag.family)
                      ?.name
                  }
                />
                <Element
                  headline={"Type"}
                  text={
                    findingOptions.types.find((row) => row.id === tag.type)
                      ?.name
                  }
                />

                {tag.family == ENUM.Temporal ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Element headline={"Onset"} text={tag.onset} />
                    <Element headline={"Offset"} text={tag.offset} />
                  </div>
                ) : tag.family == ENUM.Frequency ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Element headline={"Direction"} text={tag.direction} />
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
                ) : tag.family == ENUM.SpatialAreas ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Element
                      headline={" AAL atlas tag"}
                      text={tag.AAL_atlas_tag}
                    />
                  </div>
                ) : tag.family == ENUM.Miscellaneous ? (
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
