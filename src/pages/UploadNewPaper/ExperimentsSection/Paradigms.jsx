import { Field, FieldArray, Formik, Form } from "formik";
import {
  Button,
  ExpandingBox,
  SubmitButton,
  Text,
  ToastBox,
} from "../../../components/Reusble";
import Select from "react-select";
import { useState } from "react";
import { addParadigmToexperiment } from "../../../apiHooks/createExperiment";
import { toast } from "react-toastify";

export default function Paradigms({
  optionalParadigms,
  optionalParadigmsFamilies,
  experiment_pk,
  study_pk,
  disabled,
}) {
  const [count, setCount] = useState(0);
  const [submittedParadigm, setSubmittedParadigm] = useState();
  const [paradigmValues, setParadigmValues] = useState([1]);

  const initialValues = { paradigm: { main: "", specific: "" } };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await addParadigmToexperiment({
        experiment_pk: experiment_pk,
        study_pk,
        paradigm: values.paradigm.specific,
      });
      if (res.status === 201) {
        setSubmittedParadigm(res.data);
        toast.success(
          <ToastBox
            headline={"Success"}
            text={
              "Paradigm was successfully added to experiment's classifications"
            }
          />
        );
        handleAddParadigmField();
        resetForm();
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddParadigmField = () => {
    setParadigmValues([...paradigmValues, ""]);
  };
  const handleDeleteParadigmField = () => {
    setParadigmValues(paradigmValues.slice(0, -1));
  };
  return (
    <ExpandingBox disabled={disabled} headline={"Paradigms"}>
      {paradigmValues.map((_, index) => (
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
              <>
                <div className="flex gap-2 items-start  border border-blue border-x-4 p-2 rounded-md">
                  <div className="w-4">
                    <Text weight={"bold"} color={"blue"}>
                      {index + 1}
                    </Text>
                  </div>
                  <div className="w-1/3">
                    <Text weight={"bold"} color={"grayReg"}>
                      Main Paradim
                    </Text>
                    <Select
                      id={`paradigm.main`}
                      name={`paradigm.main`}
                      onChange={(v) => {
                        setFieldValue(`paradigm.main`, v.value);
                      }}
                      options={optionalParadigmsFamilies}
                    />
                  </div>

                  <div>
                    <Text weight={"bold"} color={"grayReg"}>
                      Specific Paradigm
                    </Text>

                    <div className="flex gap-2">
                      <Select
                        isDisabled={values.paradigm.main === ""}
                        id={`paradigm.specific`}
                        name={`paradigm.specific`}
                        onChange={(v) =>
                          setFieldValue(`paradigm.specific`, v.value)
                        }
                        options={optionalParadigms
                          .filter(
                            (paradigm) =>
                              paradigm.parent === values.paradigm.main
                          )
                          .map((item) => ({
                            label: item.name,
                            value: item.id,
                          }))}
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={count === 0}
                          onClick={() => {
                            count > 0 && setCount(count - 1);
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
                        <SubmitButton
                          fieldName={"Paradigms"}
                          disabled={!values.paradigm.specific}
                        />
                      </div>
                      {/* <button
                      id="add_paradigm"
                      type="button"
                      disabled={values.paradigm.specific === ""}
                      onClick={() => {
                        console.log(count);
                        setCount(count + 1);
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
                    </button> */}
                    </div>
                  </div>
                </div>
              </>
            </Form>
          )}
        </Formik>
      ))}
    </ExpandingBox>
  );
}
