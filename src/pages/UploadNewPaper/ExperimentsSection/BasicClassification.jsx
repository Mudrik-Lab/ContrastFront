import { Field, Form, Formik } from "formik";
import {
  ExpandingBox,
  TooltipExplanation,
  Text,
  Button,
  ToastBox,
  ToastErrorBox,
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
  reportOptions,
  theoryDrivenOptions,
} from "../../../Utils/HardCoded";
import MultiSelect from "../../../components/SelectField";

export default function BasicClassification({
  study_id,
  disabled,
  fieldOptions,
  experimentData,
  setExperimentID,
  theories,
}) {
  const [submitted, setSubmitted] = useState(experimentData);
  const [experiment, setExperiment] = useState(false);

  const initialValues = {
    type_of_consciousness: experimentData?.type_of_consciousness || "",
    experiment_type: experimentData?.type || "",
    report: experimentData?.is_reporting || "",
    theory_driven: experimentData?.theory_driven || "",
    theories: experimentData?.theory_driven_theories.map((theory) => ({
      values: theory,
      label: theory,
    })),
  };

  const validationSchema = Yup.object().shape({
    type_of_consciousness: Yup.string().required(
      "Please select type of consciousness"
    ),
    experiment_type: Yup.string().required("Please select an experiment type"),
    report: Yup.string().required("Please select : 'Report'/'No Report'"),

    theory_driven: Yup.string().required("Please select type of theory driven"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await createExperiments({
        type_of_consciousness: values.type_of_consciousness,
        theory_driven_theories: values.theories,
        is_reporting: values.report,
        theory_driven: values.theory_driven,
        experiment_type: values.experiment_type,
        study_pk: study_id,
      });
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
      toast.error(<ToastErrorBox errors={e?.response?.data} />);
    }
  };

  const handleEdit = async (values) => {
    try {
      const res = await editExperiments({
        type_of_consciousness: values.type_of_consciousness,
        is_reporting: values.report,
        theory_driven: values.theory_driven,
        experiment_type: values.experiment_type,
        theory_driven_theories: values.theories,
        study_pk: study_id,
        id: experiment.id || experimentData.id,
      });
      if (res.status === 201) {
        toast.success(
          <ToastBox
            headline={"Success"}
            text={"Experiment's basic classifications were updated "}
          />
        );
      }
      console.log(res);
    } catch (e) {
      toast.error(<ToastErrorBox errors={e?.response?.data} />);
    }
  };

  return (
    <ExpandingBox
      disabled={disabled}
      noNumber
      headline={"Basic Classifications"}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ dirty, isValid, values, setFieldValue }) => (
          <Form className="flex flex-col gap-2">
            <div className=" flex flex-col gap-4 border border-blue border-x-4 p-2 rounded-md">
              <div className="flex flex-col gap-2 w-full">
                <Text
                  weight={"bold"}
                  color={"grayReg"}
                  className={"whitespace-nowrap"}>
                  Experiment type
                </Text>
                <div className="flex gap-2 items-center w-full">
                  <Field
                    as="select"
                    id="experiment_type"
                    name="experiment_type"
                    className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
                    <option></option>
                    {fieldOptions.map((type) => (
                      <option key={`type-${type.value}`} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </Field>
                  <TooltipExplanation
                    text={""}
                    tooltip={
                      "Was this experiment aimed at obtaining a neuroscientific result, a behavioral one, or both?"
                    }
                  />
                </div>
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
                    className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
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
                    className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
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
                    className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
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
              {values.theory_driven === "mentioning" ||
                (values.theory_driven === "driven" && (
                  <div>
                    <Text weight={"bold"} color={"grayReg"}>
                      Theories
                    </Text>
                    <div className="flex items-center gap-2">
                      <Select
                        name="theories"
                        isClearable
                        value={values.theories}
                        onChange={(v) => setFieldValue("theories", v)}
                        placeholder="Theories"
                        isMulti={true}
                        component={MultiSelect}
                        options={theories}
                      />

                      <TooltipExplanation
                        text={""}
                        tooltip={
                          "Indicate if this study was theory driven? Theory-driven experiments should explicitly examine a hypothesis of at least one of the theories in their introduction. Experiments that mention the theories in the introduction without referring to a specific hypothesis tested in the experiment should be classified as “mentioning”. Experiments that only post-hoc interpreted the results according to one or more of the theories in the discussion should be classified as “post hoc”."
                        }
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-full flex justify-center">
              <Button
                type={!submitted ? "submit" : "button"}
                disabled={!dirty && submitted}
                onClick={() => submitted && handleEdit(values)}>
                <Vicon />
                {!submitted ? "Save Experiment" : "Save edit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ExpandingBox>
  );
}
