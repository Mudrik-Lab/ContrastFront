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

export default function Samples({
  filedOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([values]);
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
                      value={fieldValue.type}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].type = value;
                        setFieldValues(newArray);
                      }}
                      options={filedOptions}
                    />
                  </div>

                  <div id="field2" className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Included
                    </Text>

                    <div className="flex gap-2">
                      <input
                        disabled={fieldValues[index].id}
                        type="number"
                        defaultValue={fieldValue.size_included}
                        onChange={(e) => {
                          setFieldValues((prev) =>
                            prev.map((item, i) =>
                              i === index
                                ? { ...item, size_included: e.target.value }
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
                  <div id="field2" className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Total
                    </Text>

                    <div className="flex gap-2">
                      <input
                        min={0}
                        disabled={fieldValues[index].id}
                        type="number"
                        defaultValue={fieldValue.total_size}
                        onChange={(e) => {
                          setFieldValues((prev) =>
                            prev.map((item, i) =>
                              i === index
                                ? { ...item, total_size: e.target.value }
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

                <div id="trash+submit" className=" flex gap-2">
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
                      !(
                        fieldValue?.total_size &&
                        fieldValue?.size_included &&
                        fieldValue?.type
                      ) || fieldValue.id
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
