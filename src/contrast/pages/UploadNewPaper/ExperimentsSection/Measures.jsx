import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
  AddFieldButtononEditbleField,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import {
  deleteClassificationField,
  EditClassificationFields,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../../Utils/functions";
import { Tooltip } from "flowbite-react";
import { ReactComponent as Edit } from "../../../../assets/icons/edit-icon.svg";
import classNames from "classnames";
import { Site } from "../../../../config/siteType";

export default function Measures({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setMinimumClassifications,
  minimumClassifications,
}) {
  const initialValues = {
    type: "",
    notes: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const [editble, setEditble] = useState([]);
  useEffect(() => {
    setEditble(Array(fieldValues.length).fill(false));
  }, [fieldValues.length]);

  const classificationName = "measures";

  const handleSubmit = SubmitClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues
  );
  const handleEdit = EditClassificationFields(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues
  );

  const handleDelete = deleteClassificationField(
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

  const enableEdit = (index) => {
    setEditble((prevStates) =>
      prevStates.map((item, i) => (i === index ? !item : item))
    );
  };
  const disableAddBttns =
    !fieldValues[fieldValues.length - 1].id ||
    !editble.every((field) => !Boolean(field));

  return (
    <ExpandingBox
      number={fieldsNum}
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        const disableCondition = fieldValue.id && !editble[index];
        return (
          <div
            key={`${classificationName}-${index}-${
              fieldValue.id ? fieldValue.id : "new"
            }`}>
            <form className="flex flex-col gap-2">
              <div
                className={classNames(
                  "flex gap-2 items-center border  border-x-4 p-2 rounded-md",
                  editble[index] ? "border-flourishRed" : "border-blue"
                )}>
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
                      disabled={disableCondition}
                      value={fieldValue.type}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].type = value;
                        setFieldValues(newArray);
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
                        disabled={disableCondition}
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
                          disableCondition && "bg-grayDisable text-gray-400"
                        } `}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-r-2 border-blue h-24"></div>
                <div
                  className="flex flex-col items-center gap-6"
                  id="trash+submit">
                  <TrashButton
                    disabled={!editble.every((field) => !Boolean(field))}
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  {!disableCondition && (
                    <SubmitButton
                      submit={async () => {
                        if (!editble[index]) {
                          handleSubmit(fieldValues, index);
                        } else {
                          const res = await handleEdit(fieldValue, index);
                          res && enableEdit(index);
                        }
                      }}
                      disabled={!fieldValue?.type || disableCondition}
                    />
                  )}
                  {disableCondition && (
                    <Tooltip animation content="Edit" trigger="hover">
                      <button
                        type="button"
                        onClick={() => {
                          enableEdit(index);
                        }}>
                        <Edit className="w-6 h-6" />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </form>
          </div>
        );
      })}
      <AddFieldButtononEditbleField
        fieldName={"measures"}
        editble={editble}
        disableAddBttns={disableAddBttns}
        initialValues={initialValues}
        fieldValues={fieldValues}
        setFieldValues={setFieldValues}
      />
    </ExpandingBox>
  );
}
