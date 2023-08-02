import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TrashButton,
  YoavSelect,
} from "../../../components/Reusble";
import { useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";

export default function Paradigms({
  filedOptions,
  optionalParadigms,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([values]);
  const classificationName = "paradigm";

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
          <div key={fieldValue.key || fieldValue.id}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <div id="index" className="w-4">
                  <Text weight={"bold"} color={"blue"}>
                    {fieldValue.id || index + 1}
                  </Text>
                </div>

                <div className="flex gap-2 items-start">
                  <div id="field1" className="w-full">
                    <Text
                      weight={"bold"}
                      color={"grayReg"}
                      className={"whitespace-nowrap "}>
                      Main paradigm
                    </Text>
                    <YoavSelect
                      disabled={fieldValue.id}
                      value={fieldValue.main}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].main = value;
                        setFieldValues(newArray);
                      }}
                      options={filedOptions}
                    />
                  </div>
                  <div id="field1" className="w-full">
                    <Text
                      weight={"bold"}
                      color={"grayReg"}
                      className={"whitespace-nowrap"}>
                      Specigic paradigm
                    </Text>
                    <YoavSelect
                      disabled={fieldValue.id}
                      //   value={optionalParadigms.find(
                      //     (option) => option.value === fieldValues[index].specific
                      //   )}
                      value={fieldValue.specific}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].specific = value;
                        setFieldValues(newArray);
                      }}
                      options={optionalParadigms
                        .filter(
                          (paradigm) =>
                            paradigm.parent === fieldValues[index]?.main
                        )
                        .map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                    />
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
                      handleSubmit(fieldValues[index].specific, index);
                    }}
                    disabled={!fieldValue?.specific || fieldValue.id}
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
