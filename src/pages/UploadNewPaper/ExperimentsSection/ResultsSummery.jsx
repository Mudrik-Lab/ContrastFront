import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TrashButton,
  CircledIndex,
} from "../../../components/Reusble";
import { useEffect, useState } from "react";

import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";

export default function ResultsSummery({
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([{ notes: "" }]);
  const classificationName = "Results Summery";

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
            notes: row.notes,
          };
        })
      );
    }
  }, []);
  return (
    <ExpandingBox
      number={fieldValues.length}
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      {fieldValues.map((fieldValue, index) => {
        return (
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />
                <div className="w-full flex gap-2 items-start">
                  <div className="w-full">
                    <Text weight={"bold"} color={"grayReg"}>
                      Notes
                    </Text>
                    <textarea
                      disabled={fieldValues[index].id}
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
                        fieldValues[index].id && "bg-grayDisable text-gray-400"
                      } `}
                    />
                  </div>
                </div>

                <div id="trash+submit" className=" flex gap-2">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={!(fieldValue?.notes !== "")}
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
