import { Field, Form, Formik } from "formik";
import {
  ExpandingBox,
  TooltipExplanation,
  Text,
  Button,
  ToastBox,
} from "../../../components/Reusble";
import * as Yup from "yup";
import Select from "react-select";
import {
  createExperiments,
  editExperiments,
} from "../../../apiHooks/createExperiment";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ReactComponent as Vicon } from "../../../assets/icons/v-icon.svg";
import {
  concsiousnessOptions,
  experimentTypeOptions,
  reportOptions,
  theoryDrivenOptions,
} from "../../../Utils/HardCoded";

export default function BasicClassification({
  study_id,
  disabled,
  experimentData,
  setExperimentID,
}) {
  const [submitted, setSubmitted] = useState(experimentData);
  const [experiment, setExperiment] = useState(false);

  const initialValues = {
    type_of_consciousness: experimentData?.type_of_consciousness || "",
    experiment_type: experimentData?.type || "",
    report: experimentData?.is_reporting || "",
    finding_description: experimentData?.finding_description || "",
    theory_driven: experimentData?.theory_driven || "",
  };

  const validationSchema = Yup.object().shape({
    type_of_consciousness: Yup.string().required(
      "Please select type of consciousness"
    ),
    experiment_type: Yup.string().required("Please select an experiment type"),
    report: Yup.string().required("Please select : 'Report'/'No Report'"),
    finding_description: Yup.string().required(
      "Please add finding descriptions"
    ),
    theory_driven: Yup.string().required("Please select type of theory driven"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await createExperiments({
        type_of_consciousness: values.type_of_consciousness,
        finding_description: values.finding_description,
        is_reporting: values.report,
        theory_driven: values.theory_driven,
        experiment_type: values.experiment_type,
        study_pk: study_id,
      });
      console.log(res);
      if (res.status === 201) {
        setExperimentID(res.data.id);
        setExperiment(res.data);
        setSubmitted(true);
        toast.success(
          <ToastBox
            headline={"New experiment was created successfully"}
            text={" Now you can add other classifications"}
          />
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async (values) => {
    console.log(values);
    try {
      const res = await editExperiments({
        type_of_consciousness: values.type_of_consciousness,
        finding_description: values.finding_description,
        is_reporting: values.report,
        theory_driven: values.theory_driven,
        experiment_type: values.experiment_type,
        study_pk: study_id,
        id: experiment.id || experimentData.id,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ExpandingBox disabled={disabled} headline={"Basic"}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ dirty, isValid, values, setFieldValue }) => (
          <Form className="flex flex-col gap-2">
            <div className=" flex flex-col gap-4 border border-blue border-x-4 p-2 rounded-md">
              <div className="flex items-center gap-2 w-full">
                <Text
                  weight={"bold"}
                  color={"grayReg"}
                  className={"whitespace-nowrap"}>
                  Experiment type
                </Text>
                <div className="w-full">
                  <Field
                    as="select"
                    id="experiment_type"
                    name="experiment_type"
                    className="text-base w-20 bg-white disabled:bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
                    {experimentTypeOptions.map((type) => (
                      <option key={`type-${type.value}`} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Field>
                </div>

                <TooltipExplanation
                  text={""}
                  tooltip={
                    "Was this experiment aimed at obtaining a neuroscientific result, a behavioral one, or both?"
                  }
                />
              </div>
              <div>
                <Text weight={"bold"} color={"grayReg"}>
                  Type of consciousness
                </Text>
                <div className="flex items-center gap-2">
                  <Field
                    as="select"
                    id="type_of_consciousness"
                    name="type_of_consciousness"
                    className="text-base w-full bg-white disabled:bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
                    {concsiousnessOptions.map((type) => (
                      <option
                        key={`concsiousness-${type.value}`}
                        value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Field>

                  <TooltipExplanation
                    tooltip={
                      "Did this experiment study the state, content, or both types of consciousness?"
                    }
                  />
                </div>{" "}
              </div>
              <div>
                <Text weight={"bold"} color={"grayReg"}>
                  Report/No report
                </Text>
                <div className="flex items-center gap-2">
                  <Field
                    as="select"
                    id="report"
                    name="report"
                    className="text-base w-full bg-white disabled:bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
                    {reportOptions.map((type) => (
                      <option key={`report-${type.value}`} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Field>
                  <TooltipExplanation
                    text={""}
                    tooltip={
                      "Did this experiment have a report paradigm, a no-report paradigm, or both?"
                    }
                  />
                </div>{" "}
              </div>
              <div>
                <Text weight={"bold"} color={"grayReg"}>
                  Theory driven
                </Text>
                <div className="flex items-center gap-2">
                  <Field
                    as="select"
                    id="theory_driven"
                    name="theory_driven"
                    placeholder="Select Theory "
                    className="text-base w-full bg-white disabled:bg-[#F2F2F2] border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
                    {theoryDrivenOptions.map((type) => (
                      <option
                        key={`theory_driven-${type.value}`}
                        value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Field>
                  <TooltipExplanation
                    text={""}
                    tooltip={
                      "Indicate if this study was theory driven? Theory-driven experiments should explicitly examine a hypothesis of at least one of the theories in their introduction. Experiments that mention the theories in the introduction without referring to a specific hypothesis tested in the experiment should be classified as “mentioning”. Experiments that only post-hoc interpreted the results according to one or more of the theories in the discussion should be classified as “post hoc”."
                    }
                  />
                </div>
              </div>
              <div>
                <Text weight={"bold"} color={"grayReg"}>
                  Finding description
                </Text>
                <div className="flex items-center gap-2">
                  <Field
                    id="finding_description"
                    name="finding_description"
                    as="textarea"
                    rows={4}
                    className="border border-gray-300 w-full rounded-[4px] p-2 "
                  />
                  <TooltipExplanation
                    tooltip={
                      "You can add here any additional comments you have, including dilemmas you had while classifying the paper"
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button
                type={!submitted ? "submit" : "button"}
                disabled={!dirty && submitted}
                onClick={() => submitted && handleEdit(values)}>
                <Vicon />
                {!submitted ? "Submit Experiment" : "Edit Basic classification"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ExpandingBox>
  );
}
