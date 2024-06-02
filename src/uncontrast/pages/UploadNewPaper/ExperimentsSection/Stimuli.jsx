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

export default function Stimuli({
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
  const initialValues = {
    category: "",
    modality: "",
    duration: "",
    stimuliNum: "",
    SOA: "",
    mode_of_presentation: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "stimuli";

  const handleSubmit = SubmitClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues
  );

  const handleDelete = DeleteClassificationField(
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
            duration: row.duration,
            mode_of_presentation: row.mode_of_presentation,
            SOA: row.SOA,
            stimuliNum: row.stimuliNum,
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
      fieldValues[index]?.duration &&
      fieldValues[index]?.mode_of_presentation &&
      fieldValues[index]?.stimuliNum &&
      fieldValues[index]?.SOA
    );
  };

  const fieldsNum = fieldValues.filter((field) => field.id)?.length;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      stimuli: fieldsNum,
    });
  }, [fieldsNum]);
  return (
    <ExpandingBox
      number={fieldsNum}
      disabled={false} // TODO =disabled
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div className="w-full flex gap-2 items-start">
                      <div className="w-full">
                        <div className="flex gap-1 items-center">
                          <Text weight={"bold"} color={"grayReg"}>
                            Category
                          </Text>
                          <TooltipExplanation
                            isHeadline
                            tooltip={
                              "Choose the category of stimuli used in the experiment."
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
                    <div className="w-full">
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
                    <div className="w-20">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Enter the presentation duration of the critical stimulus in ms. If this information is not available, enter NA."
                        }
                        text={"Duration"}
                      />

                      <div className="flex flex-col items-center">
                        <input
                          min={0}
                          disabled={fieldValues[index]?.id}
                          type="number"
                          value={fieldValues[index].duration}
                          onChange={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? { ...item, duration: e.target.value }
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

                            if (e.key === "Enter" && submitCondition(index)) {
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
                        <Text xs weight={"bold"} color={"grayReg"}>
                          (ms)
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div>
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Enter the number of different suppressed stimuli that were used in the experiment; e.g., if the suppressed stimuli were the digits between 1-9, the number is 9. If this information is not available,  leave empty."
                        }
                        text={"Used stimuli on experiment"}
                      />
                      <div className="flex flex-col items-center">
                        <input
                          min={0}
                          disabled={fieldValues[index]?.id}
                          type="number"
                          value={fieldValues[index].stimuliNum}
                          onChange={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? { ...item, stimuliNum: e.target.value }
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

                            if (e.key === "Enter" && submitCondition(index)) {
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
                    <div className="w-20">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Enter the time between the appearance of the suppressed stimulus and appearance of the non-suppressed stimulus.If information is not available or irrelevant, leave empty"
                        }
                        text={"SOA (ms)"}
                      />
                      <div className="flex flex-col items-center">
                        <input
                          min={0}
                          disabled={fieldValues[index]?.id}
                          type="number"
                          value={fieldValues[index].SOA}
                          onChange={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? { ...item, SOA: e.target.value }
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

                            if (e.key === "Enter" && submitCondition(index)) {
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
                    <div>
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "If the suppressed stimuli in the experiment were presented at detection threshold, as determined by a calibration procedure, enter “liminal”. Otherwise, enter “subliminal”"
                        }
                        text={"Mode of presentation"}
                      />
                      <CustomSelect
                        disabled={fieldValue.id}
                        value={fieldValue.mode_of_presentation}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].mode_of_presentation = value;
                          setFieldValues(newArray);
                          submitCondition(index) &&
                            handleSubmit(fieldValues, index);
                        }}
                        options={[
                          { value: "liminal", label: "Liminal" },
                          { value: "subliminal", label: "Subliminal" },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    TODO: add Are there also non-suppressed stimuli that
                    participants had to provide a response to (i.e., a target)?
                    Dropdown menu: yes/no
                  </div>
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
