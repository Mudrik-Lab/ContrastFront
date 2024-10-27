import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  alphabetizeByLabels,
} from "../../../../Utils/functions";
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";

export default function Findings({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setMinimumClassifications,
  minimumClassifications,
}) {
  const isUncontrast = true;
  const initialValues = {
    outcome: "",
    is_important: "",
    is_significant: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const [description, setDescription] = useState(values?.finding_notes || "");
  const classificationName = "findings";

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
            outcome: row.outcome,
            is_important: row.is_important,
            is_significant: row.is_significant,
            id: row.id,
          };
        })
      );
    }
  }, []);

  const submitCondition = (index) => {
    return (
      fieldValues[index].outcome &&
      fieldValues[index].is_important &&
      fieldValues[index].is_significant
    );
  };

  const fieldsNum = fieldValues.filter((field) => field.id)?.length;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      findings: fieldsNum,
    });
  }, [fieldsNum]);

  return (
    <ExpandingBox
      number={fieldsNum}
      disabled={disabled}
      headline={
        <div className="flex gap-2">
          <Text weight={"bold"}>Experiment's Findings</Text>
          <TooltipExplanation
            blackHeadline
            hover
            tooltip={
              " Indicate all the findings in the experiment that pertain to the processing of the suppressed stimuli"
            }
          />
        </div>
      }>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div
            key={`${classificationName}-${index}-${
              fieldValue.id ? fieldValue.id : "new"
            }`}>
            <form className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />

                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full gap-2 flex items-center">
                    <div className="w-1/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Outcome
                      </Text>
                    </div>
                    <div className="w-2/3 flex items-center gap-2">
                      <TooltipExplanation
                        text={""}
                        tooltip={
                          " Indicate the dependent variable that was measured and analyzed for this effect."
                        }
                      />
                      <CustomSelect
                        disabled={fieldValue?.id}
                        value={fieldValue.outcome}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].outcome = value;
                          setFieldValues(newArray);
                          submitCondition(index) &&
                            handleSubmit(fieldValues, index);
                        }}
                        options={fieldOptions}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 w-full items-center">
                    <div className="w-2/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Is the effect reported as significant?
                      </Text>
                    </div>
                    <div className="w-1/3 flex justify-between items-center gap-2">
                      <CustomSelect
                        disabled={fieldValue?.id}
                        value={fieldValue.is_significant}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].is_significant = value;
                          setFieldValues(newArray);
                          submitCondition(index) &&
                            handleSubmit(fieldValues, index);
                        }}
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 w-full items-center">
                    <div className="w-2/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Is the finding important?
                      </Text>
                    </div>
                    <div className="w-1/3 flex justify-between items-center gap-2">
                      <CustomSelect
                        disabled={fieldValue?.id}
                        value={fieldValue.is_important}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].is_important = value;
                          setFieldValues(newArray);
                          submitCondition(index) &&
                            handleSubmit(fieldValues, index);
                        }}
                        options={[
                          { value: true, label: "Yes" },
                          { value: false, label: "No" },
                        ]}
                      />
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
        rows={6}
        isUncontrast={isUncontrast}
        description={description}
        setDescription={setDescription}
        classification={"experiment_findings"}
        study_pk={study_pk}
        experiment_pk={experiment_pk}
      />
    </ExpandingBox>
  );
}
