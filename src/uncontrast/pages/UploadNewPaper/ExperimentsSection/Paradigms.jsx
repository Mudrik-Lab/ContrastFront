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

export default function Paradigms({
  fieldOptions,
  optionalParadigms,
  experiment_pk,
  study_pk,
  values,
  minimumClassifications,
  setMinimumClassifications,
  disabled,
}) {
  const initialValues = {
    main: "",
    specific: "",
  };
  const [description, setDescription] = useState(values?.paradigms || "");
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "paradigms";

  const handleDelete = DeleteClassificationField(
    study_pk,
    experiment_pk,
    classificationName,
    fieldValues,
    setFieldValues
  );

  useEffect(() => {
    if (values.id) {
      setFieldValues({
        main: values.name,
        specific: values.name,
        id: values.id,
      });
    }
  }, []);
  async function uniqSubmit() {
    let chosenParadigm = fieldValues.specific;
    createUncontrastExperiments({ study_pk, chosenParadigm });
  }

  const submitCondition = () => {
    return [fieldValues?.main, fieldValues?.specific].every(
      (condition) => Boolean(condition) === true
    );
  };

  const fieldsNum = fieldValues.id ? 1 : 0;
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
        <div key={`${classificationName}`}>
          <form className="flex flex-col gap-2">
            <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
              <CircledIndex index={0} />
              <div className="w-full flex flex-col gap-2">
                <div className="flex gap-2 items-start">
                  <div className="w-full">
                    <TooltipExplanation
                      isHeadline
                      tooltip={
                        "Indicate which class of paradigms/manipulations were used in the experiment using the dropdown menu. Then, choose the more specific paradigm/manipulation used, under the specified class of paradigms/manipulations. You can choose several paradigms/manipulations if more than one was used."
                      }
                      text={"Main paradigm "}
                    />

                    <CustomSelect
                      disabled={fieldValues.id}
                      value={fieldValues.main}
                      onChange={(value) => {
                        const newObj = { ...fieldValues };
                        newObj.main = value;
                        setFieldValues(newObj);
                        submitCondition() && uniqSubmit();
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
                      disabled={fieldValues.id}
                      value={fieldValues.specific}
                      onChange={(value) => {
                        const newObj = { ...fieldValues };
                        newObj.specific = value;
                        setFieldValues(newObj);
                        submitCondition(index) && uniqSubmit(index);
                      }}
                      options={[
                        ...new Set(
                          optionalParadigms
                            .filter(
                              (paradigm) => paradigm.main == fieldValues.main
                            )
                            .map((row) => ({
                              label: row.name,
                              value: row.id,
                            }))
                        ),
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

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
