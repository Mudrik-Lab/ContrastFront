import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TooltipExplanation,
  TrashButton,
  CustomSelect,
} from "../../../components/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";
import { v4 as uuid } from "uuid";

export default function Findings({
  filedOptions,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([
    {
      family: "",
      type: "",
      onset: "",
      offset: "",
      correlation_sign: "",
      band_lower_bound: "",
      band_higher_bound: "",
      AAL_atlas_tag: "",
      notes: "",
      analysis_type: "",
      technique: "",
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
          console.log(row);
          return {
            family: row.family,
            type: row.type,
            technique: row.technique,
            onset: row.onset || "",
            offset: row.offset || "",
            correlation_sign: row.correlation_sign || "",
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

  return (
    <ExpandingBox
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
            <form className="flex flex-col gap-2">
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <div id="index" className="w-4">
                  <Text weight={"bold"} color={"blue"}>
                    {index + 1}
                  </Text>
                </div>
                <div className="w-full flex items-start gap-4">
                  <div className="w-1/2 flex flex-col gap-2 items-start">
                    <div className="w-full flex">
                      <div className="w-1/3">
                        <Text weight={"bold"} color={"grayReg"}>
                          Technique
                        </Text>
                      </div>
                      <div className="w-2/3">
                        <CustomSelect
                          disabled={fieldValue?.id}
                          value={fieldValue.technique}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].technique = value;
                            setFieldValues(newArray);
                          }}
                          options={filedOptions.techniquesOptions}
                        />
                      </div>
                    </div>

                    <div className="w-full flex">
                      <div className="w-1/3">
                        <Text weight={"bold"} color={"grayReg"}>
                          Type
                        </Text>
                      </div>
                      <div className="w-2/3">
                        <CustomSelect
                          disabled={fieldValue?.id}
                          value={fieldValue.type}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].type = value;
                            setFieldValues(newArray);
                          }}
                          options={filedOptions.findingTypes}
                        />
                      </div>
                    </div>
                    <div className="w-full flex">
                      <div className="w-1/3">
                        <Text weight={"bold"} color={"grayReg"}>
                          Family
                        </Text>
                      </div>
                      <div className="w-2/3">
                        <CustomSelect
                          disabled={fieldValue?.id}
                          value={fieldValue.family}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].family = value;
                            setFieldValues(newArray);
                          }}
                          options={filedOptions.findingTagsFamilies}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    {fieldValue.family == 1 ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 ">
                          <div className="w-1/4">
                            <Text weight={"bold"} color={"grayReg"}>
                              Onset
                            </Text>
                          </div>
                          <div className="w-1/3">
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
                        </div>
                        <div className="flex gap-2 w-full">
                          <div className="w-1/4">
                            <Text weight={"bold"} color={"grayReg"}>
                              Offset
                            </Text>
                          </div>
                          <div className="w-1/3">
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
                          </div>
                        </div>
                      </div>
                    ) : fieldValue.family == 2 ? (
                      <div className="flex gap-2 w-full">
                        <div className="w-1/2">
                          <Text weight={"bold"} color={"grayReg"}>
                            AAL atlas tag
                          </Text>
                        </div>
                        <div className="w-1/2">
                          <input
                            disabled={fieldValues[index].id}
                            type="number"
                            defaultValue={fieldValue.AAL_atlas_tag}
                            onChange={(e) => {
                              setFieldValues((prev) =>
                                prev.map((item, i) =>
                                  i === index
                                    ? { ...item, AAL_atlas_tag: e.target.value }
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
                      </div>
                    ) : fieldValue.family == 3 ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 w-full">
                          <div className="w-1/2">
                            <Text weight={"bold"} color={"grayReg"}>
                              Correlation sign
                            </Text>
                          </div>
                          <div className="w-1/2">
                            <input
                              disabled={fieldValues[index].id}
                              type="number"
                              defaultValue={fieldValue.correlation_sign}
                              onChange={(e) => {
                                setFieldValues((prev) =>
                                  prev.map((item, i) =>
                                    i === index
                                      ? {
                                          ...item,
                                          correlation_sign: e.target.value,
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
                          </div>
                        </div>
                        <div className="flex gap-2 w-full">
                          <div className="w-1/2">
                            <Text weight={"bold"} color={"grayReg"}>
                              Band lower bound
                            </Text>
                          </div>
                          <div className="w-1/2">
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
                          </div>
                        </div>
                        <div className="flex gap-2 w-full">
                          <div className="w-1/2">
                            <Text weight={"bold"} color={"grayReg"}>
                              Band higher bound
                            </Text>
                          </div>
                          <div className="w-1/2">
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
                          </div>
                        </div>
                      </div>
                    ) : fieldValue.family == 4 ? (
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
                            fieldValues[index].id &&
                            "bg-grayDisable text-gray-400"
                          } `}
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
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
