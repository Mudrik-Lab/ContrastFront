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
} from "../../../../Utils/functions";
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";

export default function ConsciousnessMeasures({
  fieldOptions,
  analysisPhaseOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  minimumClassifications,
  setMinimumClassifications,
}) {
  const initialValues = {
    type: "",
    phase: "",
    description: "",
  };
  const [description, setDescription] = useState(
    values?.consciousness_measures_notes || ""
  );
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "consciousness_measures";

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
    if (values && values.consciousness_measures.length > 0) {
      setFieldValues(
        values.consciousness_measures.map((row) => {
          return {
            type: row.type,
            phase: row.phase,
            id: row.id,
          };
        })
      );
    }
  }, []);

  const submitCondition = (index) => {
    return fieldValues[index]?.type && fieldValues[index]?.phase;
  };
  const fieldsNum = fieldValues.filter((field) => field.id)?.length;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      consciousnessMeasures: fieldsNum,
    });
  }, [fieldsNum]);

  return (
    <ExpandingBox
      number={fieldsNum}
      disabled={disabled}
      headline={"Consciousness Measures"}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />
                <div className="flex gap-2 items-start w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex gap-2">
                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Indicate what type of consciousness measure was taken."
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
                            "Indicate at which stage of the experiment the consciousness measure is taken."
                          }
                          text={"Phase"}
                        />
                        <CustomSelect
                          disabled={fieldValue.id}
                          value={fieldValue.phase}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].phase = value;
                            setFieldValues(newArray);
                            submitCondition(index) &&
                              handleSubmit(fieldValues, index);
                          }}
                          options={analysisPhaseOptions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-r-2 border-blue h-24"></div>
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
