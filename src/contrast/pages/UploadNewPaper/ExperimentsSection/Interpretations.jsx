import {
  ExpandingBox,
  Text,
  CustomSelect,
  CircledIndex,
  TooltipExplanation,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";

import {
  SubmitClassificationField,
  rawTextToShow,
} from "../../../../Utils/functions";
import { interpretationTypes } from "../../../../Utils/HardCoded";

export default function Interpretations({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const sortedOptions = fieldOptions
    .map((fieldOption) => {
      return {
        theory: fieldOption.value,
        type: "",
      };
    })
    .sort((a, b) => {
      if (a.parentTheoryId > b.parentTheoryId) {
        return 1;
      } else {
        return -1;
      }
    });
  const [fieldValues, setFieldValues] = useState(sortedOptions);
  const classificationName = "interpretations";

  const handleSubmit = SubmitClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues
  );

  const numberOfFilled = fieldValues.filter(
    (field) => field.type !== ""
  ).length;

  useEffect(() => {
    if (values && values.length > 0) {
      setFieldValues(
        values.map((row) => {
          return {
            theory: row.theory.id,
            type: row.type,
            id: row.id,
            parentTheoryId: row.theory.parent.id,
          };
        })
      );
    }
  }, []);

  return (
    <ExpandingBox
      number={numberOfFilled}
      disabled={disabled}
      headline={
        <div className="flex gap-2">
          <Text weight={"bold"}>{rawTextToShow(classificationName)}</Text>
          <TooltipExplanation
            blackHeadline
            hover
            tooltip={
              "Indicate if the experiment's findings were interpreted as Supporting/Challenging or Neutral regarding each of the theories. If the theory wasn’t mentioned in the paper (or was mentioned but without being portrayed as supported/challenged), indicate “Neutral.”"
            }
          />
        </div>
      }>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div
            key={`${classificationName}-${index}-${
              fieldValue.id ? fieldValue.id : "new"
            }`}>
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
                        handleSubmit(fieldValues, index);
                      }}
                      options={interpretationTypes}
                    />
                  </div>
                </div>
                <div id="trash+submit" className=" flex gap-2">
                  {/* <SubmitButton
                      submit={() => {
                        handleSubmit(fieldValues, index);
                      }}
                      disabled={!(fieldValue?.theory && fieldValue?.type)}
                    /> */}
                </div>
              </div>
            </form>
          </div>
        );
      })}
    </ExpandingBox>
  );
}
