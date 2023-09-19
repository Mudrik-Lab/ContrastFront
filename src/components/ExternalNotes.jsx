import React from "react";
import { setNotes } from "../apiHooks/setNotes";
import { toast } from "react-toastify";
import { SubmitButton, Text, ToastBox, ToastErrorBox } from "./Reusble";
import { rawTextToShow } from "../Utils/functions";

export default function ExternalNotes({
  description,
  setDescription,
  study_pk,
  experiment_pk,
  classification,
}) {
  const handleNotes = async () => {
    try {
      const res = await setNotes({
        study_pk,
        experiment_pk,
        note: description,
        classification,
      });
    } catch (e) {
      console.log(e);
      toast.error(
        <ToastErrorBox errors={e?.response.data || "Error occurred"} />
      );
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior (new line)
      // Trigger your submit action here, for example:
      handleNotes();
    }
  };
  return (
    <form action="submit">
      <div className=" flex gap-2 items-center p-2 bg-grayLight rounded-md">
        <div className="w-full">
          <Text weight={"bold"} color={"blue"}>
            Notes
          </Text>

          <div className="flex gap-2">
            <textarea
              defaultValue={description}
              rows={2}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onBlur={handleNotes}
              onKeyDown={handleKeyDown}
              className={`border w-full border-gray-300 rounded-md p-2 `}
            />
          </div>
        </div>

        {/* <div id="trash+submit">
          <SubmitButton submit={handleNotes} />
        </div> */}
      </div>
    </form>
  );
}
