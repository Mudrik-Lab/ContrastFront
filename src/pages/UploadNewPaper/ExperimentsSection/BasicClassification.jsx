import { Field, Form, Formik } from "formik";
import {
  ExpandingBox,
  FilterExplanation,
  Spacer,
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
    console.log(values);
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
                    options={[
                      { vlaue: null, label: "" },
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                    ]}
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
                    onChange={(v) => setFieldValue("report", v.value)}
                    placeholder="Select"
                    options={[
                      { vlaue: null, label: "" },
                      { value: "report", label: "Report" },
                      { value: "no_report", label: "No Report" },
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
                    onChange={(v) => setFieldValue("theory_driven", v.value)}
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
              {!submitted ? (
                <Button type="submit" disabled={!(isValid && dirty)}>
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
              ) : (
                <Button
                  type="button"
                  disabled={!(isValid && dirty)}
                  onClick={() => handleEdit(values)}>
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
                  Edit Basic classification
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </ExpandingBox>
  );
}
