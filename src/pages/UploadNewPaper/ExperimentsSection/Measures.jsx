import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
} from "../../../../shared/Reusble.jsx";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";
import { Tooltip } from "flowbite-react";

export default function Measures({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setMinimumClassifications,
  minimumClassifications,
}) {
  const [fieldValues, setFieldValues] = useState([
    {
      type: "",
      notes: "",
    },
  ]);
  const classificationName = "measures";

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
    if (values && values.length > 0) {
      setFieldValues(
        values.map((row) => {
          return {
            type: row.type,
            notes: row.notes,
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
      measures: fieldsNum,
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
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />

                <div className="w-full flex gap-2 items-start">
                  <div className="w-full">
                    <TooltipExplanation
                      isHeadline
                      tooltip={
                        "Choose all of the measures and analyses that were used to measure effects that are related to consciousness. For example, for an experiment testing for BOLD signal effects chose 'BOLD'."
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
                        // fieldValue?.notes &&
                        //   fieldValue?.type &&
                        //   handleSubmit(fieldValues, index);
                      }}
                      options={fieldOptions}
                    />
                  </div>

                  <div className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Notes (optional)
                    </Text>

                    <div className="flex gap-2">
                      <textarea
                        disabled={fieldValues[index].id}
                        type="textarea"
                        defaultValue={fieldValue.notes}
                        rows={4}
                        onChange={(e) => {
                          setFieldValues((prev) =>
                            prev.map((item, i) =>
                              i === index
                                ? { ...item, notes: e.target.value }
                                : item
                            )
                          );
                        }}
                        className={`border w-full border-gray-300 rounded-md p-2 ${
                          fieldValues[index].id &&
                          "bg-grayDisable text-gray-400"
                        } `}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-r-2 border-blue h-24"></div>
                <div
                  className="flex flex-col items-center gap-1"
                  id="trash+submit">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={!fieldValue?.type || fieldValue.id}
                  />
                </div>
              </div>
            </form>
          </div>
        );
      })}
      <div className="w-full flex justify-center">
        <Tooltip
          placement="top"
          content={
            fieldValues[fieldValues.length - 1].id
              ? "Add measures field"
              : "Add another measures field is abled after clicking save button on right side of the field"
          }>
          <AddFieldButton
            fieldValues={fieldValues}
            setFieldValues={setFieldValues}
          />
        </Tooltip>
      </div>
    </ExpandingBox>
  );
}
