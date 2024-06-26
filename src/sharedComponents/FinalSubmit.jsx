import React from "react";
import { Button, ToastBox, ToastErrorBox } from "./Reusble";
import { sendStudyToReview } from "../apiHooks/sendStudyToReview";
import { toast } from "react-toastify";
import { ToastError, confirmFunction, rawTextToShow } from "../Utils/functions";
import { Tooltip } from "flowbite-react";

export default function FinalSubmit({ study, refetch, onClose }) {
  async function handleSubmit() {
    try {
      const res = await sendStudyToReview(study?.id);
      if (res.status === 201) {
        toast.success(
          <ToastBox
            headline={"Success"}
            text={`Study ${study.title} was sent to review`}
          />
        );
        onClose();
      }
      refetch();
    } catch (e) {
      ToastError(e);
    }
  }
  const requiredKeys = [
    "interpretations",
    "results_summary",
    "techniques",
    "paradigms",
    "type_of_consciousness",
    "finding_tags",
    "measures",
    "consciousness_measures",
    "samples",
    "stimuli",
    "tasks",
  ];
  const missingDetails = study.experiments.map((experiment) =>
    requiredKeys.filter(
      (key) =>
        (Array.isArray(experiment[key]) && experiment[key].length === 0) ||
        experiment[key] === null
    )
  );

  const shouldCheckAllClassificationsFilled = false;
  return (
    <div className="w-full flex justify-center">
      <Tooltip
        placement="top"
        content={
          !study.experiments.length
            ? "Submission of a paper with no experiments is not possible"
            : "Send paper to review"
        }>
        <Button
          extraClass="my-2 mx-auto"
          disabled={!study.experiments.length}
          onClick={async () => {
            if (shouldCheckAllClassificationsFilled) {
              if (missingDetails.flat().length > 0) {
                toast.error(
                  <div className="w-full">
                    <h1 className="text-flourishRed font-bold text-xl">
                      Missing details before final submit is avalble:
                    </h1>
                    {missingDetails.map((row, index) => (
                      <div>
                        <h3 className="font-bold">Experiment {index + 1}:</h3>
                        <div>
                          {row.map((missingKey) => {
                            return (
                              <span>
                                {rawTextToShow(missingKey)}
                                {", "}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                );
                return;
              }
            }
            confirmFunction({
              question:
                "Are you sure you want to submit the classification of the paper: ",
              paperName: `"${study.title}"? After submitting it, you will no longer be able to edit it!`,
              missingDetails: missingDetails,
              confirmButton: "Yes, submit paper",
              clickDelete: handleSubmit,
            });
          }}>
          Final Study Submit
        </Button>
      </Tooltip>
    </div>
  );
}
