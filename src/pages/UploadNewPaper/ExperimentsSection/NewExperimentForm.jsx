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
  const [experimentID, setExperimentID] = useState();

  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );

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
  //
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

        <BasicClassification
          disabled={false}
          study_id={study.id}
          setExperimentID={setExperimentID}
        />

        <Paradigms
          study_pk={study.id}
          disabled={!experimentID}
          experiment_pk={experimentID}
          optionalParadigmsFamilies={paradigmsFamilies}
          optionalParadigms={paradigms}
        />

        <Interpretations
          study_id={study.id}
          disabled={!experimentID}
          experiment_pk={experimentID}
          theories={theories}
        />
        {/*  <Samples
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
              /> */}
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
// const initialValues = {
//   type_of_consciousness: "",
//   experiment_type: "",
//   report: "",
//   finding_description: "",
//   theory_driven: "",
//   sampels: [{ type: "", total: "", included: "" }],
//   paradigms: [{ main: "", specific: "" }],
//   tasks: [{ type: "", description: "" }],
//   techniques: [""],
//   measures: [{ type: "", notes: "" }],
//   stimulus: [
//     {
//       category: "",
//       sub_category: "",
//       modality: "",
//       description: "",
//       duration: "",
//     },
//   ],
//   analysis_measures: [{ type: "", pahse: "", description: "" }],
//   interpretations: [{ type: "", theory: "" }],
//   findings: [{ technique: "", type: "", family: "" }],
// };
