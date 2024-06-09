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
  alphabetizeByLabels,
  rawTextToShow,
} from "../../../../Utils/functions";

export default function ProcessingDomain({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setMinimumClassifications,
  minimumClassifications,
}) {
  const isUncontrast = true;
  const initialValues = { main: "" };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "processing_domains";

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
    if (values?.processing_domains && values.processing_domains.length > 0) {
      setFieldValues(
        values.processing_domains.map((row) => {
          return {
            main: row.main,
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
      processing_domains: fieldsNum,
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
                        "Indicate which domains the processing involved. You may choose more than one option"
                      }
                      text={"Main Processing Domain"}
                    />
                    <CustomSelect
                      disabled={fieldValue.id}
                      value={fieldValue.main}
                      onChange={(value) => {
                        const newArray = [...fieldValues];
                        newArray[index].main = value;
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
  );
}
