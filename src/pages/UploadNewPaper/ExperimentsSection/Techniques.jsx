import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  YoavSelect,
} from "../../../components/Reusble";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";

export default function Techniques({
  filedOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([
    {
      technique: "",
    },
  ]);
  const classificationName = "technique";

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
            technique: row.id,
            id: row.id,
          };
        })
      );
    }
  }, []);

  return (
    <ExpandingBox
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-4 items-center  border border-blue border-x-4 p-2 rounded-md">
                <div id="index" className="w-4">
                  <Text weight={"bold"} color={"blue"}>
                    {index + 1}
                  </Text>
                </div>

                <div id="field1" className="w-full">
                  <TooltipExplanation
                    isHeadline
                    tooltip={
                      "Choose the neuroscientific techniques used in the experiment. If this was a behavioral experiment, simply choose ‘behavior’."
                    }
                    text={"Technique"}
                  />
                  <YoavSelect
                    disabled={fieldValue.id}
                    value={fieldValue.technique}
                    onChange={(value) => {
                      const newArray = [...fieldValues];
                      newArray[index].technique = value;
                      setFieldValues(newArray);
                    }}
                    options={filedOptions}
                  />
                </div>

                <div id="trash+submit" className="flex gap-2">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues[index].technique, index);
                    }}
                    disabled={!fieldValue?.technique || fieldValue.id}
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
