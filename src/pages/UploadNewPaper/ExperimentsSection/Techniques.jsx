import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
  CircledIndex,
} from "../../../components/Reusble";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";

export default function Techniques({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
  setTechniques,
}) {
  const [fieldValues, setFieldValues] = useState([
    {
      technique: "",
    },
  ]);
  const classificationName = "techniques";

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
            technique: row.id,
            id: row.id,
          };
        })
      );
    }
  }, []);
  return (
    <ExpandingBox
      number={
        Object.values(fieldValues[0])[0] === ""
          ? fieldValues.length - 1
          : fieldValues.length
      }
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-4 items-center  border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />

                <div className="w-full">
                  <TooltipExplanation
                    isHeadline
                    tooltip={
                      "Choose the neuroscientific techniques used in the experiment. If this was a behavioral experiment, simply choose ‘behavior’."
                    }
                    text={"Technique"}
                  />
                  <CustomSelect
                    disabled={fieldValue.id}
                    value={fieldValue.technique}
                    onChange={(value) => {
                      const newArray = [...fieldValues];
                      newArray[index].technique = value;
                      setFieldValues(newArray);
                    }}
                    options={fieldOptions}
                  />
                </div>
                <div className="border-r-2 border-blue h-14"></div>
                <div id="trash+submit">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  <SubmitButton
                    submit={async () => {
                      console.log(fieldValues[index].technique, {
                        fieldOptions,
                      });
                      const res = await handleSubmit(
                        fieldValues[index].technique,
                        index
                      );
                      res &&
                        setTechniques((prev) => [
                          ...prev,
                          fieldOptions.find(
                            (option) =>
                              option.value == fieldValues[index].technique
                          ),
                        ]);
                    }}
                    disabled={!fieldValue?.technique || fieldValue.id}
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
  );
}
