import {
  AddFieldButton,
  ExpandingBox,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  alphabetizeByLabels,
  rawTextToShow,
} from "../../../../Utils/functions";

export default function TargetStimuli({
  fieldOptions,
  subCategories,
  modalities,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setMinimumClassifications,
  minimumClassifications,
}) {
  const isUncontrast = true;
  const initialValues = {
    are_also_nonsuppressed: "",
    same_as_suppressed: "",
    category: "",
    sub_category: "",
    modality: "",
    number_of_stimuli: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "target_stimuli";

  const handleSubmit = SubmitClassificationField(
    isUncontrast,
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues
  );

  const handleDelete = DeleteClassificationField(
    isUncontrast,
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues
  );

  useEffect(() => {
    if (fieldValues[0].sub_category === "") {
      delete fieldValues[0].sub_category;
    }
  }, [fieldValues[0]]);

  useEffect(() => {
    if (values && values.stimuli?.length > 0) {
      setFieldValues(
        values.stimuli.map((row) => {
          return {
            category: row.category,
            sub_category: row.sub_category || "",
            modality: row.modality,
            number_of_stimuli: row.number_of_stimuli,
            id: row.id,
          };
        })
      );
    }
  }, []);

  const submitCondition = (index) => {
    return (
      fieldValues[index]?.category &&
      fieldValues[index]?.modality &&
      fieldValues[index]?.number_of_stimuli
    );
  };

  const fieldsNum = fieldValues.filter((field) => field.id)?.length;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      stimuli: fieldsNum,
    });
  }, [fieldsNum]);

  console.log(fieldValues);
  return (
    <ExpandingBox
      number={fieldsNum}
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div className="flex gap-2 w-full items-center">
                      <div className="w-2/3">
                        <Text weight={"bold"} color={"grayReg"}>
                          Are there also non-suppressed stimuli that
                          participants had to provide a response to (i.e., a
                          target)?
                        </Text>
                      </div>
                      <div className="w-1/3 flex justify-between items-center gap-2">
                        <CustomSelect
                          disabled={fieldValue?.id}
                          value={fieldValue.are_also_nonsuppressed}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].are_also_nonsuppressed = value;
                            setFieldValues(newArray);
                          }}
                          options={[
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                          ]}
                        />
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            " In most experiments, participants are asked to respond to non suppressed stimuli. If this is the case, enter “yes”"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  {(fieldValue.are_also_nonsuppressed === "yes" ||
                    fieldValue.id) && (
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
                            <CustomSelect
                              disabled={fieldValue?.id}
                              value={fieldValue.same_as_suppressed}
                              onChange={(value) => {
                                const newArray = [...fieldValues];
                                newArray[index].same_as_suppressed = value;
                                setFieldValues(newArray);
                              }}
                              options={[
                                { value: "yes", label: "Yes" },
                                { value: "no", label: "No" },
                              ]}
                            />
                            <TooltipExplanation
                              isHeadline
                              tooltip={
                                " In most experiments, participants are asked to respond to non suppressed stimuli. If this is the case, enter “yes”"
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {(fieldValue.same_as_suppressed === "no" ||
                        fieldValue.id) && (
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
                                  disabled={fieldValue.id}
                                  value={fieldValue.category}
                                  onChange={(value) => {
                                    const newArray = [...fieldValues];
                                    newArray[index].category = value;
                                    setFieldValues(newArray);
                                    submitCondition(index) &&
                                      handleSubmit(fieldValues, index);
                                  }}
                                  options={fieldOptions}
                                />
                              </div>
                              <div className="w-full">
                                <Text
                                  weight={"bold"}
                                  color={"grayReg"}
                                  className={"whitespace-nowrap "}>
                                  Sub-category (optional)
                                </Text>
                                <CustomSelect
                                  disabled={fieldValue.id}
                                  defaultValue={fieldValue.sub_category}
                                  onChange={(value) => {
                                    const newArray = [...fieldValues];
                                    value !== ""
                                      ? (newArray[index].sub_category = value)
                                      : delete newArray[index].sub_category;
                                    setFieldValues(newArray);
                                    submitCondition(index) &&
                                      handleSubmit(fieldValues, index);
                                  }}
                                  options={alphabetizeByLabels(subCategories)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1/2">
                              <TooltipExplanation
                                isHeadline
                                tooltip={
                                  "Indicate in which modality the stimuli were presented."
                                }
                                text={"Modality"}
                              />
                              <CustomSelect
                                disabled={fieldValue.id}
                                value={fieldValue.modality}
                                onChange={(value) => {
                                  const newArray = [...fieldValues];
                                  newArray[index].modality = value;
                                  setFieldValues(newArray);
                                  submitCondition(index) &&
                                    handleSubmit(fieldValues, index);
                                }}
                                options={modalities}
                              />
                            </div>

                            <div>
                              <TooltipExplanation
                                isHeadline
                                tooltip={
                                  "Enter the number of different suppressed stimuli that were used in the experiment; e.g., if the suppressed stimuli were the digits between 1-9, the number is 9. If this information is not available,  leave empty."
                                }
                                text={"Number of stimuli"}
                              />
                              <div className="flex flex-col items-center">
                                <input
                                  min={0}
                                  disabled={fieldValues[index]?.id}
                                  type="number"
                                  value={fieldValues[index].number_of_stimuli}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setFieldValues((prev) =>
                                      prev.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              number_of_stimuli: e.target.value,
                                            }
                                          : item
                                      )
                                    );
                                  }}
                                  onBlur={(e) => {
                                    e.stopPropagation();
                                    if (submitCondition(index)) {
                                      e.preventDefault();

                                      handleSubmit(fieldValues, index);
                                    }
                                  }}
                                  onKeyDown={(e) => {
                                    e.stopPropagation();

                                    if (
                                      e.key === "Enter" &&
                                      submitCondition(index)
                                    ) {
                                      e.preventDefault();
                                      handleSubmit(fieldValues, index);
                                    } else if (e.key === "Enter") {
                                      e.preventDefault();
                                    }
                                  }}
                                  className={`border w-full border-gray-300 rounded-md p-2 ${
                                    fieldValues[index].id &&
                                    "bg-grayDisable text-gray-400"
                                  } `}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="border-r-2 border-blue h-36"></div>
                <div id="trash+submit">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                </div>
              </div>
            </form>
          </div>
        );
      })}

      <AddFieldButton
        initialValues={initialValues}
        fieldValues={fieldValues}
        setFieldValues={setFieldValues}
      />
    </ExpandingBox>
  );
}
