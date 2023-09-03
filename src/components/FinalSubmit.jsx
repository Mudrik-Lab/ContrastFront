import React from "react";
import { Button, ToastBox, ToastErrorBox } from "./Reusble";
import { sendStudyToReview } from "../apiHooks/sendStudyToReview";
import { toast } from "react-toastify";

export default function FinalSubmit({ study, refetch, onClose }) {
  return (
    <div>
      <Button
        extraClass="my-2 mx-auto"
        onClick={async () => {
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
        }}>
        Final Study Submit
      </Button>
    </div>
  );
}
