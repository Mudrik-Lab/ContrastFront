import {
  ExpandingBox,
  TooltipExplanation,
  CustomSelect,
  CircledIndex,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import { rawTextToShow } from "../../../../Utils/functions";
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";
import { createUncontrastExperiments } from "../../../../apiHooks/createExperiment";

export default function Paradigms({
  fieldOptions,
  optionalParadigms,
  experiment_pk,
  study_pk,
  values,
  minimumClassifications,
  setMinimumClassifications,
  setExperimentID,
  experimentID,
}) {
  const initialValues = {
    main: "",
    specific: "",
  };
  const [description, setDescription] = useState(values?.paradigms || "");

  const [fieldValues, setFieldValues] = useState(initialValues);
  const classificationName = "paradigms";

  useEffect(() => {
    if (values?.id) {
      setFieldValues({
        main: values.main,
        specific: values.id,
        id: values.id,
      });
    }
  }, []);

  const fieldsNum = fieldValues.id ? 1 : 0;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      paradigms: fieldsNum,
    });
  }, [fieldsNum]);
  console.log(fieldValues);
  return (
    <>
      <ExpandingBox
        number={fieldsNum}
        disabled={false}
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
                      disabled={experimentID}
                      value={fieldValues.main}
                      onChange={(value) => {
                        const newObj = { ...fieldValues };
                        newObj.main = value;
                        setFieldValues(newObj);
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
                      disabled={experimentID}
                      value={fieldValues.specific}
                      onChange={async (value) => {
                        console.log("onChang", value);
                        const newObj = { ...fieldValues };
                        newObj.specific = value;
                        setFieldValues(newObj);
                        let res = await createUncontrastExperiments({
                          study_pk,
                          chosenParadigm: value,
                        });
                        console.log(res);
                        res.status === 201 && setExperimentID(res.data.id);
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
