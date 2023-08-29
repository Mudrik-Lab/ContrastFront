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
  rawTextToShow,
} from "../../../Utils/functions";

export default function Stimuli({
  fieldOptions,
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
              <div className="flex gap-2 items-center  border border-blue border-x-4 p-2 rounded-md">
                <CircledIndex index={index} />
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div className="w-full flex gap-2 items-start">
                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Choose the category of stimuli used in the experiment."
                          }
                          text={"Category"}
                        />
                        <CustomSelect
                          disabled={fieldValue.id}
                          value={fieldValue.category}
                          onChange={(value) => {
                            const newArray = [...fieldValues];
                            newArray[index].category = value;
                            setFieldValues(newArray);
                          }}
                          options={fieldOptions}
                        />
                      </div>
                      <div className="w-full">
                        <Text
                          weight={"bold"}
                          color={"grayReg"}
                          className={"whitespace-nowrap "}>
                          Sub-category
                        </Text>
                        <CustomSelect
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
                      <div className="w-full">
                        <TooltipExplanation
                          isHeadline
                          tooltip={
                            "Indicate in which modality the stimuli were presented."
                          }
                          text={"Modality"}
                        />
                        <CustomSelect
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
                    <div className="w-20">
                      <TooltipExplanation
                        isHeadline
                        tooltip={
                          "Enter the presentation duration of the critical stimulus in ms. If this information is not available, enter NA."
                        }
                        text={"Duration"}
                      />

                      <div className="flex flex-col items-center">
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
                            "bg-grayDisable text-gray-400"
                          } `}
                        />
                        <Text xs weight={"bold"} color={"grayReg"}>
                          (ms)
                        </Text>
                      </div>
                    </div>
                    <div className="w-full">
                      <Text weight={"bold"} color={"grayReg"}>
                        Description
                      </Text>

                      <div className="flex gap-2">
                        <textarea
                          disabled={fieldValues[index].id}
                          type="textarea"
                          defaultValue={fieldValue.description}
                          rows={3}
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
                            "bg-grayDisable text-gray-400"
                          } `}
                        />
                      </div>
                    </div>
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
