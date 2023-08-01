import { Field, FieldArray, Form, Formik } from "formik";
import { ExpandingBox, SubmitButton, Text } from "../../../components/Reusble";
import Select from "react-select";
import { useState } from "react";
import { addFieldToexperiment } from "../../../apiHooks/createExperiment";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import { deleteFieldFromExperiments } from "../../../apiHooks/deleteExperiment";
import { toast } from "react-toastify";

export default function Tasks({
  tasksOptions,
  disabled,
  experiment_pk,
  study_pk,
}) {
  const [count, setCount] = useState(0);

  const initialValues = [{ type: "", description: "" }];
  const [taskValues, setTaskValues] = useState(initialValues);

  const handleSubmit = async (values, index) => {
    try {
      const res = await addFieldToexperiment({
        field: values[index],
        study_pk,
        experiment_pk,
        field_name: "tasks",
      });
      if (res.status === 201) {
        console.log(res.data);
        const newArr = [...taskValues];
        newArr[index] = res.data;
        setTaskValues(newArr);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (values, index, resetForm) => {
    try {
      const res = await deleteFieldFromExperiments({
        study_pk,
        experiment_pk,
        field_name: "tasks",
        id: taskValues[index].id,
      });

      if (res.status === 204) {
        console.log(taskValues);
        if (taskValues.length !== 1) {
          const newArr = taskValues.filter(
            (taskValue) => taskValue.id !== taskValues[index].id
          );
          // newArr.splice(index, 1);
          console.log(newArr);
          setTaskValues(newArr);
        } else {
          resetForm();
          setTaskValues([{ type: "", description: "" }]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ExpandingBox disabled={disabled} headline={"Tasks"}>
      {taskValues.map((taskValue, index) => (
        <div id={`tasks${index}`} key={index}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue, resetForm }) => (
              <Form className="flex flex-col gap-2">
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
                      Type
                    </Text>
                    <Select
                      isDisabled={taskValues[index].id}
                      defaultInputValue={taskValue.type}
                      id={`[${index}].type`}
                      name={`[${index}].type`}
                      onChange={(v) => {
                        setFieldValue(`[${index}].type`, v.value);
                      }}
                      options={tasksOptions}
                    />
                  </div>

                  <div className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Description
                    </Text>

                    <div className="flex gap-2">
                      <Field
                        disabled={taskValues[index].id}
                        as="textarea"
                        defaultValue={taskValue.description}
                        rows={4}
                        id={`[${index}].description`}
                        name={`[${index}].description`}
                        className={`border w-full border-gray-300 rounded-md p-2 ${
                          taskValues[index].id && "bg-[#F2F2F2] text-gray-400"
                        } `}
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={!taskValues[index].id}
                          onClick={() => {
                            console.log(values[index].description);
                            handleDelete(values, index, resetForm);
                            console.log(taskValues);
                          }}>
                          <Trash />
                        </button>

                        <SubmitButton
                          submit={() => {
                            console.log(values[index]);
                            handleSubmit(values, index);
                          }}
                          disabled={
                            !(
                              values[index]?.description && values[index]?.type
                            ) || taskValues[index].id
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex  justify-center">
                  <button
                    id="add"
                    type="button"
                    disabled={!taskValues[index].id}
                    onClick={() => {
                      setTaskValues([
                        ...taskValues,
                        { type: "", description: "" },
                      ]);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill={taskValues[index].id ? "#66BFF1" : "#999999"}
                      width="25"
                      height="25">
                      <path d="M17 9h-2v6H9v2h6v6h2v-6h6v-2h-6z"></path>
                      <path d="M16 2C8.269 2 2 8.269 2 16s6.269 14 14 14 14-6.269 14-14S23.731 2 16 2zm0 26C9.383 28 4 22.617 4 16S9.383 4 16 4s12 5.383 12 12-5.383 12-12 12z"></path>
                    </svg>{" "}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ))}
    </ExpandingBox>
  );
}
