import React from "react";
import { CircledIndex, Text } from "../../../sharedComponents/Reusble";

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
  const families = findingOptions?.families.reduce((result, item) => {
    result[item.name] = item.id;
    return result;
  }, {});

  return (
    <div className="flex flex-wrap justify-between gap-y-2 ">
      {experiment.finding_tags.map((tag, index) => {
        return (
          <div
            className="flex w-[49%] items-start border border-blue border-x-4 p-2 rounded-md overflow-hidden"
            key={tag.id}>
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

                <Element
                  headline={"Is NCC?"}
                  text={tag.is_NCC ? "Yes" : "No"}
                />
                {tag.family == families["Temporal"] ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Element headline={"Onset"} text={tag.onset} />
                    <Element headline={"Offset"} text={tag.offset} />
                  </div>
                ) : tag.family == families["Frequency"] ? (
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
                ) : tag.family == families["Spatial Areas"] ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Element
                      headline={" AAL atlas tag"}
                      text={tag.AAL_atlas_tag}
                    />
                  </div>
                ) : tag.family == families["Miscellaneous"] ? (
                  <Element headline={"Notes"} text={tag.notes} />
                ) : (
                  <></>
                )}
                {tag.notes && <Element headline={"Notes"} text={tag.notes} />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
