import {
  AddFieldButton,
  ExpandingBox,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
  Text,
  SubmitButton,
  AddFieldButtononEditbleField,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import {
  deleteClassificationField,
  EditClassificationFields,
  SubmitClassificationField,
} from "../../../../Utils/functions";
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";
import { Tooltip } from "flowbite-react";
import { ReactComponent as Edit } from "../../../../assets/icons/edit-icon.svg";
import classNames from "classnames";

export default function ConsciousnessMeasures({
  fieldOptions,
  analysisPhaseOptions,
  consciousnessMeasuresSubType,
  disabled,
  experiment_pk,
  study_pk,
  values,
  minimumClassifications,
  setMinimumClassifications,
}) {
  const isUncontrast = true;
  const initialValues = {
    type: "",
    sub_type: "",
    phase: "",
    number_of_trials: "",
    number_of_participants_in_awareness_test: "",
    is_cm_same_participants_as_task: "",
    is_performance_above_chance: "",
    is_trial_excluded_based_on_measure: "",
  };
  const [description, setDescription] = useState(
    values?.consciousness_measures_notes || ""
  );
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const [editble, setEditble] = useState([]);
  useEffect(() => {
    setEditble(Array(fieldValues.length).fill(false));
  }, [fieldValues.length]);

  const classificationName = "consciousness_measures";

  const OBJECTIVE_CASE_TOOLTIP =
    " Indicate which type of objective awareness measure was taken  (e.g., if the task performed on the suppressed stimuli is the same as the task performed on the non-suppressed stimuli, enter “high-level discrimination”). If more than one objective measure was taken, please reply for the one taken on a trial-by-trial basis";
  const SUBJECTIVE_CASE_TOOLTIP =
    "Indicate which type of subjective awareness measure was taken. If more than one subjective measure was taken, please reply for the one taken on a trial-by-trial basis";
  const OTHER_TYPE = "No sub type for the type you have chosen";
  const NO_TYPE = "For further instructions- first choose main type first";

  const handleSubmit = SubmitClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues,
    isUncontrast
  );

  const handleEdit = EditClassificationFields(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues
  );
  const handleDelete = deleteClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues,
    isUncontrast
  );

  useEffect(() => {
    if (values && values.consciousness_measures?.length > 0) {
      setFieldValues(
        values.consciousness_measures.map((row) => {
          return {
            type: row.type,
            sub_type: row.sub_type,
            phase: row.phase,
            number_of_trials: row.number_of_trials,
            number_of_participants_in_awareness_test:
              row.number_of_participants_in_awareness_test,
            is_cm_same_participants_as_task:
              row.is_cm_same_participants_as_task,
            is_performance_above_chance: row.is_performance_above_chance,
            is_trial_excluded_based_on_measure:
              row.is_trial_excluded_based_on_measure,

            id: row.id,
          };
        })
      );
    }
  }, []);

  function createSubTypes(index) {
    return [
      ...new Set(
        consciousnessMeasuresSubType
          .filter((subType) => subType.type == fieldValues[index].type)
          .map((row) => ({
            label: row.name,
            value: row.id,
          }))
      ),
    ];
  }

  const submitCondition = (index) => {
    return (
      fieldValues[index]?.type &&
      fieldValues[index]?.phase &&
      fieldValues[index]?.number_of_trials &&
      fieldValues[index]?.number_of_participants_in_awareness_test &&
      fieldValues[index]?.is_cm_same_participants_as_task !== "" &&
      fieldValues[index]?.is_performance_above_chance !== "" &&
      fieldValues[index]?.is_trial_excluded_based_on_measure !== "" &&
      (createSubTypes(index)?.length > 0 ? fieldValues[index]?.sub_type : true)
    );
  };
  const enableEdit = (index) => {
    setEditble((prevStates) =>
      prevStates.map((item, i) => (i === index ? !item : item))
    );
  };

  const fieldsNum = fieldValues.filter((field) => field.id)?.length;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      consciousnessMeasures: fieldsNum,
    });
  }, [fieldsNum]);
  const disableAddBttns =
    !fieldValues[fieldValues.length - 1].id ||
    !editble.every((field) => !Boolean(field));

  return (
    <ExpandingBox
      number={fieldsNum}
      disabled={disabled}
      headline={"Consciousness Measures"}>
      {fieldValues.map((fieldValue, index) => {
        const disableCondition = fieldValue.id && !editble[index];

        return (
          <div
            key={`${classificationName}-${index}-${
              fieldValue.id ? fieldValue.id : "new"
            }`}>
            <form className="flex flex-col gap-2">
              <div
                className={classNames(
                  "flex gap-2 items-center border  border-x-4 p-2 rounded-md",
                  editble[index] ? "border-flourishRed" : "border-blue"
                )}>
                <CircledIndex index={index} />
                <div className="flex flex-col gap-2 items-start w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-2">
                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Indicate which type of consciousness measure was taken. If no measure was administered, enter “None”. If more than one measure was administered fill this section separately for each measure (use the + button at the bottom to add more)."
                          }
                          text={"Type"}
                        />
                        <CustomSelect
                          disabled={disableCondition}
                          value={fieldValue.type}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].type = value;
                            setFieldValues(newArray);
                            // submitCondition(index) &&
                            //   handleSubmit(fieldValues, index);
                          }}
                          options={fieldOptions}
                        />
                      </div>
                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            fieldValue.type == 1
                              ? OBJECTIVE_CASE_TOOLTIP
                              : fieldValue.type == 2
                              ? SUBJECTIVE_CASE_TOOLTIP
                              : fieldValue.type > 2
                              ? OTHER_TYPE
                              : NO_TYPE
                          }
                          text={"Sub type"}
                        />
                        <CustomSelect
                          disabled={
                            disableCondition ||
                            createSubTypes(index)?.length === 0
                          }
                          value={fieldValue.sub_type}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].sub_type = value;
                            setFieldValues(newArray);
                            // submitCondition(index) &&
                            //   handleSubmit(fieldValues, index);
                          }}
                          options={createSubTypes(index)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <TooltipExplanation
                      isHeadline
                      tooltip={
                        "Indicate at which stage of the experiment the consciousness measure is taken."
                      }
                      text={"Phase"}
                    />
                    <CustomSelect
                      disabled={disableCondition}
                      value={fieldValue.phase}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].phase = value;
                        setFieldValues(newArray);
                        // submitCondition(index) &&
                        //   handleSubmit(fieldValues, index);
                      }}
                      options={analysisPhaseOptions}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-fulll">
                    <div className="flex gap-2 w-full items-center">
                      <div className="w-3/4">
                        <Text weight={"bold"} color={"grayReg"}>
                          Number of trials for the objective measure
                        </Text>
                      </div>
                      <div className="w-1/4 flex justify-between items-center gap-2">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            " Indicate how many trials were taken for the objective awareness measure"
                          }
                        />
                        <input
                          min={0}
                          disabled={disableCondition}
                          type="number"
                          value={fieldValue.number_of_trials}
                          onChange={(e) => {
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      number_of_trials: e.target.value,
                                    }
                                  : item
                              )
                            );
                          }}
                          // onBlur={() =>
                          //   submitCondition(index) &&
                          //   handleSubmit(fieldValues, index)
                          // }
                          // onKeyDown={(e) =>
                          //   e.key === "Enter" &&
                          //   submitCondition(index) &&
                          //   handleSubmit(fieldValues, index)
                          // }
                          className={`border w-full border-gray-300 rounded-md p-2 ${
                            disableCondition && "bg-grayDisable text-gray-400"
                          } `}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 w-full items-center">
                      <div className="w-3/4">
                        <Text weight={"bold"} color={"grayReg"}>
                          Number of participants in awareness test
                        </Text>
                      </div>
                      <div className="w-1/4 flex justify-between items-center gap-2">
                        <input
                          min={0}
                          disabled={disableCondition}
                          type="number"
                          value={
                            fieldValue.number_of_participants_in_awareness_test
                          }
                          onChange={(e) => {
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      number_of_participants_in_awareness_test:
                                        e.target.value,
                                    }
                                  : item
                              )
                            );
                          }}
                          // onBlur={() =>
                          //   submitCondition(index) &&
                          //   handleSubmit(fieldValues, index)
                          // }
                          // onKeyDown={(e) =>
                          //   e.key === "Enter" &&
                          //   submitCondition(index) &&
                          //   handleSubmit(fieldValues, index)
                          // }
                          className={`border w-full border-gray-300 rounded-md p-2 ${
                            disableCondition && "bg-grayDisable text-gray-400"
                          } `}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 w-full items-center">
                      <div className="w-3/4">
                        <Text weight={"bold"} color={"grayReg"}>
                          Same participants as the main task?
                        </Text>
                      </div>
                      <div className="w-1/4 flex justify-between items-center gap-2">
                        <CustomSelect
                          disabled={disableCondition}
                          value={fieldValue.is_cm_same_participants_as_task}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].is_cm_same_participants_as_task =
                              value;
                            setFieldValues(newArray);
                            // submitCondition(index) &&
                            //   handleSubmit(fieldValues, index);
                          }}
                          options={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 w-full items-center">
                      <div className="w-3/4">
                        <Text weight={"bold"} color={"grayReg"}>
                          Is performance above chance?
                        </Text>
                      </div>
                      <div className="w-1/4 flex justify-between items-center gap-2">
                        <CustomSelect
                          disabled={disableCondition}
                          value={fieldValue.is_performance_above_chance}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].is_performance_above_chance = value;
                            setFieldValues(newArray);
                            // submitCondition(index) &&
                            //   handleSubmit(fieldValues, index);
                          }}
                          options={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 w-full items-center">
                      <div className="w-3/4">
                        <Text weight={"bold"} color={"grayReg"}>
                          Is trial excluded based on measure?
                        </Text>
                      </div>
                      <div className="w-1/4 flex justify-between items-center gap-2">
                        <CustomSelect
                          disabled={disableCondition}
                          value={fieldValue.is_trial_excluded_based_on_measure}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].is_trial_excluded_based_on_measure =
                              value;
                            setFieldValues(newArray);
                            // submitCondition(index) &&
                            //   handleSubmit(fieldValues, index);
                          }}
                          options={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-r-2 border-blue h-24"></div>
                <div
                  className="flex flex-col items-center gap-1"
                  id="trash+submit">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  {!disableCondition && (
                    <SubmitButton
                      disabled={!submitCondition(index)}
                      submit={async () => {
                        if (!editble[index]) {
                          handleSubmit(fieldValues, index);
                        } else {
                          const res = await handleEdit(fieldValue, index);
                          res && enableEdit(index);
                        }
                      }}
                    />
                  )}
                  {disableCondition && (
                    <Tooltip animation content="Edit" trigger="hover">
                      <button
                        type="button"
                        onClick={() => {
                          enableEdit(index);
                        }}>
                        <Edit className="w-6 h-6" />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </form>
          </div>
        );
      })}
      <AddFieldButtononEditbleField
        fieldName={"consciousness-measures"}
        editble={editble}
        disableAddBttns={disableAddBttns}
        initialValues={initialValues}
        fieldValues={fieldValues}
        setFieldValues={setFieldValues}
      />
      <ExternalNotes
        rows={6}
        isUncontrast={isUncontrast}
        description={description}
        setDescription={setDescription}
        classification={classificationName}
        study_pk={study_pk}
        experiment_pk={experiment_pk}
      />
    </ExpandingBox>
  );
}
