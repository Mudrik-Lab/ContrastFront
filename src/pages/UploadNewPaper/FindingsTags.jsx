import React from "react";
import { Text } from "../../components/Reusble";

export default function FindingsTags({ experiment }) {
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
              <div className=" w-full ">
                <div className="flex gap-2">
                  <Text weight={"bold"} color={"grayReg"}>
                    Technique
                  </Text>
                  <Text>{tag.technique}</Text>
                </div>
                <div className="flex gap-2">
                  <Text weight={"bold"} color={"grayReg"}>
                    Type
                  </Text>
                  <Text>{tag.type}</Text>
                </div>
                <div className="flex gap-2">
                  <Text weight={"bold"} color={"grayReg"}>
                    Family
                  </Text>
                  <Text>{tag.family}</Text>
                </div>
                <div className="flex gap-2">
                  <Text weight={"bold"} color={"grayReg"}>
                    Notes
                  </Text>
                  <Text>{tag.notes}</Text>
                </div>
                <div className="flex gap-2">
                  <Text weight={"bold"} color={"grayReg"}>
                    Type
                  </Text>
                  <Text>{tag.type}</Text>
                </div>
                {tag.family === "Temporal" ? (
                  <div>
                    <div className="flex gap-2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Onset
                      </Text>
                      <Text>{tag.onset}</Text>
                    </div>
                    <div className="flex gap-2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Offset
                      </Text>
                      <Text>{tag.offset}</Text>
                    </div>
                  </div>
                ) : tag.family === "Frequency" ? (
                  <div>
                    <div className="flex gap-2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Correlation sign
                      </Text>
                      <Text>{tag.correlation_sign}</Text>
                    </div>
                    <div className="flex gap-2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Band lower bound
                      </Text>
                      <Text>{tag.band_lower_bound}</Text>
                    </div>
                    <div className="flex gap-2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Band hiegher bound
                      </Text>
                      <Text>{tag.band_higher_bound}</Text>
                    </div>
                    <div className="flex gap-2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Analysis type
                      </Text>
                      <Text>{tag.analysis_type}</Text>
                    </div>
                  </div>
                ) : tag.family === "Spatial Areas" ? (
                  <div>
                    <div className="flex gap-2">
                      <Text weight={"bold"} color={"grayReg"}>
                        AAL_atlas_tag
                      </Text>
                      <Text>{tag.AAL_atlas_tag}</Text>
                    </div>
                  </div>
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
