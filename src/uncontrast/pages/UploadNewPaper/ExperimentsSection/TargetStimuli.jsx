import {
  ExpandingBox,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  SubmitButton,
  Button,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import {
  deleteClassificationField,
  SubmitClassificationField,
  EditClassificationFields,
  rawTextToShow,
  yesNoInputValue,
} from "../../../../Utils/functions";
import { Tooltip } from "flowbite-react";
import { ReactComponent as Edit } from "../../../../assets/icons/edit-icon.svg";
import classNames from "classnames";

export default function TargetStimuli({
  fieldOptions,
  subCategories,
  modalities,
  disabled,
  experiment_pk,
  study_pk,
  values,
  suppressed_stimulus,
  suppressedValues,
}) {
  const isUncontrast = true;
  const initialValues = {
    is_target_same_as_suppressed_stimulus: "",
    category: "",
    sub_category: "",
    modality: "",
    number_of_stimuli: "",
    suppressed_stimulus,
  };
  const [fieldValues, setFieldValues] = useState(initialValues);
  const [editble, setEditble] = useState(false);

  const classificationName = "target_stimuli";

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
    if (values && values.target_stimuli?.length > 0) {
      const targetValues = values.target_stimuli.find(
        (row) => row.suppressed_stimulus === suppressed_stimulus
      );
      if (targetValues) {
        setFieldValues({
          category: targetValues.category,
          sub_category: targetValues.sub_category,
          modality: targetValues.modality,
          number_of_stimuli: targetValues.number_of_stimuli,
          is_target_same_as_suppressed_stimulus:
            targetValues.is_target_same_as_suppressed_stimulus ? "yes" : "no",
          id: targetValues.id,
          suppressed_stimulus: suppressed_stimulus,
        });
      }
    }
  }, []);

  function creatSubOptions() {
    return [
      ...new Set(
        subCategories.filter((sub) => sub.parent == fieldValues.category)
      ),
    ];
  }
  const submitCondition = () => {
    if (fieldValues.is_target_same_as_suppressed_stimulus === "no") {
      return (
        // fix
        fieldValues.category &&
        fieldValues.modality &&
        fieldValues.number_of_stimuli &&
        (creatSubOptions().length > 0 ? fieldValues.sub_category : true)
      );
    } else if (fieldValues.is_target_same_as_suppressed_stimulus === "yes")
      return true;
  };
  const enableEdit = () => {
    setEditble(!editble);
  };
  const disableCondition = fieldValues.id && !editble;
  return (
    <ExpandingBox
      noNumber
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      <div>
        <div className="flex flex-col gap-2">
          <div
            className={classNames(
              "flex gap-2 items-center border  border-x-4 p-2 rounded-md",
              editble ? "border-flourishRed" : "border-blue"
            )}>
            <div className="flex flex-col gap-2 w-full">
              <div>
                <div className="flex items-start gap-2">
                  <div className="flex gap-2 w-full items-center">
                    <div className="w-2/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Is the non-suppressed stimulus the same as the
                        suppressed stimulus?
                      </Text>
                    </div>
                    <div className="w-1/3 flex justify-between items-center gap-2">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "In most experiments, participants are asked to respond to non suppressed stimuli. If this is the case, enter “yes”"
                        }
                      />
                      <CustomSelect
                        disabled={disableCondition}
                        value={yesNoInputValue(
                          fieldValues.is_target_same_as_suppressed_stimulus
                        )}
                        onChange={(value) => {
                          const newObj = { ...fieldValues };
                          newObj.is_target_same_as_suppressed_stimulus = value;
                          newObj.suppressed_stimulus = suppressed_stimulus;
                          if (value === "yes") {
                            newObj.category = suppressedValues.category;
                            newObj.sub_category = suppressedValues.sub_category;
                            newObj.modality = suppressedValues.modality;
                            newObj.number_of_stimuli =
                              suppressedValues.number_of_stimuli;
                            setFieldValues(newObj);
                            handleSubmit(newObj, 0);
                            setEditble(false);
                          } else {
                            setFieldValues(newObj);
                            submitCondition() && handleSubmit(fieldValues, 0);
                          }
                        }}
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                        ]}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Text center weight={"bold"}>
                    {" "}
                    Non Suppressed Stimuli
                  </Text>
                  <div className="flex items-start gap-2 mt-2">
                    <div className="w-full flex gap-2 items-start">
                      <div className="w-full">
                        <div className="flex gap-1 items-center">
                          <Text weight={"bold"} color={"grayReg"}>
                            Category
                          </Text>
                          <TooltipExplanation
                            isHeadline
                            tooltip={
                              "Indicate the category of the non-suppressed stimuli used in the experiment. You may choose more than one option"
                            }
                          />
                        </div>

                        <CustomSelect
                          disabled={disableCondition}
                          value={fieldValues?.category}
                          onChange={(value) => {
                            const newObj = { ...fieldValues };
                            newObj.category = value;
                            if (
                              subCategories.filter((sub) => sub.parent == value)
                                .length == 0
                            ) {
                              newObj.sub_category = undefined;
                            }
                            setFieldValues(newObj);
                            submitCondition() && handleSubmit(fieldValues, 0);
                          }}
                          options={fieldOptions}
                        />
                      </div>
                      <div className="w-full">
                        <Text
                          weight={"bold"}
                          color={"grayReg"}
                          className={"whitespace-nowrap "}>
                          Sub-category
                        </Text>
                        <CustomSelect
                          disabled={disableCondition}
                          value={fieldValues?.sub_category}
                          onChange={(value) => {
                            const newObj = { ...fieldValues };
                            newObj.sub_category = value;
                            setFieldValues(newObj);
                            submitCondition() && handleSubmit(fieldValues, 0);
                          }}
                          options={creatSubOptions()}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mt-2">
                    <div className="w-1/2">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Indicate the modality in which the stimuli were presented."
                        }
                        text={"Modality"}
                      />
                      <CustomSelect
                        disabled={disableCondition}
                        value={fieldValues?.modality}
                        onChange={(value) => {
                          const newObj = { ...fieldValues };
                          newObj.modality = value;
                          setFieldValues(newObj);
                          submitCondition() && handleSubmit(fieldValues, 0);
                        }}
                        options={modalities}
                      />
                    </div>

                    <div>
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Enter the number of different non-suppressed stimuli that were used in the experiment; e.g., if the stimuli were the digits between 1-9, the number is 9. If this information is not available, leave empty."
                        }
                        text={"Number of stimuli"}
                      />
                      <div className="flex flex-col items-center">
                        <input
                          min={0}
                          disabled={disableCondition}
                          type="number"
                          value={fieldValues.number_of_stimuli}
                          onChange={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setFieldValues((prev) => ({
                              ...prev,
                              number_of_stimuli: e.target.value,
                            }));
                          }}
                          className={`border w-full border-gray-300 rounded-md p-2 ${
                            disableCondition && "bg-grayDisable text-gray-400"
                          } `}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-r-2 border-blue h-24"></div>
            <div className="flex flex-col items-center gap-1">
              <div id="trash+submit">
                <TrashButton
                  fieldValues={fieldValues}
                  index={0}
                  handleDelete={handleDelete}
                />
              </div>
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
              {!disableCondition && (
                <SubmitButton
                  submit={async () => {
                    if (!editble) {
                      handleSubmit(fieldValues);
                    } else {
                      const res = await handleEdit(fieldValues);
                      res && enableEdit(false);
                    }
                  }}
                  disabled={!submitCondition || disableCondition}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ExpandingBox>
  );
}
