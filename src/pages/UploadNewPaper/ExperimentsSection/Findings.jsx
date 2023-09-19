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
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  alphabetizeByLabels,
} from "../../../Utils/functions";
import classNames from "classnames";

export default function Findings({
  fieldOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([
    {
      technique: "",
      family: "",
      type: "",
      isNNC: true,
      direction: true,
    },
  ]);
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
            family: row.family,
            type: row.type,
            technique: row.technique,
            onset: row.onset,
            offset: row.offset,
            direction: row.direction,
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

  return (
    <ExpandingBox
      number={
        Object.values(fieldValues[0])[0] === ""
          ? fieldValues.length - 1
          : fieldValues.length
      }
      disabled={disabled}
      headline={
        <TooltipExplanation
          blackHeadline
          text={"Experiment's Findings"}
          tooltip={
            "Indicate all the Neural Correlations of Consciousness found in the experiment. If the experiment used multiple Neuroscientific techniques, enter which technique was used to obtain the specific finding."
          }
        />
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
                        Technique
                      </Text>
                    </div>
                    <div className="w-2/3 flex items-center gap-2">
                      <CustomSelect
                        disabled={fieldValue?.id}
                        value={fieldValue.technique}
                        onChange={(value) => {
                          const newArray = [...fieldValues];
                          newArray[index].technique = value;
                          setFieldValues(newArray);
                        }}
                        options={alphabetizeByLabels(
                          fieldOptions.techniquesOptions
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
                        disabled={fieldValue?.id}
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
                        disabled={fieldValue?.id}
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

                  <div className="w-full gap-2 flex my-1">
                    <div className="w-1/3">
                      <Text weight={"bold"} color={"grayReg"}>
                        Is NCC
                      </Text>
                    </div>
                    <div className="w-2/3 flex justify-between">
                      <div className="w-full flex justify-center gap-4 ">
                        <Text>True</Text>
                        <label className="relative inline-flex items-center mx-2 cursor-pointer">
                          <input
                            aria-label="toggle input"
                            type="checkbox"
                            disabled={fieldValues[index].id}
                            value={fieldValues[index].isNNC}
                            className="sr-only peer"
                            onChange={(e) => {
                              const newArray = [...fieldValues];
                              console.log(e.target);
                              newArray[index].isNNC = e.target.value;
                              setFieldValues(newArray);
                            }}
                          />

                          <div
                            className={classNames(
                              ` ${
                                fieldValues[index].id ? "bg-grayReg" : "bg-blue"
                              } w-11 h-6 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue `
                            )}></div>
                        </label>
                        <Text>False</Text>
                      </div>
                      <TooltipExplanation
                        tooltip={
                          "If this finding is interpreted as an NCC, select “True”. If this finding is reported not to be an NCC (e.g., it is not found under a no-report paradigm, where participants were conscious of the stimulus), indicate “False”."
                        }
                      />
                    </div>
                  </div>

                  {fieldValue.family == families["Temporal"] ? (
                    <div className="flex gap-4 ">
                      <div className="flex gap-1 items-center">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Onset
                          </Text>
                        </div>
                        <div className="w-2/3 flex gap-1 items-center">
                          <input
                            disabled={fieldValues[index].id}
                            type="number"
                            name="onset"
                            value={fieldValue.onset}
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
                              fieldValues[index].id &&
                              "bg-grayDisable text-gray-400"
                            } `}
                          />
                        </div>
                        <Text weight={"bold"} color={"grayReg"}>
                          (ms)
                        </Text>
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Offset
                          </Text>
                        </div>
                        <div className="w-2/3 flex gap-1 items-center">
                          <input
                            disabled={fieldValues[index].id}
                            type="number"
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
                              fieldValues[index].id &&
                              "bg-grayDisable text-gray-400"
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
                          disabled={fieldValues[index].id}
                          value={fieldValue.AAL_atlas_tag}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].AAL_atlas_tag = value;
                            setFieldValues(newArray);
                          }}
                          options={alphabetizeByLabels(fieldOptions.AALOptions)}
                        />
                      </div>
                    </div>
                  ) : fieldValue.family == families["Frequency"] ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 w-full">
                        <div className="w-1/3">
                          <Text weight={"bold"} color={"grayReg"}>
                            Direction
                          </Text>
                        </div>
                        <div className="w-2/3 flex justify-between">
                          <div className="w-full flex justify-center gap-4 ">
                            <Text>Positive</Text>
                            <label className="relative inline-flex items-center mx-2 cursor-pointer">
                              <input
                                aria-label="toggle input"
                                type="checkbox"
                                disabled={fieldValues[index].id}
                                value={fieldValues[index].direction}
                                className="sr-only peer"
                                onChange={(e) => {
                                  const newArray = [...fieldValues];
                                  console.log(e.target);
                                  newArray[index].direction =
                                    e.target.value === "positive"
                                      ? "negative"
                                      : "positive";
                                  setFieldValues(newArray);
                                }}
                              />
                              <div
                                className={classNames(
                                  ` ${
                                    fieldValues[index].id
                                      ? "bg-grayReg"
                                      : "bg-blue"
                                  } w-11 h-6 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue `
                                )}></div>
                            </label>
                            <Text>Negative</Text>
                          </div>
                          <TooltipExplanation
                            tooltip={
                              " If for this finding, its presence is associated with f consciousness, mark it as “Positive”. If its absence is associated with consciousness, mark it as “Negative”."
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
                            disabled={fieldValues[index].id}
                            type="number"
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
                              fieldValues[index].id &&
                              "bg-grayDisable text-gray-400"
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
                            disabled={fieldValues[index].id}
                            type="number"
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
                              fieldValues[index].id &&
                              "bg-grayDisable text-gray-400"
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
                            disabled={fieldValues[index].id}
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
                            disabled={fieldValues[index].id}
                            type="number"
                            name="onset"
                            value={fieldValue.onset}
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
                              fieldValues[index].id &&
                              "bg-grayDisable text-gray-400"
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
                            disabled={fieldValues[index].id}
                            type="number"
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
                              fieldValues[index].id &&
                              "bg-grayDisable text-gray-400"
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
                <div className="border-r-2 border-blue h-24"></div>
                <div id="trash+submit">
                  <TrashButton
                    handleDelete={handleDelete}
                    fieldValues={fieldValues}
                    index={index}
                  />
                  <SubmitButton
                    submit={() => {
                      console.log(fieldValues);
                      handleSubmit(fieldValues, index);
                    }}
                    disabled={
                      !(
                        fieldValue?.type &&
                        fieldValue?.technique &&
                        fieldValue?.family
                      ) || fieldValue.id
                    }
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
