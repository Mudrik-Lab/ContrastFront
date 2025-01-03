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
  deleteClassificationField,
  SubmitClassificationField,
  alphabetizeByLabels,
  rawTextToShow,
} from "../../../../Utils/functions";
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";

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
    sub_category: "",
    modality: "",
    duration: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const [description, setDescription] = useState(values?.stimuli_notes || "");

  const classificationName = "stimuli";

  const handleSubmit = SubmitClassificationField(
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
    setFieldValues
  );

  useEffect(() => {
    if (fieldValues[fieldValues.length - 1].sub_category === "") {
      delete fieldValues[fieldValues.length - 1].sub_category;
    }
  }, [fieldValues[fieldValues.length - 1]]);

  useEffect(() => {
    if (values && values.stimuli?.length > 0) {
      setFieldValues(
        values.stimuli.map((row) => {
          return {
            category: row.category,
            sub_category: row.sub_category || "",
            modality: row.modality,
            duration: row.duration,
            id: row.id,
          };
        })
      );
    }
  }, []);

  function creatSubOptions(index) {
    return [
      ...new Set(
        subCategories.filter((sub) => sub.parent == fieldValues[index].category)
      ),
    ];
  }
  const submitCondition = (index) => {
    return (
      fieldValues[index]?.category &&
      fieldValues[index]?.modality &&
      fieldValues[index]?.duration &&
      (creatSubOptions(index).length > 0
        ? fieldValues[index]?.sub_category
        : true)
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
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div
            key={`${classificationName}-${index}-${
              fieldValue.id ? fieldValue.id : "new"
            }`}>
            <form className="flex flex-col gap-2 ">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />
                <div className="flex flex-col gap-2 w-full ">
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
                            if (value === "25") {
                              newArray[index].modality = "2";
                              newArray[index].duration = 0;
                              setFieldValues(newArray);

                              handleSubmit(fieldValues, index);
                            }
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
                          disabled={
                            fieldValue.id ||
                            creatSubOptions(index)?.length === 0
                          }
                          value={fieldValue.sub_category}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].sub_category = value;
                            setFieldValues(newArray);
                            submitCondition(index) &&
                              handleSubmit(fieldValues, index);
                          }}
                          options={creatSubOptions(index)}
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
                    <div className="w-24">
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
                </div>
                <div className="border-r-2 border-blue h-24"></div>
                <div id="trash+submit">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  {/* <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={
                      !(
                        fieldValue?.category &&
                        fieldValue?.sub_category &&
                        fieldValue?.duration &&
                        fieldValue?.modality
                      ) || fieldValue.id
                    }
                  /> */}
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
      <ExternalNotes
        description={description}
        setDescription={setDescription}
        classification={classificationName}
        study_pk={study_pk}
        experiment_pk={experiment_pk}
      />
    </ExpandingBox>
  );
}
