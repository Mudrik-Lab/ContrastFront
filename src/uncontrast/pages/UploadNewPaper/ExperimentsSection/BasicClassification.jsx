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
  createUncontrastExperiments,
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
    experiment_findings_notes: "",
    type: 1,
    is_target_same_as_suppressed_stimulus: "",
    is_target_stimulus: "",
    consciousness_measures_notes: "",
  });

  useEffect(() => {
    if (experimentData) {
      setValues({
        experiment_findings_notes: experimentData.experiment_findings_notes,
        type: experimentData.type,
        is_target_same_as_suppressed_stimulus:
          experimentData.is_target_same_as_suppressed_stimulus,
        is_target_stimulus: experimentData.is_target_stimulus,
        consciousness_measures_notes:
          experimentData.consciousness_measures_notes,
      });
    }
  }, []);
  const handleSubmit = async (values) => {
    try {
      const res = await createUncontrastExperiments({
        experiment_findings_notes: values.experiment_findings_notes,
        type: values.type,
        is_target_same_as_suppressed_stimulus:
          values.is_target_same_as_suppressed_stimulus,
        is_target_stimulus: values.is_target_stimulus,
        consciousness_measures_notes: values.consciousness_measures_notes,
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
        experiment_findings_notes: values.experiment_findings_notes,
        type: values.type,
        is_target_same_as_suppressed_stimulus:
          values.is_target_same_as_suppressed_stimulus,
        is_target_stimulus: values.is_target_stimulus,
        consciousness_measures_notes: values.consciousness_measures_notes,
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
                  console.log(values.experiment_type);
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
              is_target_same_as_suppressed_stimulus
            </Text>
            <div className="flex items-center gap-2">
              <Select
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
                id="is_target_same_as_suppressed_stimulus"
                value={concsiousnessOptions.find(
                  (x) => x.value == values.type_of_consciousness
                )}
                onChange={(selectedOption) => {
                  setValues((prev) => ({
                    ...prev,
                    is_target_same_as_suppressed_stimulus: selectedOption.value,
                  }));
                }}
                className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />

              <TooltipExplanation
                tooltip={"is_target_same_as_suppressed_stimulus?"}
              />
            </div>{" "}
          </div>
          <div>
            <Text weight={"bold"} color={"grayReg"}>
              is_target_stimulus
            </Text>
            <div className="flex items-center gap-2">
              <Select
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
                id="is_target_stimulus"
                value={concsiousnessOptions.find(
                  (x) => x.value == values.type_of_consciousness
                )}
                onChange={(selectedOption) => {
                  setValues((prev) => ({
                    ...prev,
                    is_target_stimulus: selectedOption.value,
                  }));
                }}
                className="text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              />

              <TooltipExplanation tooltip={"is_target_stimulus?"} />
            </div>{" "}
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
