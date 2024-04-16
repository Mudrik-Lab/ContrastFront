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
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";

export default function Samples({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setMinimumClassifications,
  minimumClassifications,
}) {
  const [description, setDescription] = useState(values?.samples_notes || "");
  const initialValues = {
    type: "",
    size_included: "",
    total_size: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "samples";

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
    if (values?.samples && values.samples.length > 0) {
      setFieldValues(
        values.samples.map((row) => {
          return {
            type: row.type,
            size_included: row.size_included,
            total_size: row.total_size,
            id: row.id,
          };
        })
      );
    }
  }, []);

  const submitCondition = (index) => {
    return (
      fieldValues[index]?.type &&
      fieldValues[index]?.total_size &&
      fieldValues[index]?.size_included &&
      parseInt(fieldValues[index]?.size_included) <=
        parseInt(fieldValues[index]?.total_size)
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
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />

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
                        value={fieldValue.total_size}
                        onChange={(e) => {
                          setFieldValues((prev) =>
                            prev.map((item, i) =>
                              i === index
                                ? { ...item, total_size: e.target.value }
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
                      parseInt(fieldValue.total_size) && (
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
                                ? { ...item, size_included: e.target.value }
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
                      fieldValue.size_included < 0 && (
                        <span className="text-flourishRed ">
                          No negative numbers
                        </span>
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
                  {/* <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={
                      !(
                        fieldValue?.total_size &&
                        fieldValue?.size_included &&
                        fieldValue.size_included <= fieldValue.total_size &&
                        fieldValue?.type
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
