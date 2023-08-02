import { Field, Form, Formik } from "formik";
import {
  ExpandingBox,
  FilterExplanation,
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
import { useState } from "react";
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
  experimentID,
  setExperimentID,
}) {
  const [submitted, setSubmitted] = useState(false);
  const [experiment, setExperiment] = useState(false);

  const initialValues = {
    type_of_consciousness: "",
    experiment_type: "",
    report: "",
    finding_description: "",
    theory_driven: "",
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
        id: experiment.id,
      });
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
        {({
          onSubmit,
          isSubmitting,
          dirty,
          isValid,
          values,
          setFieldValue,
        }) => (
          <Form className="flex flex-col gap-2">
            <div className=" flex flex-col gap-4 border border-blue border-x-4 p-2 rounded-md">
              <div className="flex items-center gap-2 w-full">
                <Text
                  weight={"bold"}
                  color={"grayReg"}
                  className={"whitespace-nowrap"}>
                  Experiment type
                </Text>
                <div className="w-28">
                  <Select
                    id="experiment_type"
                    name="experiment_type"
                    onChange={(v) => setFieldValue("experiment_type", v.value)}
                    options={experimentTypeOptions}
                  />
                </div>

                <FilterExplanation text={""} tooltip={""} />
              </div>
              <div>
                <Text weight={"bold"} color={"grayReg"}>
                  Type of consciousness
                </Text>
                <div className="flex items-center gap-2">
                  <Select
                    id="type_of_consciousness"
                    name="type_of_consciousness"
                    onChange={(v) =>
                      setFieldValue("type_of_consciousness", v.value)
                    }
                    placeholder="Select Type of Consciousness"
                    options={concsiousnessOptions}
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
                    onChange={(v) => setFieldValue("report", v.value)}
                    placeholder="Select"
                    options={reportOptions}
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
                    onChange={(v) => setFieldValue("theory_driven", v.value)}
                    placeholder="Select Theory "
                    options={theoryDrivenOptions}
                  />
                  <FilterExplanation text={""} tooltip={""} />
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
                  <FilterExplanation text={""} tooltip={""} />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button
                type={!submitted ? "submit" : "button"}
                disabled={!(isValid && dirty)}
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
