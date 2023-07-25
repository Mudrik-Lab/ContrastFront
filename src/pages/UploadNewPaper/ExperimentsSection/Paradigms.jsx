import { Field, FieldArray, Formik, Form } from "formik";
import { Button, ExpandingBox, Text } from "../../../components/Reusble";
import Select from "react-select";
import { useState } from "react";

export default function Paradigms({
  optionalParadigms,
  optionalParadigmsFamilies,
  experiment_pk,
  disabled,
}) {
  const [count, setCount] = useState(0);
  const initialValues = { paradigms: [{ main: "", specific: "" }] };
  const handleSubmit = ({ values }) => {
    console.log(values, experiment_pk);
  };
  return (
    <ExpandingBox disabled={disabled} headline={"Paradigms"}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          onSubmit,
          isSubmitting,
          dirty,
          isValid,
          values,
          setFieldValue,
        }) => (
          <Form className="flex flex-col gap-2">
            <FieldArray name="paradigms">
              {({ push, remove }) => (
                <>
                  {values.paradigms.map((_, index) => (
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
                          Main Paradim
                        </Text>
                        <Select
                          id={`paradigms[${index}].main`}
                          name={`paradigms[${index}].main`}
                          onChange={(v) => {
                            setFieldValue(`paradigms[${index}].main`, v.value);
                          }}
                          options={optionalParadigmsFamilies}
                        />
                      </div>

                      <div className="w-full">
                        <Text weight={"bold"} color={"grayReg"}>
                          Specific Paradigm
                        </Text>

                        <div className="flex gap-2">
                          <Select
                            isDisabled={values.paradigms[index].main === ""}
                            id={`paradigms[${index}].specific`}
                            name={`paradigms[${index}].specific`}
                            onChange={(v) =>
                              setFieldValue(
                                `paradigms[${index}].specific`,
                                v.value
                              )
                            }
                            options={optionalParadigms
                              .filter(
                                (paradigm) =>
                                  paradigm.parent ===
                                  values.paradigms[index].main
                              )
                              .map((item) => ({
                                label: item.name,
                                value: item.id,
                              }))}
                          />
                          {index === values.paradigms.length - 1 &&
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
                      disabled={values.paradigms[count].specific === ""}
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
            <div className="w-full flex justify-center">
              <Button type="submit" onClick={handleSubmit}>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1221_7195)">
                    <path
                      d="M10.7533 5.34351L7.45445 9.54666L5.56082 7.65212L5.56093 7.65201L5.55443 7.64596C5.36486 7.46932 5.11413 7.37315 4.85507 7.37772C4.596 7.38229 4.34882 7.48724 4.1656 7.67046C3.98238 7.85368 3.87743 8.10086 3.87286 8.35993C3.86829 8.61899 3.96446 8.86972 4.1411 9.05929L4.14098 9.0594L4.14719 9.0656L6.79319 11.7126L6.79338 11.7128C6.88843 11.8077 7.0016 11.8824 7.12616 11.9326C7.25072 11.9828 7.38411 12.0074 7.51838 12.0049C7.65264 12.0024 7.78503 11.9729 7.90765 11.9181C8.03026 11.8634 8.14059 11.7845 8.23205 11.6861L8.2384 11.6793L8.24422 11.672L12.2296 6.6903C12.4057 6.50263 12.5028 6.25412 12.5004 5.99644C12.4979 5.73468 12.3929 5.48434 12.2079 5.29916L12.1346 5.22586H12.1248C12.0487 5.16502 11.9639 5.11551 11.873 5.07906C11.7483 5.02898 11.6147 5.00458 11.4802 5.00732C11.3458 5.01006 11.2133 5.03988 11.0907 5.095C10.968 5.15012 10.8578 5.2294 10.7665 5.32811L10.7596 5.33554L10.7533 5.34351ZM15.75 8.50586C15.75 10.5613 14.9335 12.5325 13.4801 13.9859C12.0267 15.4393 10.0554 16.2559 8 16.2559C5.94457 16.2559 3.97333 15.4393 2.51992 13.9859C1.06652 12.5325 0.25 10.5613 0.25 8.50586C0.25 6.45043 1.06652 4.47919 2.51992 3.02578C3.97333 1.57238 5.94457 0.755859 8 0.755859C10.0554 0.755859 12.0267 1.57238 13.4801 3.02578C14.9335 4.47919 15.75 6.45043 15.75 8.50586Z"
                      fill="white"
                    />
                  </g>
                </svg>
                Submit Experiment
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </ExpandingBox>
  );
}
