import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  YoavSelect,
} from "../../../components/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";

export default function Paradigms({
  filedOptions,
  optionalParadigms,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([
    {
      main: "",
      specific: "",
    },
  ]);
  const classificationName = "paradigm";

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
          return { main: row.parent.name, specific: row.id, id: row.id };
        })
      );
    }
  }, []);

  return (
    <>
      <ExpandingBox
        disabled={disabled}
        headline={rawTextToShow(classificationName)}>
        {fieldValues.map((fieldValue, index) => {
          return (
            <div key={`${classificationName}-${index}`}>
              <form className="flex flex-col gap-2">
                <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                  <div id="index" className="w-4">
                    <Text weight={"bold"} color={"blue"}>
                      {index + 1}
                    </Text>
                  </div>

                  <div className="flex gap-2 items-start">
                    <div id="field1" className="w-full">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Indicate which class of paradigms/manipulations were used in the experiment using the dropdown menu. Then, choose the more specific paradigm/manipulation used, under the specified class of paradigms/manipulations. You can choose several paradigms/manipulations if more than one was used."
                        }
                        text={"Main paradigm"}
                      />

                      <YoavSelect
                        disabled={fieldValue.id}
                        value={fieldValue.main}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].main = value;
                          setFieldValues(newArray);
                        }}
                        options={filedOptions}
                      />
                    </div>

                    <div id="field2" className="w-full">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          'Choose a specific paradigm used in the experiment under the relevant paradigm class. For example, for an experiment that used backward masking, select "Masking" as the main paradigm, and then select Backward Masking as the specific paradigm.'
                        }
                        text={"Specigic paradigm"}
                      />

                      <YoavSelect
                        disabled={fieldValue.id}
                        value={fieldValue.specific}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].specific = value;
                          setFieldValues(newArray);
                        }}
                        options={optionalParadigms
                          .filter(
                            (paradigm) =>
                              paradigm.parent === fieldValues[index]?.main
                          )
                          .map((item) => ({
                            label: item.name,
                            value: item.id,
                          }))}
                      />
                    </div>
                  </div>

                  <div id="trash+submit" className="flex gap-2">
                    <TrashButton
                      handleDelete={handleDelete}
                      fieldValues={fieldValues}
                      index={index}
                    />
                    <SubmitButton
                      submit={() => {
                        handleSubmit(fieldValues[index].specific, index);
                      }}
                      disabled={!fieldValue?.specific || fieldValue.id}
                    />
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
      </ExpandingBox>
    </>
  );
}
