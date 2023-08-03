import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TrashButton,
  YoavSelect,
} from "../../../components/Reusble";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";

export default function Techniques({
  filedOptions,
  optionalParadigms,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([values]);
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
                  <Text
                    weight={"bold"}
                    color={"grayReg"}
                    className={"whitespace-nowrap "}>
                    Technique
                  </Text>
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
