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

export default function Findings({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const initialValues = {
    outcome: "",
    importance: "",
    significance: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const classificationName = "finding_tags";

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
            outcome: row.outcome,
            importance: row.importance,
            significance: row.significance,
            id: row.id,
          };
        })
      );
    }
  }, []);

  const submitConditions = (index) => {
    return true;
  };

  return (
    <ExpandingBox
      number={
        Object.values(fieldValues[0])[0] === ""
          ? fieldValues.length - 1
          : fieldValues.length
      }
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
          <div key={`${classificationName}-${index}`}>
            <form className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />

                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full gap-2 flex">
                    <div className="w-1/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Outcome
                      </Text>
                    </div>
                    <div className="w-2/3 flex items-center gap-2">
                      <CustomSelect
                        disabled={fieldValue?.id}
                        value={fieldValue.outcome}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].outcome = value;
                          setFieldValues(newArray);
                        }}
                        options={fieldOptions}
                      />
                      <TooltipExplanation
                        text={""}
                        tooltip={
                          " Indicate the dependent variable that was measured and analyzed for this effect."
                        }
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
                        value={fieldValue.significance}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].significance = value;
                          setFieldValues(newArray);
                        }}
                        options={[
                          { value: true, label: "True" },
                          { value: false, label: "False" },
                        ]}
                      />

                      <TooltipExplanation
                        tooltip={
                          "If this finding is interpreted as an NCC, select “True”. If this finding is reported not to be an NCC (e.g., it is not found under a no-report paradigm, where participants were conscious of the stimulus), indicate “False”."
                        }
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
                        value={fieldValue.importance}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].importance = value;
                          setFieldValues(newArray);
                        }}
                        options={[
                          { value: true, label: "True" },
                          { value: false, label: "False" },
                        ]}
                      />

                      <TooltipExplanation
                        tooltip={
                          "If this finding is interpreted as an NCC, select “True”. If this finding is reported not to be an NCC (e.g., it is not found under a no-report paradigm, where participants were conscious of the stimulus), indicate “False”."
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Text weight={"bold"} color={"grayReg"}>
                      Notes (optional)
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
                <div className="border-r-2 border-blue h-24"></div>
                <div id="trash+submit">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  <SubmitButton
                    submit={() => {
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={!submitConditions(index) || fieldValue.id}
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
