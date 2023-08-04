import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  TrashButton,
  YoavSelect,
} from "../../../components/Reusble";
import { useEffect, useState } from "react";
import {
  DeleteClassificationField,
  SubmitClassificationField,
  rawTextToShow,
} from "../../../Utils/functions";

export default function Stimulus({
  filedOptions,
  subCategories,
  modalities,
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState([
    {
      category: "",
      sub_category: "",
      modality: "",
      description: "",
      duration: "",
    },
  ]);
  const classificationName = "stimuli";

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
            category: row.category,
            sub_category: row.sub_category,
            modality: row.modality,
            description: row.description,
            duration: row.duration,
            id: row.id,
          };
        })
      );
    }
  }, []);

  return (
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
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div className="w-full flex gap-2 items-start">
                      <div id="field1" className="w-full">
                        <Text weight={"bold"} color={"grayReg"}>
                          Category
                        </Text>
                        <YoavSelect
                          disabled={fieldValue.id}
                          value={fieldValue.category}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].category = value;
                            setFieldValues(newArray);
                          }}
                          options={filedOptions}
                        />
                      </div>
                      <div id="field2" className="w-full">
                        <Text
                          weight={"bold"}
                          color={"grayReg"}
                          className={"whitespace-nowrap "}>
                          Sub-category
                        </Text>
                        <YoavSelect
                          disabled={fieldValue.id}
                          value={fieldValue.sub_category}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].sub_category = value;
                            setFieldValues(newArray);
                          }}
                          options={subCategories}
                        />
                      </div>
                      <div id="field3" className="w-full">
                        <Text weight={"bold"} color={"grayReg"}>
                          Modality
                        </Text>
                        <YoavSelect
                          disabled={fieldValue.id}
                          value={fieldValue.modality}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].modality = value;
                            setFieldValues(newArray);
                          }}
                          options={modalities}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div id="field4" className="w-20">
                      <Text weight={"bold"} color={"grayReg"}>
                        Duration
                      </Text>

                      <div className="flex gap-2">
                        <input
                          min={0}
                          disabled={fieldValues[index].id}
                          type="number"
                          defaultValue={fieldValue.duration}
                          onChange={(e) => {
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? { ...item, duration: e.target.value }
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
                    <div id="field5" className="w-full">
                      <Text weight={"bold"} color={"grayReg"}>
                        Description
                      </Text>

                      <div className="flex gap-2">
                        <textarea
                          disabled={fieldValues[index].id}
                          type="textarea"
                          defaultValue={fieldValue.description}
                          rows={2}
                          onChange={(e) => {
                            setFieldValues((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? { ...item, description: e.target.value }
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
                        fieldValue?.category &&
                        fieldValue?.sub_category &&
                        fieldValue?.description &&
                        fieldValue?.duration &&
                        fieldValue?.modality
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
