import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TrashButton,
  CustomSelect,
  CircledIndex,
} from "../../../components/Reusble";
import { useEffect, useState } from "react";

import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";
import { interpretationTypes } from "../../../Utils/HardCoded";

export default function Interpretations({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState(
    fieldOptions.map((filedOption) => {
      return {
        theory: filedOption.value,
        type: "",
      };
    })
  );
  const classificationName = "interpretations";

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
            theory: row.theory.id,
            type: row.type,
            id: row.id,
          };
        })
      );
    }
  }, []);

  return (
    <ExpandingBox
      number={4}
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />
                <div className="w-full flex gap-2 items-start">
                  <div className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Theory
                    </Text>
                    <input
                      readOnly
                      className="p-2 text-base w-full bg-white disabled:bg-grayDisable border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                      value={
                        fieldOptions.find(
                          (option) => option.value === fieldValue.theory
                        ).label
                      }
                    />
                  </div>

                  <div className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Type
                    </Text>

                    <CustomSelect
                      value={fieldValue.type}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].type = value;
                        setFieldValues(newArray);
                      }}
                      options={interpretationTypes}
                    />
                  </div>
                </div>
                <div id="trash+submit" className=" flex gap-2">
                  <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={!(fieldValue?.theory && fieldValue?.type)}
                  />
                </div>
              </div>
            </form>
          </div>
        );
      })}
    </ExpandingBox>
  );
}
