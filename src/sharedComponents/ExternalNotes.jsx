import React from "react";
import { setNotes } from "../apiHooks/setNotes";
import { toast } from "react-toastify";
import { Text, ToastErrorBox } from "./Reusble";
import { ToastError } from "../Utils/functions";

export default function ExternalNotes({
  description,
  setDescription,
  study_pk,
  experiment_pk,
  classification,
  isUncontrast,
  rows,
}) {
  const handleNotes = async () => {
    try {
      const res = await setNotes({
        study_pk,
        experiment_pk,
        note: description,
        classification,
        isUncontrast,
      });
    } catch (e) {
      console.log(e);
      ToastError(e);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // event.preventDefault(); // Prevent the default behavior
      handleNotes();
    }
  };
  return (
    <form action="submit">
      <div className=" flex gap-2 items-center p-2 bg-grayLight rounded-md">
        <div className="w-full">
          <Text weight={"bold"} color={"blue"}>
            {classification === "results_summary"
              ? "Notes"
              : "Notes (optional)"}
          </Text>

          <div className="flex gap-2">
            <textarea
              defaultValue={description}
              rows={rows || 2}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onBlur={handleNotes}
              onKeyDown={handleKeyDown}
              className={`border w-full border-gray-300 rounded-md p-2 `}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
