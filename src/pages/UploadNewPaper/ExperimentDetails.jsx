import React, { useState } from "react";
import { ExpandingBox, Spacer, Text } from "../../components/Reusble";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../apiHooks/getExtraConfig";
import { rawTextToShow } from "../../Utils/functions";
import FindingsTags from "./FindingsTags";

export default function ExperimentDetails({ experiment, study }) {
  const [open, setOpen] = useState(false);
  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );

  const paradigmsWithFamily = extraConfig?.data.available_paradigms;
  console.log(experiment);

  return (
    <div className="p-2 h-full w-[49%] shadow-3xl flex flex-col gap-2">
      <div>
        <Text weight={"bold"} color={"grayReg"}>
          {study.title.slice(0, 20)}...
        </Text>
        <Text weight={"bold"} lg>
          {experiment.title}
        </Text>
      </div>
      <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
        <Text color="grayReg" weight={"bold"}>
          Experiment Classifications
        </Text>
        <ExpandingBox headline={"Basic"}>
          <div className="flex items-start justify-between border border-blue border-x-4 p-2 rounded-md">
            <div>
              <Text weight={"bold"} color={"grayReg"}>
                Type of consciousness
              </Text>
              <Text lg>{experiment.type_of_consciousness}</Text>
            </div>
            <div>
              <Text weight={"bold"} color={"grayReg"}>
                Report/No report
              </Text>
              <Text lg>{experiment.is_reporting}</Text>
            </div>
            <div>
              <Text weight={"bold"} color={"grayReg"}>
                Theory driven
              </Text>
              <Text lg>{experiment.theory_driven}</Text>
            </div>
          </div>
        </ExpandingBox>
        <ExpandingBox headline={"Paradigms"}>
          {experiment.paradigms.map((paradigm, index) => (
            <div
              className="flex items-start border border-blue border-x-4 p-2 rounded-md"
              key={index + 1}>
              <div className="w-4">
                <Text weight={"bold"} color={"blue"}>
                  {index + 1}
                </Text>
              </div>
              <div className="w-1/2">
                <Text weight={"bold"} color={"grayReg"}>
                  Main Paradigm
                </Text>
                <Text>
                  {" "}
                  {
                    paradigmsWithFamily?.find((x) => x.name === paradigm).parent
                  }{" "}
                </Text>
              </div>
              <div className="w-1/2">
                <Text weight={"bold"} color={"grayReg"}>
                  Specific Paradigm
                </Text>
                <Text>{paradigm}</Text>
              </div>
            </div>
          ))}
        </ExpandingBox>
        <ExpandingBox headline={"Techniques"}>
          {experiment.techniques.map((technique, index) => (
            <div
              className="flex items-start border border-blue border-x-4 p-2 rounded-md"
              key={technique}>
              <div className="w-4">
                <Text weight={"bold"} color={"blue"}>
                  {index + 1}
                </Text>
              </div>
              <div className="w-1/2">
                <Text weight={"bold"} color={"grayReg"}>
                  Technique
                </Text>
                <Text>{technique}</Text>
              </div>
            </div>
          ))}
        </ExpandingBox>
        <ExpandingBox headline={"Stimulus"}>
          {experiment.stimuli.map((stimulus, index) => (
            <div
              className="flex items-start border border-blue border-x-4 p-2 rounded-md"
              key={index}>
              <div className="w-4">
                <Text weight={"bold"} color={"blue"}>
                  {index + 1}
                </Text>
              </div>
              <div className="flex w-full justify-between ">
                <div>
                  <Text sm weight={"bold"} color={"grayReg"}>
                    Category
                  </Text>
                  <Text sm>{stimulus.category}</Text>
                </div>
                <div>
                  <Text sm weight={"bold"} color={"grayReg"}>
                    Sub-category
                  </Text>
                  <Text sm>{stimulus.sub_category}</Text>
                </div>
                <div>
                  <Text sm weight={"bold"} color={"grayReg"}>
                    Modality
                  </Text>
                  <Text sm>{stimulus.modality}</Text>
                </div>
                {/* <div>
                  <Text sm weight={"bold"} color={"grayReg"}>
                    Description
                  </Text>
                  <Text sm>{stimulus.description}</Text>
                </div> */}
                <div>
                  <Text sm weight={"bold"} color={"grayReg"}>
                    Duration
                  </Text>
                  <Text sm>{Number(stimulus.duration).toFixed()}</Text>
                </div>
              </div>
            </div>
          ))}
        </ExpandingBox>
        <ExpandingBox headline={"Measures"}>
          {experiment.measures.map((measure, index) => (
            <div
              className="flex items-start border border-blue border-x-4 p-2 rounded-md"
              key={index}>
              <div className="w-4">
                <Text weight={"bold"} color={"blue"}>
                  {index + 1}
                </Text>
              </div>

              <div className="w-1/2">
                <Text weight={"bold"} color={"grayReg"}>
                  Measures type
                </Text>
                <Text>{measure.type}</Text>
              </div>
              <div className="w-1/2">
                <Text weight={"bold"} color={"grayReg"}>
                  Notes
                </Text>
                <Text>{measure.notes}</Text>
              </div>
            </div>
          ))}
        </ExpandingBox>
        <ExpandingBox headline={"Samples"}>
          {experiment.samples.map((sample, index) => (
            <div
              className="flex items-start border border-blue border-x-4 p-2 rounded-md"
              key={index}>
              <div className="w-4">
                <Text weight={"bold"} color={"blue"}>
                  {index + 1}
                </Text>
              </div>
              <div className="flex w-full justify-between">
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Type
                  </Text>
                  <Text>{rawTextToShow(sample.type)}</Text>
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Toatal
                  </Text>
                  <Text>{sample.total_size}</Text>
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Included
                  </Text>
                  <Text>{sample.size_included}</Text>
                </div>
              </div>
            </div>
          ))}
        </ExpandingBox>
        <ExpandingBox headline={"Tasks"}>
          {experiment.tasks.map((task, index) => (
            <div
              className="flex items-start border border-blue border-x-4 p-2 rounded-md"
              key={index}>
              <div className="w-4">
                <Text weight={"bold"} color={"blue"}>
                  {index + 1}
                </Text>
              </div>
              <div className="flex w-full justify-between gap-2">
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Type
                  </Text>
                  <Text>{task.type}</Text>
                </div>

                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Description
                  </Text>
                  <Text>{task.description}</Text>
                </div>
              </div>
            </div>
          ))}
        </ExpandingBox>
        <ExpandingBox headline={"Consciousness Measures"}>
          {experiment.consciousness_measures.map((cm, index) => (
            <div
              className="flex items-start border border-blue border-x-4 p-2 rounded-md"
              key={index}>
              <div className="w-4">
                <Text weight={"bold"} color={"blue"}>
                  {index + 1}
                </Text>
              </div>
              <div className="flex w-full justify-between gap-2">
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Type
                  </Text>
                  <Text>{cm.type}</Text>
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Phase
                  </Text>
                  <Text>{cm.phase}</Text>
                </div>

                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Description
                  </Text>
                  <Text>{cm.description}</Text>
                </div>
              </div>
            </div>
          ))}
        </ExpandingBox>
      </div>
      <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
        <Text color="grayReg" weight={"bold"}>
          Findings
        </Text>
        <ExpandingBox headline={"Findings"}>
          <FindingsTags experiment={experiment} />
        </ExpandingBox>
      </div>
    </div>
  );
}
// available_properties_by_family = {
//     "Temporal": ["onset", "offset"],
//     "Frequency": ["onset", "offset", "correlation_sign", "band_lower_bound", "band_higher_bound", "analysis_type"],
//     "Spatial Areas": ["AAL_atlas_tag"]
// }
