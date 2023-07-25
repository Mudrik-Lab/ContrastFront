import React, { useState } from "react";
import {
  ExpandingBox,
  FilterExplanation,
  Spacer,
  Text,
  Button,
  ButtonReversed,
  WhiteButton,
} from "../../../components/Reusble";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../../apiHooks/getExtraConfig";
import FindingsTags from "../FindingsTags";
import Select from "react-select";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { errorMsgClass } from "../../../Utils/HardCoded";
import BasicClassification from "./BasicClassification";
import { rawTextToShow } from "../../../Utils/functions";
import createExperiments from "../../../apiHooks/createExperiment";
import Samples from "./Samples";
import Paradigms from "./Paradigms";
import Tasks from "./Tasks";
import Stimulus from "./Stimulus";
import Techniques from "./Techniques";
import Measures from "./Measures";
import AnalysisMeasures from "./AnalysisMeasures";
import Interpretations from "./Interpretations";
import Findings from "./Findings";

export default function NewExperimentForm({ study }) {
  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );

  const initialValues = {
    type_of_consciousness: "",
    report: "",
    theory_driven: "",
    sampels: [{ type: "", total: "", included: "" }],
    paradigms: [{ main: "", specific: "" }],
    tasks: [{ type: "", description: "" }],
    techniques: [""],
    measures: [{ type: "", notes: "" }],
    stimulus: [
      {
        category: "",
        sub_category: "",
        modality: "",
        description: "",
        duration: "",
      },
    ],
    analysis_measures: [{ type: "", pahse: "", description: "" }],
    interpretations: [{ type: "", theory: "" }],
    findings: [{ technique: "", type: "", family: "" }],
  };
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
    (family) => ({ value: family.name, label: family.name })
  );
  const populations = extraConfig?.data.available_populations_types.map(
    (population) => ({ value: population, label: rawTextToShow(population) })
  );
  const tasks = extraConfig?.data.available_tasks_types.map((task) => ({
    value: task.id,
    label: task.name,
  }));
  const paradigms = extraConfig?.data.available_paradigms;
  const stimulusCategories =
    extraConfig?.data.available_stimulus_category_type.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })); // name,id
  const stimulusSubCategories =
    extraConfig?.data.available_stimulus_sub_category_type; //name, id, parent(by id number)
  const stimulusModalities =
    extraConfig?.data.available_stimulus_modality_type.map((modality) => ({
      value: modality.id,
      label: modality.name,
    })); // name, id
  const techniquesOptions = extraConfig?.data.available_techniques.map(
    (tech) => ({
      value: tech.id,
      label: tech.name,
    })
  );
  const measuresOptions = extraConfig?.data.available_measure_types?.map(
    (measure) => ({
      value: measure.id,
      label: measure.name,
    })
  );

  const analysisPhaseOptions =
    extraConfig?.data.available_consciousness_measure_phase_type?.map(
      (measure) => ({
        value: measure.id,
        label: measure.name,
      })
    );
  const analysisMeasuresOptions =
    extraConfig?.data.available_consciousness_measure_type?.map((measure) => ({
      value: measure.id,
      label: measure.name,
    }));

  const theories = extraConfig?.data.available_theories?.map((theory) => ({
    value: theory.name,
    label: theory.name,
  }));
  const findingTypes = extraConfig?.data.available_finding_tags_types?.map(
    (type) => ({
      value: type.id,
      label: type.name,
      family: type.family,
    })
  );
  const findingTagsFamilies =
    extraConfig?.data.available_finding_tags_families?.map((type) => ({
      value: type.id,
      label: type.name,
    }));
  // console.log(study);
  return (
    <div className="p-2 h-full w-[49%] shadow-3xl flex flex-col gap-2">
      <div>
        <Text weight={"bold"} color={"grayReg"}>
          {study.title.slice(0, 20)}...
        </Text>
        <Text weight={"bold"} lg>
          {`Experiment#${study.experiments.length + 1}`}
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
              <Paradigms
                values={values}
                setFieldValue={setFieldValue}
                optionalParadigmsFamilies={paradigmsFamilies}
                optionalParadigms={paradigms}
              />
              <Interpretations
                values={values}
                setFieldValue={setFieldValue}
                theories={theories}
              />
              <Samples
                values={values}
                setFieldValue={setFieldValue}
                populations={populations}
              />
              <Tasks
                values={values}
                setFieldValue={setFieldValue}
                tasksOptions={tasks}
              />
              <Stimulus
                values={values}
                setFieldValue={setFieldValue}
                modalities={stimulusModalities}
                categories={stimulusCategories}
                subCaotegories={stimulusSubCategories}
              />
              <Techniques
                values={values}
                setFieldValue={setFieldValue}
                techniquesOptions={techniquesOptions}
              />
              <Measures
                values={values}
                setFieldValue={setFieldValue}
                measuresOptions={measuresOptions}
              />
              <AnalysisMeasures
                values={values}
                setFieldValue={setFieldValue}
                analysisMeasuresOptions={analysisMeasuresOptions}
                analysisPhaseOptions={analysisPhaseOptions}
              />

              <Button type="submit">Submit</Button>

              {/* <div className="w-full flex justify-center">
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
              </div> */}
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex flex-col gap-2 p-2 border border-black rounded-md ">
        <Text color="grayReg" weight={"bold"}>
          Findings
        </Text>

        <Findings
          options={{ techniquesOptions, findingTagsFamilies, findingTypes }}
        />
      </div>
    </div>
  );
}

// available_properties_by_family = {
//     "Temporal": ["onset", "offset"],
//     "Frequency": ["onset", "offset", "correlation_sign", "band_lower_bound", "band_higher_bound", "analysis_type"],
//     "Spatial Areas": ["AAL_atlas_tag"]
// }
