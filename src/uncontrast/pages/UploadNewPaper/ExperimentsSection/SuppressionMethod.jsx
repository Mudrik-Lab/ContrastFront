import {
  AddFieldButton,
  ExpandingBox,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../../Utils/functions";
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";
import {
  createExperiments,
  createUncontrastExperiments,
} from "../../../../apiHooks/createExperiment";

export default function SuppressionMethod({
  fieldOptions,
  optionalSubTypes,
  experiment_pk,
  study_pk,
  values,
  minimumClassifications,
  setMinimumClassifications,
  disabled,
}) {
  const isUncontrast = true;
  const initialValues = {
    type: "",
    sub_type: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "suppression_methods";

  const handleSubmit = SubmitClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues,
    isUncontrast
  );

  const handleDelete = DeleteClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues,
    isUncontrast
  );

  useEffect(() => {
    if (values && values.length > 0) {
      setFieldValues(
        values.map((row) => {
          return {
            type: row.type,
            sub_type: row.sub_type,
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
      suppression_method: fieldsNum,
    });
  }, [fieldsNum]);

  function createSubTypeOptions(optionalSubTypes, fieldValues, index) {
    return [
      ...new Set(
        optionalSubTypes
          .filter((type) => type.parent == fieldValues[index].type)
          .map((row) => ({
            label: row.name,
            value: row.id,
          }))
      ),
    ];
  }

  const submitCondition = (index) => {
    return [
      fieldValues[index]?.type,
      fieldValues[index]?.sub_type ||
        (fieldValues[index].type &&
          createSubTypeOptions(optionalSubTypes, fieldValues, index).length ===
            0),
    ].every((condition) => Boolean(condition) === true);
  };

  // console.log(createSubTypeOptions(optionalSubTypes, fieldValues, 0).length);
  return (
    <>
      <ExpandingBox
        number={fieldsNum}
        disabled={disabled}
        headline={rawTextToShow(classificationName)}>
        {fieldValues.map((fieldValue, index) => {
          return (
            <div key={`${classificationName}-${index}`}>
              <form className="flex flex-col gap-2">
                <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex gap-2 items-start">
                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Indicate the paradigm used in the experiment to present the stimulus so it was not consciously perceived"
                          }
                          text={"Main suppression method "}
                        />

                        <CustomSelect
                          disabled={fieldValue.id}
                          value={fieldValue.type}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].type = value;
                            setFieldValues(newArray);
                            submitCondition(index) &&
                              handleSubmit(fieldValues, index);
                          }}
                          options={fieldOptions}
                        />
                      </div>

                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Choose a specific suppression method used in the experiment under the relevant suppression method class. For example."
                          }
                          text={"Specific suppression method"}
                        />

                        <CustomSelect
                          disabled={fieldValue.id}
                          value={fieldValue.sub_type}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].sub_type = value;
                            setFieldValues(newArray);
                            submitCondition(index) &&
                              handleSubmit(fieldValues, index);
                          }}
                          options={createSubTypeOptions(
                            optionalSubTypes,
                            fieldValues,
                            index
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-r-2 border-blue h-14"></div>
                  <div id="trash+submit">
                    <TrashButton
                      handleDelete={handleDelete}
                      fieldValues={fieldValues}
                      index={index}
                    />
                  </div>
                </div>
              </form>
            </div>
          );
        })}
        <AddFieldButton
          initialValues={initialValues}
          fieldValues={fieldValues}
          setFieldValues={setFieldValues}
        />
      </ExpandingBox>
    </>
  );
}
