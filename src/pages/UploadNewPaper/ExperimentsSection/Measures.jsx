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

export default function Measures({
  filedOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([values]);
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

  return (
    <ExpandingBox
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
                  <div id="field1" className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Type
                    </Text>
                    <YoavSelect
                      disabled={fieldValue.id}
                      value={fieldValue.type_id}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].type_id = value;
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
                          fieldValues[index].id && "bg-[#F2F2F2] text-gray-400"
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
                      !(fieldValue?.notes && fieldValue?.type_id) ||
                      fieldValue.id
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
