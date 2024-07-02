import {
  AddFieldButton,
  ExpandingBox,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../../Utils/functions";

export default function Samples({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setMinimumClassifications,
  minimumClassifications,
}) {
  const isUncontrast = true;
  const [description, setDescription] = useState(values?.samples_notes || "");
  const initialValues = {
    type: "",
    size_included: "",
    size_total: "",
    excluded: "",
    size_excluded: 0,
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "samples";

  const handleSubmit = SubmitClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues,
    isUncontrast
  );

  const handleDelete = DeleteClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues,
    isUncontrast
  );

  useEffect(() => {
    if (values?.samples && values.samples.length > 0) {
      setFieldValues(
        values.samples.map((row) => {
          return {
            type: row.type,
            size_included: row.size_included,
            total_size: row.total_size,
            excluded: row.excluded,
            size_excluded: row.size_excluded,
            id: row.id,
          };
        })
      );
    }
  }, []);
  const submitCondition = (index) => {
    return (
      fieldValues[index]?.type &&
      fieldValues[index]?.size_total &&
      fieldValues[index]?.size_included &&
      parseInt(fieldValues[index]?.size_included) <=
        parseInt(fieldValues[index]?.size_total) &&
      ((fieldValues[index].excluded === "yes" &&
        parseInt(fieldValues[index]?.size_excluded)) ||
        (fieldValues[index].excluded === "no" &&
          !fieldValues[index]?.size_excluded))
    );
  };

  const fieldsNum = fieldValues.filter((field) => field.id)?.length;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      samples: fieldsNum,
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
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />
                <div className="flex flex-col">
                  <div className="w-full flex gap-2 items-start">
                    <div className="w-full">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Choose the type of population/s used in the experiment."
                        }
                        text={"Type"}
                      />
                      <CustomSelect
                        disabled={fieldValue.id}
                        value={fieldValue.type}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].type = value;
                          setFieldValues(newArray);
                          submitCondition(index) &&
                            handleSubmit(fieldValues, index);
                        }}
                        options={fieldOptions}
                      />
                    </div>

                    <div className="w-full">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Enter the number of individuals from the specified population who participated in the experiment."
                        }
                        text={"Total"}
                      />

                      <div className="flex gap-2">
                        <input
                          min={0}
                          disabled={fieldValues[index].id}
                          type="number"
                          value={fieldValue.size_total}
                          onChange={(e) => {
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      size_total: parseInt(e.target.value),
                                    }
                                  : item
                              )
                            );
                          }}
                          onBlur={() =>
                            submitCondition(index) &&
                            handleSubmit(fieldValues, index)
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            submitCondition(index) &&
                            handleSubmit(fieldValues, index)
                          }
                          className={`border w-full border-gray-300 rounded-md p-2 ${
                            fieldValues[index].id &&
                            "bg-grayDisable text-gray-400"
                          } `}
                        />
                      </div>
                      {parseInt(fieldValue.size_included) >
                        parseInt(fieldValue.size_total) && (
                        <span className="text-flourishRed ">
                          Smaller than included
                        </span>
                      )}
                    </div>
                    <div className="w-full">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Enter the number of participants from the specified population who were included in the analysis."
                        }
                        text={"Included"}
                      />

                      <div className="flex gap-2">
                        <input
                          disabled={fieldValues[index]?.id}
                          type="number"
                          min={0}
                          value={fieldValue.size_included}
                          onChange={(e) => {
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      size_included: parseInt(e.target.value),
                                    }
                                  : item
                              )
                            );
                          }}
                          onBlur={() =>
                            submitCondition(index) &&
                            handleSubmit(fieldValues, index)
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            submitCondition(index) &&
                            handleSubmit(fieldValues, index)
                          }
                          className={`border w-full border-gray-300 rounded-md p-2 ${
                            fieldValues[index].id &&
                            "bg-grayDisable text-gray-400"
                          } `}
                        />
                      </div>
                      {fieldValue.size_included &&
                        fieldValue.size_included <= 0 && (
                          <span className="text-flourishRed ">
                            No zero or negative numbers
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    {!fieldValues[index].id && (
                      <div className="w-1/2 ">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Were participants excluded from analysis based on the awareness measure?"
                          }
                          text={"Excluded participants?"}
                        />

                        <CustomSelect
                          disabled={fieldValue.id}
                          value={fieldValue.excluded}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].excluded = value;
                            setFieldValues(newArray);
                            submitCondition(index) &&
                              handleSubmit(fieldValues, index);
                          }}
                          options={[
                            { value: "yes", label: "Yes" },
                            { value: "no", label: "No" },
                          ]}
                        />
                      </div>
                    )}

                    {(fieldValue.excluded === "yes" ||
                      fieldValue.size_excluded > 0) && (
                      <div className="w-1/2">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "How many participants were excluded from analysis?"
                          }
                          text={"Number of excluded"}
                        />

                        <div className="flex gap-2">
                          <input
                            min={0}
                            disabled={fieldValues[index].id}
                            type="number"
                            value={fieldValue.size_excluded}
                            onChange={(e) => {
                              setFieldValues((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? {
                                        ...item,
                                        size_excluded: parseInt(e.target.value),
                                      }
                                    : item
                                )
                              );
                            }}
                            onBlur={() =>
                              submitCondition(index) &&
                              handleSubmit(fieldValues, index)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              submitCondition(index) &&
                              handleSubmit(fieldValues, index)
                            }
                            className={`border w-full border-gray-300 rounded-md p-2 ${
                              fieldValues[index].id &&
                              "bg-grayDisable text-gray-400"
                            } `}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="border-r-2 border-blue h-14"></div>
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
