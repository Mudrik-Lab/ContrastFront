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
  deleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../../Utils/functions";
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";

export default function Paradigms({
  fieldOptions,
  optionalParadigms,
  paradigmsSubTypes,
  disabled,
  experiment_pk,
  study_pk,
  values,
  minimumClassifications,
  setMinimumClassifications,
  notes,
}) {
  const initialValues = {
    main: "",
    specific: "",
    sub_type: "",
  };
  const [description, setDescription] = useState(notes || "");
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "paradigms";

  const handleSubmit = SubmitClassificationField(
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
            main: row.parent?.name,
            specific: row.name,
            sub_type: row.sub_type,
            id: row.id,
          };
        })
      );
    }
  }, []);

  async function uniqSubmit(index) {
    let chosenParadigm;
    if (fieldValues[index].sub_type) {
      chosenParadigm = paradigmsSubTypes.find(
        (paradigm) => paradigm.name === fieldValues[index].sub_type
      ).id;
    } else {
      chosenParadigm = optionalParadigms.find(
        (paradigm) => paradigm.name === fieldValues[index].specific
      ).id;
    }
    handleSubmit(chosenParadigm, index);
  }

  const paradigmsWithSubtype = [
    ...new Set(
      optionalParadigms
        .filter((paradigm) => paradigm.sub_type !== null)
        .map((item) => item.name)
    ),
  ];

  const submitCondition = (index) => {
    return [
      fieldValues[index]?.main,
      fieldValues[index]?.specific,
      !paradigmsWithSubtype.includes(fieldValues[index]?.specific) ||
        fieldValues[index]?.sub_type,
    ].every((condition) => Boolean(condition) === true);
  };

  const fieldsNum = fieldValues.filter((field) => field.id)?.length;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      paradigms: fieldsNum,
    });
  }, [fieldsNum]);

  return (
    <>
      <ExpandingBox
        number={fieldsNum}
        disabled={disabled}
        headline={rawTextToShow(classificationName)}>
        {fieldValues.map((fieldValue, index) => {
          return (
            <div
              key={`${classificationName}-${index}-${
                fieldValue.id ? fieldValue.id : "new"
              }`}>
              <form className="flex flex-col gap-2">
                <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                  <CircledIndex index={index} />
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex gap-2 items-start">
                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Indicate which class of paradigms/manipulations were used in the experiment using the dropdown menu. Then, choose the more specific paradigm/manipulation used, under the specified class of paradigms/manipulations. You can choose several paradigms/manipulations if more than one was used."
                          }
                          text={"Main paradigm"}
                        />

                        <CustomSelect
                          disabled={fieldValue.id}
                          value={fieldValue.main}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].main = value;
                            setFieldValues(newArray);
                            submitCondition(index) && uniqSubmit(index);
                          }}
                          options={fieldOptions}
                        />
                      </div>

                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            'Choose a specific paradigm used in the experiment under the relevant paradigm class. For example, for an experiment that used backward masking, select "Masking" as the main paradigm, and then select Backward Masking as the specific paradigm.'
                          }
                          text={"Specific paradigm"}
                        />

                        <CustomSelect
                          disabled={fieldValue.id}
                          value={fieldValue.specific}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].specific = value;
                            setFieldValues(newArray);
                            submitCondition(index) && uniqSubmit(index);
                          }}
                          options={[
                            ...new Set(
                              optionalParadigms
                                .filter(
                                  (paradigm) =>
                                    paradigm.parent === fieldValues[index].main
                                )
                                .map((row) => row.name)
                            ),
                          ].map((item) => ({ value: item, label: item }))}
                        />
                      </div>
                    </div>

                    {paradigmsWithSubtype.includes(
                      fieldValues[index].specific
                    ) && (
                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Choose a relevant type from the list below."
                          }
                          text={"Sub-Type"}
                        />

                        <CustomSelect
                          disabled={fieldValue.id}
                          value={fieldValue.sub_type}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].sub_type = value;
                            setFieldValues(newArray);
                            submitCondition(index) && uniqSubmit(index);
                          }}
                          options={optionalParadigms
                            .filter(
                              (paradigm) =>
                                paradigm.name === fieldValues[index].specific
                            )
                            .map((item) => item.sub_type)
                            .map((item) => ({ value: item, label: item }))}
                        />
                      </div>
                    )}
                  </div>
                  <div className="border-r-2 border-blue h-14"></div>
                  <div id="trash+submit">
                    <TrashButton
                      handleDelete={handleDelete}
                      fieldValues={fieldValues}
                      index={index}
                    />
                    {/* <SubmitButton
                      submit={uniqSubmit(index)}
                      disabled={!fieldValue?.specific || fieldValue.id}
                    /> */}
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
    </>
  );
}
