import { Field, FieldArray } from "formik";
import { ExpandingBox, Text } from "../../../components/Reusble";
import Select from "react-select";
import { useState } from "react";

export default function Techniques({
  values,
  setFieldValue,
  techniquesOptions,
}) {
  return (
    <ExpandingBox headline={"Techniques"}>
      <FieldArray name="techniques">
        {({ push, remove }) => (
          <>
            {values.tasks.map((_, index) => (
              <div
                key={index}
                className="flex gap-2 items-start  border border-blue border-x-4 p-2 rounded-md">
                <div className="w-4">
                  <Text weight={"bold"} color={"blue"}>
                    {index + 1}
                  </Text>
                </div>
                <div className="w-full">
                  <Text weight={"bold"} color={"grayReg"}>
                    Techniques
                  </Text>
                  <Select
                    isMulti={true}
                    id={`techniques[${index}]`}
                    name={`techniques[${index}]`}
                    onChange={(v) => {
                      setFieldValue(
                        `techniques`,
                        v.map((x) => x.value)
                      );
                      console.log("");
                    }}
                    options={techniquesOptions}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </FieldArray>
    </ExpandingBox>
  );
}
