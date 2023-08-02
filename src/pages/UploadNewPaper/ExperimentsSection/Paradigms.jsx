import { Field, FieldArray, Formik, Form } from "formik";
import {
  Button,
  ExpandingBox,
  SubmitButton,
  Text,
  ToastBox,
} from "../../../components/Reusble";
import Select from "react-select";
import { useEffect, useState } from "react";
import { addParadigmToexperiment } from "../../../apiHooks/createExperiment";
import { toast } from "react-toastify";
import { deleteExperimentsParadigm } from "../../../apiHooks/deleteExperiment";
import { useQuery } from "@tanstack/react-query";
import { getExperiment } from "../../../apiHooks/getExperiment";
import { ReactComponent as AddField } from "../../../assets/icons/add-field-icon.svg";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";

export default function Paradigms({
  optionalParadigms,
  optionalParadigmsFamilies,
  experiment_pk,
  study_pk,
  disabled,
}) {
  const [submittedParadigm, setSubmittedParadigm] = useState(false);
  const [paradigmValues, setParadigmValues] = useState([1]);

  const initialValues = { paradigm: { main: "", specific: "" } };

  const handleSubmit = async (values) => {
    try {
      const res = await addParadigmToexperiment({
        experiment_pk: experiment_pk,
        study_pk,
        paradigm: values,
      });
      if (res.status === 201) {
        setSubmittedParadigm(res.data);
        console.log(res.data);
        toast.success(
          <ToastBox
            headline={"Success"}
            text={
              "Paradigm was successfully added to experiment's classifications"
            }
          />
        );
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteParadigmField = async (values, index) => {
    console.log(index);
    try {
      const res = await deleteExperimentsParadigm({
        study_pk,
        experiment_pk,
        paradigm: values.paradigm.specific,
      });
      if (res.status === 204) {
        toast.success(
          <ToastBox headline={"Success"} text={"Paradigm was deleted"} />
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddParadigmField = () => {
    setParadigmValues([...paradigmValues, ""]);
  };

  return (
    <ExpandingBox id="paradigm-box" disabled={disabled} headline={"Paradigms"}>
      {paradigmValues.map((_, index) => (
        <div id={`paradigm${index}`} key={index}>
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
                    <div className="w-1/2">
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

                    <div className="w-1/2">
                      <Text weight={"bold"} color={"grayReg"}>
                        Specific Paradigm
                      </Text>

                      <div className="flex  gap-3">
                        <Select
                          isDisabled={values.paradigm.main === ""}
                          id={`paradigm.specific`}
                          name={`paradigm.specific`}
                          options={optionalParadigms
                            .filter(
                              (paradigm) =>
                                paradigm.parent === values.paradigm.main
                            )
                            .map((item) => ({
                              label: item.name,
                              value: item.id,
                            }))}
                          value={optionalParadigms.find(
                            (option) =>
                              option.value === values.paradigm.specific
                          )}
                          onChange={async (selectedOption) => {
                            const paradigmExists = values.paradigm.specific;

                            if (paradigmExists) {
                              // delete the current paradigm
                              await handleDeleteParadigmField(values);
                            }
                            //post new papradigm
                            setFieldValue(
                              `paradigm.specific`,
                              selectedOption.value
                            );

                            handleSubmit(selectedOption.value);
                          }}
                        />

                        <div id="delete_field" className="flex gap-2">
                          <button
                            disabled={!submittedParadigm}
                            type="button"
                            onClick={async () => {
                              await handleDeleteParadigmField(values, index);
                            }}>
                            <Trash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </Form>
            )}
          </Formik>
        </div>
      ))}
      <div className="w-full flex  justify-center">
        <button type="button" disabled={false} onClick={handleAddParadigmField}>
          <AddField />{" "}
        </button>
      </div>
    </ExpandingBox>
  );
}
