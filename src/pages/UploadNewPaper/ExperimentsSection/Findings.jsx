import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TrashButton,
  YoavSelect,
} from "../../../components/Reusble";
import { useState } from "react";
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
  const [fieldValues, setFieldValues] = useState([values]);
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
  return (
    <ExpandingBox disabled={disabled} headline={"Findings"}>
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
                    <div id="field1" className="w-full flex">
                      <div className="w-1/3">
                        <Text weight={"bold"} color={"grayReg"}>
                          Technique
                        </Text>
                      </div>
                      <div className="w-2/3">
                        <YoavSelect
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

                    <div id="field2" className="w-full flex">
                      <div className="w-1/3">
                        <Text weight={"bold"} color={"grayReg"}>
                          Type
                        </Text>
                      </div>
                      <div className="w-2/3">
                        <YoavSelect
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
                    <div id="field3" className="w-full flex">
                      <div className="w-1/3">
                        <Text weight={"bold"} color={"grayReg"}>
                          Family
                        </Text>
                      </div>
                      <div className="w-2/3">
                        <YoavSelect
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
                                "bg-[#F2F2F2] text-gray-400"
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
                                "bg-[#F2F2F2] text-gray-400"
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
                              "bg-[#F2F2F2] text-gray-400"
                            } `}
                          />
                        </div>
                      </div>
                    ) : fieldValue.family == 3 ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2 w-full">
                          <div className="w-1/2">
                            <Text weight={"bold"} color={"grayReg"}>
                              correlation_sign
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
                                "bg-[#F2F2F2] text-gray-400"
                              } `}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 w-full">
                          <div className="w-1/2">
                            <Text weight={"bold"} color={"grayReg"}>
                              band_lower_bound
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
                                "bg-[#F2F2F2] text-gray-400"
                              } `}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 w-full">
                          <div className="w-1/2">
                            <Text weight={"bold"} color={"grayReg"}>
                              band_higher_bound
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
                                "bg-[#F2F2F2] text-gray-400"
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
                            "bg-[#F2F2F2] text-gray-400"
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

{
  /* <div className="column-3  w-full">
  {values.findings[index].family === 1 ? (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Text weight={"bold"} color={"grayReg"}>
            Onset
          </Text>
        </div>
        <div className="w-2/3">
          <Field
            type="number"
            id={`findings[${index}].onset`}
            name={`findings[${index}].onset`}
            className={numericFieldClass}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Text weight={"bold"} color={"grayReg"}>
            Offset
          </Text>
        </div>
        <div className="w-2/3">
          <Field
            type="number"
            id={`findings[${index}].onffet`}
            name={`findings[${index}].onffet`}
            className={numericFieldClass}
          />
        </div>
      </div>
    </div>
  ) : values.findings[index].family === 2 ? (
    <div className="flex gap-2 w-full">
      <div className="w-1/3">
        <Text weight={"bold"} color={"grayReg"}>
          AAL atlas tag
        </Text>
      </div>
      <div className="w-2/3">
        <Field
          type="number"
          id={`findings[${index}].AAL_atlas_tag`}
          name={`findings[${index}].AAL_atlas_tag`}
          className={numericFieldClass}
        />
      </div>
    </div>
  ) : values.findings[index].family === 3 ? (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Text weight={"bold"} color={"grayReg"}>
            correlation_sign
          </Text>
        </div>
        <div className="w-2/3">
          <Field
            type="number"
            id={`findings[${index}].correlation_sign`}
            name={`findings[${index}].correlation_sign`}
            className={numericFieldClass}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Text weight={"bold"} color={"grayReg"}>
            band_lower_bound
          </Text>
        </div>
        <div className="w-2/3">
          <Field
            type="number"
            id={`findings[${index}].band_lower_bound`}
            name={`findings[${index}].band_lower_bound`}
            className={numericFieldClass}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/3">
          <Text weight={"bold"} color={"grayReg"}>
            band_higher_bound
          </Text>
        </div>
        <div className="w-2/3">
          <Field
            type="number"
            id={`findings[${index}].band_higher_bound`}
            name={`findings[${index}].band_higher_bound`}
            className={numericFieldClass}
          />
        </div>
      </div>
    </div>
  ) : values.findings[index].family === 4 ? (
    <div>
      <Text weight={"bold"} color={"grayReg"}>
        Notes
      </Text>
      <Field
        as="textarea"
        rows={4}
        id={`findings[${index}].notes`}
        name={`findings[${index}].notes`}
        className="border border-gray-300 w-full rounded-[4px] p-2 "
      />
    </div>
  ) : (
    <div>{values.findings[index].family}</div>
  )}
</div> */
}
