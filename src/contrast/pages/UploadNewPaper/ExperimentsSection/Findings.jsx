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
  EditClassificationFields,
  SubmitClassificationField,
  alphabetizeByLabels,
} from "../../../../Utils/functions";
import { Tooltip } from "flowbite-react";
import { ReactComponent as Edit } from "../../../../assets/icons/edit-icon.svg";

export default function Findings({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const initialValues = {
    technique: "",
    family: "",
    type: "",
  };
  const [fieldValues, setFieldValues] = useState([initialValues]);
  const [editble, setEditble] = useState([]);
  useEffect(() => {
    setEditble(Array(fieldValues.length).fill(false));
  }, [fieldValues.length]);

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

  const handleEdit = EditClassificationFields(
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
            family: row.family,
            type: row.type,
            technique: row.technique,
            onset: row.onset,
            offset: row.offset,
            direction: row.direction,
            is_NCC: row.is_NCC,
            band_lower_bound: row.band_lower_bound,
            band_higher_bound: row.band_higher_bound,
            AAL_atlas_tag: row.AAL_atlas_tag,
            notes: row.notes,
            analysis_type: row.analysis_type,
            id: row.id,
          };
        })
      );
    }
  }, []);

  const families = fieldOptions.findingTagsFamilies.reduce((result, item) => {
    result[item.label] = item.value;
    return result;
  }, {});

  const submitConditions = (index) => {
    const field = fieldValues[index];
    if (!(field?.type && field?.family && field.technique && field.is_NCC)) {
      return false;
    }
    if (field?.family == families["Temporal"]) {
      return [field.onset, field?.offset].every(
        (condition) => Boolean(condition) === true
      );
    }

    if (field?.family == families["Spatial Areas"] && field?.technique == 4) {
      return [field.AAL_atlas_tag].every(
        (condition) => Boolean(condition) === true
      );
    }
    if (field?.family == families["Frequency"]) {
      return [
        field.direction,
        field.onset,
        field.offset,
        field.band_higher_bound,
        field.band_lower_bound,
        field.analysis_type,
      ].every((condition) => Boolean(condition) === true);
    }
    return true;
  };

  const enableEdit = (index) => {
    setEditble((prevStates) =>
      prevStates.map((item, i) => (i === index ? !item : item))
    );
  };

  const disableAddBttns =
    !fieldValues[fieldValues.length - 1].id ||
    !editble.every((field) => !Boolean(field));

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
              "Indicate all the Neural Correlations of Consciousness found in the experiment. If the experiment used multiple Neuroscientific techniques, enter which technique was used to obtain the specific finding."
            }
          />
        </div>
      }>
      {fieldValues.map((fieldValue, index) => {
        const disableCondition = fieldValue.id && !editble[index];
        return (
          <div
            key={`${classificationName}-${index}-${
              fieldValue.id ? fieldValue.id : "new"
            }`}>
            <form className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />

                <div className="flex flex-col gap-2 w-full">
                  <div className="w-full gap-2 flex">
                    <div className="w-1/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Technique
                      </Text>
                    </div>
                    <div className="w-2/3 flex items-center gap-2">
                      <CustomSelect
                        disabled={disableCondition}
                        value={fieldValue.technique}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].technique = value;
                          setFieldValues(newArray);
                        }}
                        options={alphabetizeByLabels(
                          // triming the list of option so no duplicated options
                          fieldOptions.techniquesOptions.filter(
                            (obj, index, self) =>
                              index ===
                              self.findIndex(
                                (t) =>
                                  t.value === obj.value && t.label === obj.label
                              )
                          )
                        )}
                      />
                      <TooltipExplanation
                        text={""}
                        tooltip={
                          "Choose the technique used to obtain this finding."
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full gap-2 flex">
                    <div className="w-1/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Family
                      </Text>
                    </div>
                    <div className="w-2/3 flex items-center gap-2">
                      <CustomSelect
                        disabled={disableCondition}
                        value={fieldValue.family}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].family = value;
                          setFieldValues(newArray);
                        }}
                        options={fieldOptions.findingTagsFamilies}
                      />
                      <TooltipExplanation
                        tooltip={
                          "Choose to which domain the finding belongs. If it is not a Temporal, Spatial or Frequency, choose Miscellaneous."
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full gap-2 flex">
                    <div className="w-1/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Type
                      </Text>
                    </div>
                    <div className="w-2/3  flex items-center gap-2">
                      <CustomSelect
                        disabled={disableCondition}
                        value={fieldValue.type}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].type = value;
                          setFieldValues(newArray);
                        }}
                        // options={alphabetizeByLabels(fieldOptions.findingTypes)}
                        options={fieldOptions.findingTypes.filter(
                          (type) => type.family == fieldValues[index]?.family
                        )}
                      />
                      <TooltipExplanation
                        text={""}
                        tooltip={
                          "Choose the specific type of NCC finding within the domain you defined."
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 w-full items-center">
                    <div className="w-1/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Is NCC?
                      </Text>
                    </div>
                    <div className="w-2/3 flex justify-between items-center gap-2">
                      <CustomSelect
                        disabled={disableCondition}
                        value={fieldValue.is_NCC}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].is_NCC = value;
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

                  {fieldValue.family == families["Temporal"] ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Onset
                          </Text>
                        </div>
                        <div className="w-2/3 flex gap-2 items-center">
                          <input
                            disabled={disableCondition}
                            type="number"
                            name="onset"
                            min={0}
                            defaultValue={fieldValue.onset}
                            onChange={(e) => {
                              setFieldValues((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, onset: e.target.value }
                                    : item
                                )
                              );
                            }}
                            className={`border w-full border-gray-300 rounded-md p-2 ${
                              disableCondition && "bg-grayDisable text-gray-400"
                            } `}
                          />
                          <Text weight={"bold"} color={"grayReg"}>
                            (ms)
                          </Text>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Offset
                          </Text>
                        </div>
                        <div className="w-2/3 flex gap-2 items-center">
                          <input
                            disabled={disableCondition}
                            type="number"
                            min={0}
                            defaultValue={fieldValue.offset}
                            onChange={(e) => {
                              setFieldValues((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, offset: e.target.value }
                                    : item
                                )
                              );
                            }}
                            className={`border w-full border-gray-300 rounded-md p-2 ${
                              disableCondition && "bg-grayDisable text-gray-400"
                            } `}
                          />
                          <Text weight={"bold"} color={"grayReg"}>
                            (ms)
                          </Text>
                        </div>
                      </div>
                    </div>
                  ) : fieldValue.family == families["Spatial Areas"] &&
                    fieldValue.technique == 4 ? ( //technique==4 =>"fMRI"
                    <div className="flex gap-2 w-full">
                      <div className="w-1/3">
                        <Text weight={"bold"} color={"grayReg"}>
                          AAL atlas tag
                        </Text>
                      </div>
                      <div className="w-2/3">
                        <CustomSelect
                          disabled={disableCondition}
                          value={fieldValue.AAL_atlas_tag}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].AAL_atlas_tag = value;
                            setFieldValues(newArray);
                          }}
                          options={alphabetizeByLabels(fieldOptions.AALOptions)}
                        />
                      </div>
                      <TooltipExplanation
                        tooltip={
                          'Please indicate the area relevant to this finding according to the AAL Atlas. If there is more than one relevant area, choose one here and add the rest in the "Notes" field below.'
                        }
                      />
                    </div>
                  ) : fieldValue.family == families["Frequency"] ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 w-full items-center">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Direction
                          </Text>
                        </div>
                        <div className="w-2/3 flex justify-between items-center gap-2">
                          <CustomSelect
                            disabled={disableCondition}
                            value={fieldValue.direction}
                            onChange={(value) => {
                              const newArray = [...fieldValues];
                              newArray[index].direction = value;
                              setFieldValues(newArray);
                            }}
                            options={[
                              { value: "positive", label: "Positive" },
                              { value: "negative", label: "Negative" },
                            ]}
                          />

                          <TooltipExplanation
                            tooltip={
                              " If for this finding, its presence is associated with consciousness, mark it as “Positive”. If its absence is associated with consciousness, mark it as “Negative”."
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 w-full">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Band lower bound
                          </Text>
                        </div>
                        <div className="w-2/3 flex gap-1 items-center">
                          <input
                            disabled={disableCondition}
                            type="number"
                            min={0}
                            defaultValue={fieldValue.band_lower_bound}
                            onChange={(e) => {
                              setFieldValues((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? {
                                        ...item,
                                        band_lower_bound: e.target.value,
                                      }
                                    : item
                                )
                              );
                            }}
                            className={`border w-full border-gray-300 rounded-md p-2 ${
                              disableCondition && "bg-grayDisable text-gray-400"
                            } `}
                          />
                          <Text weight={"bold"} color={"grayReg"}>
                            (Hz)
                          </Text>
                          <TooltipExplanation
                            tooltip={
                              "specify the bounds of the effect: for an effect that was found between 100-300ms fill 100 in the lower bound and 300 in the upper bound."
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 w-full">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Band higher bound
                          </Text>
                        </div>
                        <div className="w-2/3 flex gap-1 items-center">
                          <input
                            disabled={disableCondition}
                            type="number"
                            min={0}
                            defaultValue={fieldValue.band_higher_bound}
                            onChange={(e) => {
                              setFieldValues((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? {
                                        ...item,
                                        band_higher_bound: e.target.value,
                                      }
                                    : item
                                )
                              );
                            }}
                            className={`border w-full border-gray-300 rounded-md p-2 ${
                              disableCondition && "bg-grayDisable text-gray-400"
                            } `}
                          />
                          <Text weight={"bold"} color={"grayReg"}>
                            (Hz)
                          </Text>
                          <TooltipExplanation
                            tooltip={
                              "specify the bounds of the effect: for an effect that was found between 100-300ms fill 100 in the lower bound and 300 in the upper bound."
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 w-full">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Analysis Type
                          </Text>
                        </div>
                        <div className="w-2/3 flex items-center gap-2">
                          <CustomSelect
                            disabled={disableCondition}
                            value={fieldValue.analysis_type}
                            onChange={(value) => {
                              const newArray = [...fieldValues];
                              newArray[index].analysis_type = value;
                              setFieldValues(newArray);
                            }}
                            options={alphabetizeByLabels(
                              fieldOptions.analysisTypeOptions
                            )}
                          />
                          <TooltipExplanation
                            tooltip={
                              "Which analysis type was performed to obtain this finding?"
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 w-full items-center">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Onset
                          </Text>
                        </div>
                        <div className="w-2/3 flex gap-1 items-center">
                          <input
                            disabled={disableCondition}
                            type="number"
                            min={0}
                            name="onset"
                            defaultValue={fieldValue.onset}
                            onChange={(e) => {
                              setFieldValues((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, onset: e.target.value }
                                    : item
                                )
                              );
                            }}
                            className={`border w-full border-gray-300 rounded-md p-2 ${
                              disableCondition && "bg-grayDisable text-gray-400"
                            } `}
                          />
                          <Text weight={"bold"} color={"grayReg"}>
                            (ms)
                          </Text>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full items-center">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Offset
                          </Text>
                        </div>
                        <div className="w-2/3 flex gap-1 items-center">
                          <input
                            disabled={disableCondition}
                            type="number"
                            min={0}
                            defaultValue={fieldValue.offset}
                            onChange={(e) => {
                              setFieldValues((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, offset: e.target.value }
                                    : item
                                )
                              );
                            }}
                            className={`border w-full border-gray-300 rounded-md p-2 ${
                              disableCondition && "bg-grayDisable text-gray-400"
                            } `}
                          />
                          <Text weight={"bold"} color={"grayReg"}>
                            (ms)
                          </Text>
                        </div>
                      </div>
                    </div>
                  ) : fieldValue.family == families["miscellaneous"] ? (
                    <div></div>
                  ) : (
                    <div></div>
                  )}
                  <div>
                    <Text weight={"bold"} color={"grayReg"}>
                      Notes (optional)
                    </Text>
                    <textarea
                      disabled={disableCondition}
                      type="textarea"
                      defaultValue={fieldValue.notes}
                      rows={6}
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
                        disableCondition && "bg-grayDisable text-gray-400"
                      } `}
                    />
                  </div>
                </div>
                <div className="border-r-2 border-blue h-24"></div>
                <div
                  id="trash+submit"
                  className="flex flex-col items-center gap-6">
                  <TrashButton
                    disabled={!editble.every((field) => !Boolean(field))}
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  {!disableCondition && (
                    <SubmitButton
                      submit={async () => {
                        if (!editble[index]) {
                          handleSubmit(fieldValues, index);
                        } else {
                          const res = await handleEdit(fieldValue, index);
                          res && enableEdit(index);
                        }
                      }}
                      disabled={!submitConditions(index) || disableCondition}
                    />
                  )}

                  {disableCondition && (
                    <Tooltip animation content="Edit" trigger="hover">
                      <button
                        type="button"
                        onClick={() => {
                          enableEdit(index);
                        }}>
                        <Edit className="w-6 h-6" />
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </form>
          </div>
        );
      })}
      <AddFieldButton
        disabled={disableAddBttns}
        initialValues={initialValues}
        fieldValues={fieldValues}
        setFieldValues={setFieldValues}
      />
    </ExpandingBox>
  );
}
