import React from "react";
import {
  CircledIndex,
  ExpandingBox,
  Text,
} from "../../../../sharedComponents/Reusble";
import { useQuery } from "@tanstack/react-query";
import { rawTextToShow } from "../../../../Utils/functions";
import FindingsTags from "../FindingsTags";
import {
  uploadPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../../../Utils/HardCoded";
import getUncontrastConfiguration from "../../../../apiHooks/getUncontrastConfiguration";

export default function ExperimentDetails({
  experiment,
  study,
  setPaperToShow,
}) {
  const { data, isSuccess } = useQuery(
    [`more_configurations`, "uncontrast"],
    getUncontrastConfiguration
  );
  const tasks = data?.data.available_tasks_types;
  const stimuliCategories = data?.data.available_stimulus_category_type;
  const stimuliModality = data?.data.available_stimulus_modality_type;
  const stimuliSubCategories = data?.data.available_stimulus_sub_category_type;
  const consciousnessMeasuresTypes =
    data?.data.available_consciousness_measure_type;
  const consciousnessMeasuresPhases =
    data?.data.available_consciousness_measure_phase_type;
  // available_consciousness_measure_sub_type
  const findingOptions = {
    outcomes: data?.dataavailable_outcomes_type,
  };
  const paradigmsWithFamily = data?.data.available_main_paradigm_type;

  return (
    <div className="w-1/2">
      {isSuccess && (
        <div
          className="experiments-details p-2 h-full shadow-3xl flex flex-col gap-2 overflow-y-scroll"
          style={{
            height: `calc(100vh - ${
              uploadPaperUsedHeight + uploadPaperPageTopSection + 10
            }px)`,
          }}>
          <div>
            <Text weight={"bold"} color={"grayReg"}>
              {study.title.slice(0, 20)}...
            </Text>
            <Text weight={"bold"} lg>
              {experiment.title}
            </Text>
          </div>
          <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
            <ExpandingBox
              headline={"Paradigms"}
              number={experiment?.paradigm ? 1 : 0}>
              <div
                key={experiment?.paradigm.name}
                className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={0} />
                <div className="w-full flex flex-col gap-2">
                  <div className="flex gap-2 items-start">
                    <div className="w-1/2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Main Paradigm
                      </Text>
                      <Text>
                        {" "}
                        {
                          paradigmsWithFamily?.find(
                            (x) => x.id === experiment?.paradigm.main
                          ).name
                        }{" "}
                      </Text>
                    </div>
                    <div className="w-1/2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Specific Paradigm
                      </Text>
                      <Text>{experiment?.paradigm.name}</Text>
                    </div>
                  </div>
                </div>
              </div>
            </ExpandingBox>

            <ExpandingBox
              headline={"Samples"}
              number={experiment.samples.length}>
              {experiment.samples.map((sample, index) => (
                <div
                  key={sample.type}
                  className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex gap-2 items-start justify-between px-2">
                      <div className=" flex flex-col ">
                        <Text weight={"bold"} color={"grayReg"}>
                          Type
                        </Text>
                        <Text>{rawTextToShow(sample.type)}</Text>
                      </div>
                      <div className="flex flex-col ">
                        <Text weight={"bold"} color={"grayReg"}>
                          Total
                        </Text>
                        <Text>{sample.total_size}</Text>
                      </div>
                      <div className="flex flex-col ">
                        <Text weight={"bold"} color={"grayReg"}>
                          Included
                        </Text>
                        <Text>{sample.size_included}</Text>
                      </div>
                      <div className="flex flex-col ">
                        <Text weight={"bold"} color={"grayReg"}>
                          Excluded
                        </Text>
                        <Text>{sample.size_excluded}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pl-2">
                <Text weight={"bold"} color={"grayReg"}>
                  Notes
                </Text>
                <Text>{experiment.sample_notes}</Text>
              </div>
            </ExpandingBox>
            <ExpandingBox headline={"Tasks"} number={experiment.tasks.length}>
              {experiment.tasks.map((task, index) => (
                <div
                  key={task + index}
                  className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex gap-2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Type
                      </Text>
                      <Text>{tasks.find((x) => x.id === task.type)?.name}</Text>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pl-2">
                <Text weight={"bold"} color={"grayReg"}>
                  Notes
                </Text>
                <Text>{experiment.tasks_notes}</Text>
              </div>
            </ExpandingBox>
            <ExpandingBox
              headline={"Suppressed Stimuli"}
              number={experiment.suppressed_stimuli.length}>
              {experiment.suppressed_stimuli.map((stimulus, index) => (
                <div
                  key={stimulus.category.name}
                  className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex w-full justify-between ">
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Category
                        </Text>
                        <Text sm>
                          {
                            stimuliCategories.find(
                              (row) => row.id === stimulus.category
                            )?.name
                          }
                        </Text>
                      </div>
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Sub-category
                        </Text>
                        <Text sm>
                          {stimuliSubCategories.find(
                            (row) => row.id === stimulus.sub_category
                          )?.name || "none"}
                        </Text>
                      </div>
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Modality
                        </Text>
                        <Text sm>
                          {
                            stimuliModality.find(
                              (row) => row.id === stimulus.modality
                            ).name
                          }
                        </Text>
                      </div>

                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Duration
                        </Text>
                        <Text sm>
                          {Number(stimulus.duration).toFixed() + " (ms)"}
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full justify-between ">
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Presentation Mode
                        </Text>
                        <Text sm>{stimulus.mode_of_presentation}</Text>
                      </div>
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Number of Stimuli
                        </Text>
                        <Text sm>{stimulus.number_of_stimuli}</Text>
                      </div>
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          SOA
                        </Text>
                        <Text sm>{stimulus.soa}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pl-2">
                <Text weight={"bold"} color={"grayReg"}>
                  Notes
                </Text>
                <Text>{experiment.stimuli_notes}</Text>
              </div>
            </ExpandingBox>
            <ExpandingBox
              headline={"Target Stimuli"}
              number={experiment.target_stimuli.length}>
              {experiment.target_stimuli.map((stimulus, index) => (
                <div
                  key={stimulus.category.name}
                  className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex w-full justify-between ">
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Category
                        </Text>
                        <Text sm>
                          {
                            stimuliCategories.find(
                              (row) => row.id === stimulus.category
                            )?.name
                          }
                        </Text>
                      </div>
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Sub-category
                        </Text>
                        <Text sm>
                          {stimuliSubCategories.find(
                            (row) => row.id === stimulus.sub_category
                          )?.name || "none"}
                        </Text>
                      </div>
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Modality
                        </Text>
                        <Text sm>
                          {
                            stimuliModality.find(
                              (row) => row.id === stimulus.modality
                            ).name
                          }
                        </Text>
                      </div>
                    </div>
                    <div className="flex w-full justify-between ">
                      <div>
                        <Text sm weight={"bold"} color={"grayReg"}>
                          Number of Stimuli
                        </Text>
                        <Text sm>{stimulus.number_of_stimuli}</Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pl-2">
                <Text weight={"bold"} color={"grayReg"}>
                  Notes
                </Text>
                <Text>{experiment.stimuli_notes}</Text>
              </div>
            </ExpandingBox>
            <ExpandingBox
              headline={"Consciousness Measures"}
              number={experiment.consciousness_measures.length}>
              {experiment.consciousness_measures.map((cm, index) => (
                <div
                  key={cm + index}
                  className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="w-full flex items-start">
                    <div className="w-full flex flex-col gap-2">
                      <div className="flex w-full gap-2">
                        <div className="w-1/2">
                          <Text weight={"bold"} color={"grayReg"}>
                            Type
                          </Text>
                          <Text>
                            {
                              consciousnessMeasuresTypes.find(
                                (row) => row.id === cm.type
                              )?.name
                            }
                          </Text>
                        </div>
                        <div className="w-1/2">
                          <Text weight={"bold"} color={"grayReg"}>
                            Phase
                          </Text>
                          <Text>
                            {" "}
                            {
                              consciousnessMeasuresPhases.find(
                                (row) => row.id === cm.phase
                              )?.name
                            }
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{" "}
              <div className="pl-2">
                <Text weight={"bold"} color={"grayReg"}>
                  Notes
                </Text>
                <Text>{experiment.consciousness_measures_notes}</Text>
              </div>
            </ExpandingBox>
          </div>
          <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
            <Text color="grayReg" weight={"bold"}>
              Findings
            </Text>
            {/* <ExpandingBox
              headline={"Experiment's Findings"}
              number={experiment.finding_tags.length}>
              <FindingsTags
                experiment={experiment}
                findingOptions={findingOptions}
              />
            </ExpandingBox> */}
          </div>
          <button
            className="font-bold my-2"
            onClick={() => {
              setPaperToShow(false);
            }}>
            Save & Close Experiment
          </button>
        </div>
      )}
    </div>
  );
}
