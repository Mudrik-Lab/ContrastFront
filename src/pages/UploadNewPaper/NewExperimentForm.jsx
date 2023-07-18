import React, { useState } from "react";
import {
  ExpandingBox,
  FilterExplanation,
  Spacer,
  Text,
  Button,
} from "../../components/Reusble";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../apiHooks/getExtraConfig";
import FindingsTags from "./FindingsTags";
import Select from "react-select";
import { ErrorMessage, Form, Formik } from "formik";
import { errorMsgClass } from "../../Utils/HardCoded";

export default function NewExperimentForm({ study }) {
  const [open, setOpen] = useState(false);
  const [paradigmValues, setParadigmValues] = useState([1]);
  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  console.log(extraConfig?.data);
  const handleSubmit = (values) => {
    console.log(values);
  };
  const handleAddParadigmField = () => {
    setParadigmValues([...paradigmValues, ""]);
  };
  const handleDeleteParadigmField = () => {
    setParadigmValues(paradigmValues.slice(0, -1));
  };
  const paradigmsFamilies = extraConfig?.data.available_paradigms_families.map(
    (family) => ({ value: family.id, label: family.name })
  );
  const paradigms = extraConfig?.data.available_paradigms;

  const initialValues = {
    type_of_consciousness: "",
    report: "",
    theory_driven: "",
  };
  return (
    <div className="p-2 h-full w-[49%] shadow-3xl flex flex-col gap-2">
      <div>
        <Text weight={"bold"} color={"grayReg"}>
          {study.title.slice(0, 20)}...
        </Text>
        <Text weight={"bold"} lg>
          experiment.title
        </Text>
      </div>
      <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
        <Text color="grayReg" weight={"bold"}>
          Experiment Classifications
        </Text>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({
            onSubmit,
            isSubmitting,
            dirty,
            isValid,
            values,
            setFieldValue,
          }) => (
            <Form className="flex flex-col gap-2">
              <ExpandingBox headline={"Basic"}>
                <div className=" flex flex-col gap-4 border border-blue border-x-4 p-2 rounded-md">
                  <div>
                    <Text weight={"bold"} color={"grayReg"}>
                      Type of consciousness
                    </Text>
                    <div className="flex items-center gap-2">
                      <Select
                        id="type_of_consciousness"
                        name="type_of_consciousness"
                        onChange={(v) =>
                          setFieldValue("type_of_consciousness", v)
                        }
                        placeholder="Select Type of Consciousness"
                        options={[
                          { vlaue: null, label: "" },
                          { value: "state", label: "State" },
                          { value: "content", label: "Content" },
                        ]}
                      />

                      <FilterExplanation text={""} tooltip={""} />
                    </div>{" "}
                  </div>
                  <div>
                    <Text weight={"bold"} color={"grayReg"}>
                      Report/No report
                    </Text>
                    <div className="flex items-center gap-2">
                      <Select
                        id="report"
                        name="report"
                        onChange={(v) => setFieldValue("report", v)}
                        placeholder="Select"
                        options={[
                          { vlaue: null, label: "" },
                          { value: "report", label: "Report" },
                          { value: "no-report", label: "No Report" },
                        ]}
                      />

                      <FilterExplanation text={""} tooltip={""} />
                    </div>{" "}
                  </div>
                  <div>
                    <Text weight={"bold"} color={"grayReg"}>
                      Theory driven
                    </Text>
                    <div className="flex items-center gap-2">
                      <Select
                        id="theory_driven"
                        name="theory_driven"
                        onChange={(v) => setFieldValue("theory_driven", v)}
                        placeholder="Select Theory "
                        options={[
                          { vlaue: null, label: "" },
                          { value: "driven", label: "Driven" },
                          { value: "mentioning", label: "Mentioning" },
                          { value: "post-hoc", label: "Post Hoc" },
                        ]}
                      />
                      <FilterExplanation text={""} tooltip={""} />
                    </div>
                  </div>
                  {/* <Button type="submit">Submit this level</Button> */}
                </div>
              </ExpandingBox>
              <ExpandingBox headline={"Paradigms"}>
                {paradigmValues.map((_, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-start  border border-blue border-x-4 p-2 rounded-md">
                    <div className="w-4">
                      <Text weight={"bold"} color={"blue"}>
                        {index + 1}
                      </Text>
                    </div>
                    <div className="w-full">
                      <Text weight={"bold"} color={"grayReg"}>
                        Main Paradigm
                      </Text>
                      <div className="flex items-center gap-2">
                        <Select
                          id={`paradigms_families${index}`}
                          name={`paradigms_families${index}`}
                          onChange={(v) =>
                            setFieldValue(`paradigms_families${index}`, v)
                          }
                          placeholder="Select paradigm family "
                          options={paradigmsFamilies}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <Text weight={"bold"} color={"grayReg"}>
                        Specific Paradigm
                      </Text>
                      <div className="flex items-center gap-2">
                        <Select
                          isDisabled={
                            !values[`paradigms_families${index}`]?.label
                          }
                          id={`paradigms${index}`}
                          name={`paradigms${index}`}
                          onChange={(v) => {
                            setFieldValue(`paradigms${index}`, v);
                          }}
                          placeholder="Select specific paradigm  "
                          options={paradigms
                            .filter(
                              (paradigm) =>
                                paradigm.parent ===
                                values[`paradigms_families${index}`]?.label
                            )
                            .map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))}
                        />

                        {index === paradigmValues.length - 1 && (
                          <button
                            type="button"
                            onClick={handleDeleteParadigmField}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash"
                              viewBox="0 0 16 16">
                              {" "}
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                              <path
                                fill-rule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />{" "}
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={handleAddParadigmField}>
                  Add paradigm
                </Button>
              </ExpandingBox>
              <div className="w-full flex justify-center">
                <Button type="submit" onClick={handleSubmit}>
                  Submit Experiment
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        {/* 
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
        <ExpandingBox headline={"Stimuli"}>
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

        <ExpandingBox headline={"Analysis Measures"}>
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
        </ExpandingBox> */}
      </div>
      {/* <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
        <Text color="grayReg" weight={"bold"}>
          Findings
        </Text>
        <ExpandingBox headline={"Findings"}>
          <FindingsTags experiment={experiment} />
        </ExpandingBox>
      </div> */}
    </div>
  );
}
// available_properties_by_family = {
//     "Temporal": ["onset", "offset"],
//     "Frequency": ["onset", "offset", "correlation_sign", "band_lower_bound", "band_higher_bound", "analysis_type"],
//     "Spatial Areas": ["AAL_atlas_tag"]
// }
