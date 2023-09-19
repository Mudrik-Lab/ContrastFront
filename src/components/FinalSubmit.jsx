import React from "react";
import { Button, ToastBox, ToastErrorBox } from "./Reusble";
import { sendStudyToReview } from "../apiHooks/sendStudyToReview";
import { toast } from "react-toastify";
import { confirmFunction } from "../Utils/functions";

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
    <div>
      <Button
        extraClass="my-2 mx-auto"
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
    </div>
  );
}
