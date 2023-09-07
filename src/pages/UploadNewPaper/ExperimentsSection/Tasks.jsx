import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
  ToastBox,
  ToastErrorBox,
} from "../../../components/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  alphabetizeByLabels,
  rawTextToShow,
} from "../../../Utils/functions";
import { setNotes } from "../../../apiHooks/setNotes";
import { toast } from "react-toastify";

export default function Tasks({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [description, setDescription] = useState(values.tasks_notes || "");
  const [fieldValues, setFieldValues] = useState([
    {
      type: "",
    },
  ]);
  const classificationName = "tasks";

  console.log(values);
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

  const handleNotes = async () => {
    try {
      const res = await setNotes({
        study_pk,
        experiment_pk,
        note: description,
        classification: "set_tasks_notes",
      });
      if (res.status === 201) {
        toast.success(
          <ToastBox
            headline={"Success"}
            text={"Task's notes were added successfully"}
          />
        );
      }
    } catch (e) {
      console.log(e);
      toast.error(
        <ToastErrorBox errors={e?.response.data || "Error occurred"} />
      );
    }
  };

  useEffect(() => {
    if (values.tasks && values.tasks.length > 0) {
      setFieldValues(
        values.tasks.map((row) => {
          return {
            type: row.type,
            id: row.id,
          };
        })
      );
    }
  }, []);
  return (
    <ExpandingBox
      number={
        Object.values(fieldValues[0])[0] === ""
          ? fieldValues.length - 1
          : fieldValues.length
      }
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className=" flex flex-col gap-2">
              <div className=" flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />

                <div className="w-full flex gap-2 items-start">
                  <div className="w-full">
                    <TooltipExplanation
                      isHeadline
                      tooltip={
                        "Enter the type of tasks used in the experiment. Enter 'No Task' if no task was used."
                      }
                      text={"Type"}
                    />
                    <CustomSelect
                      disabled={fieldValue.id}
                      value={fieldValue.type}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].type = value;
                        setFieldValues(newArray);
                      }}
                      options={alphabetizeByLabels(fieldOptions)}
                    />
                  </div>
                </div>
                <div className="border-r-2 border-blue h-24"></div>
                <div id="trash+submit">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  <SubmitButton submit={handleSubmit} />
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
      <form action="submit">
        <div className=" flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
          <div className="w-full">
            <Text weight={"bold"} color={"grayReg"}>
              Notes
            </Text>

            <div className="flex gap-2">
              <textarea
                defaultValue={description}
                rows={2}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className={`border w-full border-gray-300 rounded-md p-2 `}
              />
            </div>
          </div>
          <div className="border-r-2 border-blue h-24"></div>
          <div id="trash+submit">
            <SubmitButton submit={handleNotes} />
          </div>
        </div>
      </form>
    </ExpandingBox>
  );
}
