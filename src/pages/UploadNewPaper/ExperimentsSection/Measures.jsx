import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
} from "../../../components/Reusble";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";

export default function Measures({
  filedOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([
    {
      type: "",
      notes: "",
    },
  ]);
  const classificationName = "measures";

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
    if (values && values.length > 0) {
      setFieldValues(
        values.map((row) => {
          return {
            type: row.type,
            notes: row.notes,
            id: row.id,
          };
        })
      );
    }
  }, []);
  return (
    <ExpandingBox
      number={
        Object.values(fieldValues[0])[0] === ""
          ? fieldValues.length - 1
          : fieldValues.length
      }
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <div id="index" className="w-4">
                  <Text weight={"bold"} color={"blue"}>
                    {index + 1}
                  </Text>
                </div>

                <div className="w-full flex gap-2 items-start">
                  <div className="w-full">
                    <TooltipExplanation
                      isHeadline
                      tooltip={
                        "Choose all of the measures and analyses that were used to measure effects that are related to consciousness. For example, for an experiment testing for BOLD signal effects chose 'BOLD'."
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
                      }}
                      options={filedOptions}
                    />
                  </div>

                  <div className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Notes
                    </Text>

                    <div className="flex gap-2">
                      <textarea
                        disabled={fieldValues[index].id}
                        type="textarea"
                        defaultValue={fieldValue.notes}
                        rows={4}
                        onChange={(e) => {
                          setFieldValues((prev) =>
                            prev.map((item, i) =>
                              i === index
                                ? { ...item, notes: e.target.value }
                                : item
                            )
                          );
                        }}
                        className={`border w-full border-gray-300 rounded-md p-2 ${
                          fieldValues[index].id &&
                          "bg-grayDisable text-gray-400"
                        } `}
                      />
                    </div>
                  </div>
                </div>

                <div id="trash+submit" className="flex gap-2">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={
                      !(fieldValue?.notes && fieldValue?.type) || fieldValue.id
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        );
      })}
      <AddFieldButton
        fieldValues={fieldValues}
        setFieldValues={setFieldValues}
      />
    </ExpandingBox>
  );
}
