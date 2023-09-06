import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  ToastBox,
  ToastErrorBox,
  TrashButton,
} from "../../../components/Reusble";
import { useEffect, useState } from "react";

import { rawTextToShow } from "../../../Utils/functions";
import { setNotes } from "../../../apiHooks/setNotes";
import { toast } from "react-toastify";

export default function ResultsSummary({
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [fieldValues, setFieldValues] = useState(values || "");
  const classificationName = "Results Summary";

  const handleSubmit = async () => {
    try {
      const res = await setNotes({
        study_pk,
        experiment_pk,
        note: fieldValues,
        classification: "set_results_summary",
      });
      if (res.status === 201) {
        toast.success(
          <ToastBox
            headline={"Success"}
            text={"Resuls summary's notes were added successfully"}
          />
        );
      }
    } catch (e) {
      console.log(e);
      toast.error(
        <ToastErrorBox errors={e?.response.data || "Error occurred"} />
      );
    }
  };

  console.log(values);
  return (
    <ExpandingBox
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      <div>
        <form className="flex flex-col gap-2">
          <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
            <div className="w-full flex gap-2 items-start">
              <div className="w-full">
                <Text weight={"bold"} color={"grayReg"}>
                  Notes
                </Text>
                <textarea
                  defaultValue={fieldValues}
                  rows={4}
                  onChange={(e) => {
                    setFieldValues(e.target.value);
                  }}
                  className="border w-full border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div id="trash+submit" className=" flex gap-2">
              {/* <TrashButton
                handleDelete={handleDelete}
                fieldValues={fieldValues}
                index={index}
              /> */}
              <SubmitButton
                submit={handleSubmit}
                disabled={!(fieldValues?.notes !== "")}
              />
            </div>
          </div>
        </form>
      </div>
    </ExpandingBox>
  );
}
