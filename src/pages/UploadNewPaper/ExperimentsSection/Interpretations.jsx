import { Field, FieldArray } from "formik";
import { ExpandingBox, Text } from "../../../components/Reusble";
import Select from "react-select";
import { useState } from "react";

export default function Interpretations({ values, setFieldValue, theories }) {
  const [count, setCount] = useState(0);
  const interpretationsType = [
    { label: "Supports", value: "pro" },
    { label: "Challenges", value: "challenges" },
    { label: "Nuetral", value: "nuetral" },
  ];
  return (
    <ExpandingBox headline={"Interpretations"}>
      <FieldArray name="interpretations">
        {({ push, remove }) => (
          <>
            {values.interpretations.map((_, index) => (
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
                    Theory
                  </Text>
                  <Select
                    id={`interpretations[${index}].theory`}
                    name={`interpretations[${index}].theory`}
                    onChange={(v) => {
                      setFieldValue(
                        `interpretations[${index}].theory`,
                        v.value
                      );
                      console.log(v.value);
                    }}
                    options={theories}
                  />
                </div>

                <div className="w-full">
                  <Text weight={"bold"} color={"grayReg"}>
                    Type
                  </Text>
                  <div className="flex gap-2">
                    <Select
                      id={`interpretations[${index}].type`}
                      name={`interpretations[${index}].type`}
                      onChange={(v) => {
                        setFieldValue(
                          `interpretations[${index}].type`,
                          v.value
                        );
                        console.log(v.value);
                      }}
                      options={interpretationsType}
                    />
                    {index === values.interpretations.length - 1 &&
                      index !== 0 && (
                        <button
                          type="button"
                          disabled={count === 0}
                          onClick={() => {
                            count > 0 && setCount(count - 1);
                            remove(index);
                          }}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16">
                            {" "}
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />{" "}
                          </svg>
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full flex  justify-center">
              <button
                type="button"
                disabled={false}
                onClick={() => {
                  console.log(count);
                  setCount(count + 1);
                  push("");
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  id="add"
                  fill={"#66BFF1"}
                  width="25"
                  height="25">
                  <path d="M17 9h-2v6H9v2h6v6h2v-6h6v-2h-6z"></path>
                  <path d="M16 2C8.269 2 2 8.269 2 16s6.269 14 14 14 14-6.269 14-14S23.731 2 16 2zm0 26C9.383 28 4 22.617 4 16S9.383 4 16 4s12 5.383 12 12-5.383 12-12 12z"></path>
                </svg>{" "}
              </button>
            </div>
          </>
        )}
      </FieldArray>
    </ExpandingBox>
  );
}
