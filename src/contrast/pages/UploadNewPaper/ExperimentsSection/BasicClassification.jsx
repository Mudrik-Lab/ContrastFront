import {
  ExpandingBox,
  TooltipExplanation,
  Text,
  Button,
  ToastBox,
} from "../../../../sharedComponents/Reusble";
import Select from "react-select";
import {
  createExperiments,
  editExperiments,
} from "../../../../apiHooks/createExperiment";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ReactComponent as Vicon } from "../../../../assets/icons/v-icon.svg";
import {
  concsiousnessOptions,
  reportOptions,
  theoryDrivenOptions,
} from "../../../../Utils/HardCoded";
import MultiSelect from "../../../../sharedComponents/SelectField";
import { ToastError } from "../../../../Utils/functions";

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
  const [values, setValues] = useState({
    type_of_consciousness: "",
    experiment_type: "",
    report: "",
    theory_driven: "",
    theories: [],
  });
  useEffect(() => {
    if (experimentData) {
      setValues({
        type_of_consciousness: experimentData?.type_of_consciousness,
        experiment_type: experimentData?.type,
        report: experimentData?.is_reporting,
        theory_driven: experimentData?.theory_driven,
        theories: experimentData?.theory_driven_theories.map((theory) => ({
          values: theory,
          label: theory,
        })),
      });
    }
  }, []);
  let filteredTheories = theories;
  if (experimentData?.theory_driven_theories?.length > 0) {
    filteredTheories = theories.filter(
      (item1) => !values.theories.some((item2) => item2.label === item1.label)
    );
  }

  console.log(theories);
  console.log(values.theories);
  console.log(filteredTheories);
  const handleSubmit = async (values) => {
    try {
      const res = await createExperiments({
        type_of_consciousness: values.type_of_consciousness,
        theory_driven_theories: values.theories?.map((theory) => theory.label),
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
      ToastError(e);
    }
  };

  const handleEdit = async (values) => {
    try {
      const res = await editExperiments({
        type_of_consciousness: values.type_of_consciousness,
        is_reporting: values.report,
        theory_driven: values.theory_driven,
        experiment_type: values.experiment_type,
        theory_driven_theories: values.theories.map((theory) => theory.label),
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
    } catch (e) {
      ToastError(e);
    }
  };
  return (
    <ExpandingBox
      disabled={disabled}
      noNumber
      headline={"Basic Classifications"}>
      <form className="flex flex-col gap-2">
        <div className=" flex flex-col gap-4 border border-blue border-x-4 p-2 rounded-md">
          <div className="flex flex-col gap-2 w-full">
            <Text
              weight={"bold"}
              color={"grayReg"}
              className={"whitespace-nowrap"}>
              Experiment type
            </Text>
            <div className="flex gap-2 items-center w-full">
              <Select
                options={fieldOptions}
                id="experiment_type"
                value={fieldOptions.find(
                  (x) => x.value == values.experiment_type
                )}
                onChange={(selectedOption) => {
                  setValues((prev) => ({
                    ...prev,
                    experiment_type: selectedOption.value,
                  }));
                }}
                className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />
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
              <Select
                options={concsiousnessOptions}
                id="type_of_consciousness"
                value={concsiousnessOptions.find(
                  (x) => x.value == values.type_of_consciousness
                )}
                onChange={(selectedOption) => {
                  setValues((prev) => ({
                    ...prev,
                    type_of_consciousness: selectedOption.value,
                  }));
                }}
                className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />

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
              <Select
                options={reportOptions}
                id="report"
                value={reportOptions.find((x) => x.value == values.report)}
                onChange={(selectedOption) => {
                  setValues((prev) => ({
                    ...prev,
                    report: selectedOption.value,
                  }));
                }}
                className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />

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
              <Select
                options={theoryDrivenOptions}
                id="theory_driven"
                value={theoryDrivenOptions.find(
                  (x) => x.value == values.theory_driven
                )}
                onChange={(selectedOption) => {
                  setValues((prev) => ({
                    ...prev,
                    theory_driven: selectedOption.value,
                  }));
                }}
                className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />

              <TooltipExplanation
                text={""}
                tooltip={
                  "Indicate if this study was theory driven? Theory-driven experiments should explicitly examine a hypothesis of at least one of the theories in their introduction. Experiments that mention the theories in the introduction without referring to a specific hypothesis tested in the experiment should be classified as “mentioning”. Experiments that only post-hoc interpreted the results according to one or more of the theories in the discussion should be classified as “post hoc”."
                }
              />
            </div>
          </div>

          {(values.theory_driven === "mentioning" ||
            values.theory_driven === "driven") && (
            <div>
              <Text weight={"bold"} color={"grayReg"}>
                Theories
              </Text>
              <div className="flex items-center gap-2">
                <Select
                  isClearable
                  value={values.theories}
                  onChange={(selectedOption) => {
                    setValues((prev) => ({
                      ...prev,
                      theories: selectedOption,
                    }));
                  }}
                  placeholder="Theories"
                  isMulti={true}
                  component={MultiSelect}
                  options={filteredTheories}
                />

                <TooltipExplanation
                  text={""}
                  tooltip={
                    "Indicate if this study was theory driven? Theory-driven experiments should explicitly examine a hypothesis of at least one of the theories in their introduction. Experiments that mention the theories in the introduction without referring to a specific hypothesis tested in the experiment should be classified as “mentioning”. Experiments that only post-hoc interpreted the results according to one or more of the theories in the discussion should be classified as “post hoc”."
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-center">
          <Button
            type="button"
            onClick={() =>
              submitted ? handleEdit(values) : handleSubmit(values)
            }>
            <Vicon />
            {!submitted ? "Save Experiment" : "Save edit"}
          </Button>
        </div>
      </form>
    </ExpandingBox>
  );
}
