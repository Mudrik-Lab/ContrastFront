import {
  ExpandingBox,
  Spacer,
  SubmitButton,
  Text,
  ToastBox,
  YoavSelect,
} from "../../../components/Reusble";

import { useState } from "react";
import { addFieldToexperiment } from "../../../apiHooks/createExperiment";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import { deleteFieldFromExperiments } from "../../../apiHooks/deleteExperiment";
import { toast } from "react-toastify";
import { rawTextToShow } from "../../../Utils/functions";
import Tasks from "./Tasks";

export default function Classification({
  tasksOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([values]);
  const classificationName = "tasks";

  const handleSubmit = async (values, index) => {
    console.log(values);
    try {
      const res = await addFieldToexperiment({
        field: values[index],
        study_pk,
        experiment_pk,
        field_name: classificationName,
      });
      if (res.status === 201) {
        toast.success(
          <ToastBox
            headline={"Success"}
            text={`Added ${classificationName.slice(0, -1)} classification`}
          />
        );
        const newArr = [...fieldValues];
        newArr[index] = res.data;
        setFieldValues(newArr);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (values, index) => {
    try {
      const res = await deleteFieldFromExperiments({
        study_pk,
        experiment_pk,
        field_name: classificationName,
        id: values[index].id,
      });
      console.log(index);
      if (res.status === 204) {
        if (fieldValues.length !== 1) {
          const newArr = [...fieldValues];
          newArr.splice(index, 1);
          setFieldValues(newArr);
        } else {
          setFieldValues([
            { type: "", description: "", key: Math.round(Math.random() * 101) },
          ]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

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

                <Tasks
                  fieldValue={fieldValue}
                  fieldValues={fieldValues}
                  index={index}
                  setFieldValues={setFieldValues}
                  tasksOptions={tasksOptions}
                />

                <div id="trash+submit" className="flex gap-2">
                  <button
                    type="button"
                    disabled={!fieldValue.id}
                    onClick={() => {
                      handleDelete(fieldValues, index);
                    }}>
                    <Trash />
                  </button>

                  <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={
                      !(fieldValue?.description && fieldValue?.type) ||
                      fieldValue.id
                    }
                  />
                </div>
              </div>
            </form>
          </div>
        );
      })}

      <div className="w-full flex  justify-center">
        <button
          id="add"
          type="button"
          disabled={!fieldValues[fieldValues.length - 1].id}
          onClick={() => {
            setFieldValues([
              ...fieldValues,
              {
                type: "",
                description: "",
                key: Math.round(Math.random() * 150),
              },
            ]);
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            // fill={taskValues[index].id ? "#66BFF1" : "#999999"}
            fill={"#66BFF1"}
            width="25"
            height="25">
            <path d="M17 9h-2v6H9v2h6v6h2v-6h6v-2h-6z"></path>
            <path d="M16 2C8.269 2 2 8.269 2 16s6.269 14 14 14 14-6.269 14-14S23.731 2 16 2zm0 26C9.383 28 4 22.617 4 16S9.383 4 16 4s12 5.383 12 12-5.383 12-12 12z"></path>
          </svg>{" "}
        </button>
      </div>
    </ExpandingBox>
  );
}
