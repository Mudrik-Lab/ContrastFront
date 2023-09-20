import React from "react";
import { Button, ToastBox, ToastErrorBox } from "./Reusble";
import { sendStudyToReview } from "../apiHooks/sendStudyToReview";
import { toast } from "react-toastify";
import { confirmFunction } from "../Utils/functions";
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
      toast.error(<ToastErrorBox errors={e?.response?.data} />);
    }
  }
  return (
    <div className="w-full flex justify-center">
      {/* <Button
        extraClass="my-2 mx-auto"
        onClick={async () => {
          study.experiments.length
            ? confirmFunction({
                paperName: `"${study.title}"? After submitting it, you will no longer be able to edit it!`,
                question:
                  "Are you sure you want to submit the classification of the paper: ",
                confirmButton: "Yes, submit paper",
                clickDelete: handleSubmit,
              })
            : toast.error(
                "Submission of a paper with no experiments is not possible"
              );
        }}>
        Final Study Submit
      </Button> */}
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
            confirmFunction({
              paperName: `"${study.title}"? After submitting it, you will no longer be able to edit it!`,
              question:
                "Are you sure you want to submit the classification of the paper: ",
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
