import React, { useState } from "react";
import {
  ExpandingBox,
  FilterExplanation,
  Spacer,
  Text,
  Button,
} from "../../../components/Reusble";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../../apiHooks/getExtraConfig";
import FindingsTags from "../FindingsTags";
import Select from "react-select";
import { ErrorMessage, Form, Formik } from "formik";
import { errorMsgClass } from "../../../Utils/HardCoded";
import BasicClassification from "./BasicClassification";
import ParadigmsComponent from "./ParadigmsComponent";
import SamplesComponent from "./SamplesComponent";
import { rawTextToShow } from "../../../Utils/functions";
import createExperiments from "../../../apiHooks/createExperiment";

export default function NewExperimentForm({ study }) {
  const [open, setOpen] = useState(false);
  const [paradigmValues, setParadigmValues] = useState([1]);
  const [samplesValues, setSamplesValues] = useState([1]);

  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  console.log(extraConfig?.data);
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const res = await createExperiments({
        consciousness_measures: {},
        finding_description: "",
        interpretations: {},
        is_reporting: "",
        measures: {},
        notes: "",
        paradigms: [],
        samples: {},
        stimuli: {},
        tasks: {},
        techniques: [],
        theory_driven: "",
        theory_driven_theories: [],
        finding_tags: {},
        type: 12,
        study_pk: study.id,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const paradigmsFamilies = extraConfig?.data.available_paradigms_families.map(
    (family) => ({ value: family.id, label: family.name })
  );
  const populations = extraConfig?.data.available_populations_types.map(
    (population) => ({ value: population, label: rawTextToShow(population) })
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
              <BasicClassification setFieldValue={setFieldValue} />
              <ParadigmsComponent
                setFieldValue={setFieldValue}
                paradigmsFamilies={paradigmsFamilies}
                values={values}
                paradigms={paradigms}
                paradigmValues={paradigmValues}
                setParadigmValues={setParadigmValues}
              />
              <SamplesComponent
                setFieldValue={setFieldValue}
                paradigmsFamilies={populations}
                values={values}
                populations={populations}
                samplesValues={samplesValues}
                setSamplesValues={setSamplesValues}
              />
              <div className="w-full flex justify-center">
                <Button type="submit" onClick={handleSubmit}>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1221_7195)">
                      <path
                        d="M10.7533 5.34351L7.45445 9.54666L5.56082 7.65212L5.56093 7.65201L5.55443 7.64596C5.36486 7.46932 5.11413 7.37315 4.85507 7.37772C4.596 7.38229 4.34882 7.48724 4.1656 7.67046C3.98238 7.85368 3.87743 8.10086 3.87286 8.35993C3.86829 8.61899 3.96446 8.86972 4.1411 9.05929L4.14098 9.0594L4.14719 9.0656L6.79319 11.7126L6.79338 11.7128C6.88843 11.8077 7.0016 11.8824 7.12616 11.9326C7.25072 11.9828 7.38411 12.0074 7.51838 12.0049C7.65264 12.0024 7.78503 11.9729 7.90765 11.9181C8.03026 11.8634 8.14059 11.7845 8.23205 11.6861L8.2384 11.6793L8.24422 11.672L12.2296 6.6903C12.4057 6.50263 12.5028 6.25412 12.5004 5.99644C12.4979 5.73468 12.3929 5.48434 12.2079 5.29916L12.1346 5.22586H12.1248C12.0487 5.16502 11.9639 5.11551 11.873 5.07906C11.7483 5.02898 11.6147 5.00458 11.4802 5.00732C11.3458 5.01006 11.2133 5.03988 11.0907 5.095C10.968 5.15012 10.8578 5.2294 10.7665 5.32811L10.7596 5.33554L10.7533 5.34351ZM15.75 8.50586C15.75 10.5613 14.9335 12.5325 13.4801 13.9859C12.0267 15.4393 10.0554 16.2559 8 16.2559C5.94457 16.2559 3.97333 15.4393 2.51992 13.9859C1.06652 12.5325 0.25 10.5613 0.25 8.50586C0.25 6.45043 1.06652 4.47919 2.51992 3.02578C3.97333 1.57238 5.94457 0.755859 8 0.755859C10.0554 0.755859 12.0267 1.57238 13.4801 3.02578C14.9335 4.47919 15.75 6.45043 15.75 8.50586Z"
                        fill="white"
                      />
                    </g>
                  </svg>
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
