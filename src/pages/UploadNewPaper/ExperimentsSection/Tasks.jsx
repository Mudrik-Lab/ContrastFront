import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
} from "../../../components/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  alphabetizeByLabels,
  rawTextToShow,
} from "../../../Utils/functions";
import ExternalNotes from "../../../components/ExternalNotes";

export default function Tasks({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setMinimumClassifications,
  minimumClassifications,
}) {
  const [description, setDescription] = useState(values?.tasks_notes || "");
  const [fieldValues, setFieldValues] = useState([{ type: "" }]);
  const classificationName = "tasks";

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
    if (values?.tasks && values.tasks.length > 0) {
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
  const fieldsNum = fieldValues.filter((field) => field.id)?.length;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      tasks: fieldsNum,
    });
  }, [fieldsNum]);

  return (
    <ExpandingBox
      number={fieldsNum}
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
                        handleSubmit(fieldValues, index);
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
                  {/* <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                  /> */}
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
      <ExternalNotes
        description={description}
        setDescription={setDescription}
        classification={classificationName}
        study_pk={study_pk}
        experiment_pk={experiment_pk}
      />
    </ExpandingBox>
  );
}
