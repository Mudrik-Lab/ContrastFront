import React from "react";
import {
  CircledIndex,
  ExpandingBox,
  Text,
} from "../../../../sharedComponents/Reusble";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../../../apiHooks/getExtraConfig";
import { rawTextToShow } from "../../../../Utils/functions";
import FindingsTags from "../FindingsTags";
import {
  interpretationTypes,
  uploadPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../../../Utils/HardCoded";

export default function ExperimentDetails({
  experiment,
  study,
  setPaperToShow,
}) {
  const { data: extraConfig, isSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  const tasks = extraConfig?.data.available_tasks_types;
  const stimuliCategories = extraConfig?.data.available_stimulus_category_type;
  const stimuliModality = extraConfig?.data.available_stimulus_modality_type;
  const stimuliSubCategories =
    extraConfig?.data.available_stimulus_sub_category_type;
  const measures = extraConfig?.data.available_measure_types;
  const consciousnessMeasuresTypes =
    extraConfig?.data.available_consciousness_measure_type;
  const consciousnessMeasuresPhases =
    extraConfig?.data.available_consciousness_measure_phase_type;
  const findingOptions = {
    techniques: extraConfig?.data.available_techniques,
    types: extraConfig?.data.available_finding_tags_types,
    families: extraConfig?.data.available_finding_tags_families,
  };
  const paradigmsWithFamily = extraConfig?.data.available_paradigms;
  const experimentTypeOptions = extraConfig?.data.available_experiment_types;

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
            <Text color="grayReg" weight={"bold"}>
              Experiment Classifications
            </Text>
            <ExpandingBox headline={"Basic Classifications"} number={1}>
              <div className=" border border-blue border-x-4 p-2 pl-6 rounded-md">
                <div className="flex">
                  <div className="w-1/2 flex flex-col items-start gap-2 ">
                    <div>
                      <Text weight={"bold"} color={"grayReg"}>
                        Experiment's Type
                      </Text>
                      <Text lg>
                        {
                          experimentTypeOptions.find(
                            (option) => option.value === experiment.type
                          ).name
                        }
                      </Text>
                    </div>
                    <div>
                      <Text weight={"bold"} color={"grayReg"}>
                        Type of consciousness
                      </Text>
                      <Text lg>{experiment.type_of_consciousness}</Text>
                    </div>
                  </div>

                  <div className="w-1/2 flex flex-col items-start gap-2 ">
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
                </div>
                <div>
                  <div className="w-1/2">
                    <Text weight={"bold"} color={"grayReg"}>
                      {experiment.theory_driven === "driven"
                        ? "Driven by the"
                        : "Mentoining the"}{" "}
                      theories:
                    </Text>

                    {experiment?.theory_driven_theories.map((theory) => (
                      <span key={theory}>{theory}, </span>
                    ))}
                  </div>
                </div>
              </div>
            </ExpandingBox>
            <ExpandingBox
              headline={"Paradigms"}
              number={experiment?.paradigms.length}>
              {experiment?.paradigms.map((paradigm, index) => {
                return (
                  <div
                    key={paradigm.name}
                    className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                    <CircledIndex index={index} />
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
                                (x) => x.name === paradigm.name
                              ).parent
                            }{" "}
                          </Text>
                        </div>
                        <div className="w-1/2">
                          <Text weight={"bold"} color={"grayReg"}>
                            Specific Paradigm
                          </Text>
                          <Text>{paradigm.name}</Text>
                        </div>
                        {paradigm.sub_type && (
                          <div className="w-1/2">
                            <Text weight={"bold"} color={"grayReg"}>
                              Sub-type
                            </Text>
                            <Text>{paradigm.sub_type}</Text>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
              headline={"Stimuli"}
              number={experiment.stimuli.length}>
              {experiment.stimuli.map((stimulus, index) => (
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
            <ExpandingBox
              headline={"Techniques"}
              number={experiment.techniques.length}>
              {experiment.techniques.map((technique, index) => (
                <div
                  key={technique + index}
                  className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="w-1/2">
                    <Text weight={"bold"} color={"grayReg"}>
                      Technique
                    </Text>
                    <Text>{technique.name}</Text>
                  </div>
                </div>
              ))}
            </ExpandingBox>

            <ExpandingBox
              headline={"Measures"}
              number={experiment.measures.length}>
              {experiment.measures.map((measure, index) => (
                <div
                  key={measure + index}
                  className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="w-full flex ">
                    <div className="w-1/2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Measures type
                      </Text>
                      <Text>
                        {measures.find((row) => row.id === measure.type)
                          ?.name || "none"}
                      </Text>
                    </div>
                    <div className="w-1/2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Notes
                      </Text>
                      <Text>{measure.notes}</Text>
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
            <ExpandingBox
              headline={"Experiment's Findings"}
              number={experiment.finding_tags.length}>
              <FindingsTags
                experiment={experiment}
                findingOptions={findingOptions}
              />
            </ExpandingBox>
            <ExpandingBox
              headline={"Interpretations"}
              number={experiment.interpretations.length}>
              {experiment.interpretations.map((interpretation, index) => (
                <div
                  key={interpretation.theory.name}
                  className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex gap-2 items-start px-2">
                      <div className="w-1/2">
                        <Text weight={"bold"} color={"grayReg"}>
                          Theory
                        </Text>
                        <Text>{interpretation.theory.name}</Text>
                      </div>
                      <div className="w-1/2">
                        <Text weight={"bold"} color={"grayReg"}>
                          Type
                        </Text>
                        <Text>
                          {
                            interpretationTypes.find(
                              (type) => type.value === interpretation?.type
                            ).label
                          }
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ExpandingBox>
            <ExpandingBox
              headline={"Results Summary"}
              number={experiment.results_summary && 1}>
              {experiment.results_summary && (
                <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <div className="w-full flex flex-col gap-2">
                    <Text>{experiment.results_summary}</Text>
                  </div>
                </div>
              )}
            </ExpandingBox>
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
