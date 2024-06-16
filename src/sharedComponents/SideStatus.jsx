import classNames from "classnames";
import react, { useState } from "react";
import { deleteExperiment } from "../apiHooks/deleteExperiment";
import { toast } from "react-toastify";
import { Button, ToastBox, ToastErrorBox } from "./Reusble";
import { deleteStudy } from "../apiHooks/deleteStudy";
import { commonBlue, grayHeavy, revoltingGreen } from "../Utils/HardCoded";
import { ToastError, confirmFunction } from "../Utils/functions";

export default function SideStatus({
  number,
  status,
  disabled,
  papers,
  isExperiment,
  setPaperToShow,
  setShowEditble,
  showEditble,
  refetch,
  setPaperToEdit,
  isUncontrast,
  setExperimentToEdit,
  setExperimentToShow,
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async (paper) => {
    const experiment_pk = paper.id;
    const study_pk = paper.study;
    async function clickDelete() {
      if (isExperiment) {
        try {
          const res = await deleteExperiment({
            experiment_pk,
            study_pk,
            isUncontrast,
          });
          if (res.status === 204) {
            setPaperToShow();
            toast.success(
              <ToastBox headline={"Experiment was deleted successfully"} />
            );

            refetch();
          }
        } catch (e) {
          ToastError(e);
        }
      } else {
        try {
          const study_pk = paper.id;
          const res = await deleteStudy({ study_pk, isUncontrast });
          if (res.status === 204) {
            setPaperToShow();
            toast.success(
              <ToastBox headline={"Study was deleted successfully"} />
            );
            refetch();
          }
        } catch (e) {
          ToastError(e);
        }
      }
    }
    confirmFunction({
      paperName: paper.title,
      clickDelete,
      question: "By clicking ‘confirm’ you will delete",
      confirmButton: "Yes' Delete it!",
    });
  };

  let color =
    status === "Approved Submissions"
      ? "revoltingGreen"
      : status === "Rejected Submissions"
      ? "black"
      : status === "Submitted"
      ? "revoltingGreen"
      : status === "Awaiting Review"
      ? "grayHeavy"
      : status === "Uncompleted submissions"
      ? "blue"
      : "";
  let fill =
    status === "Approved Submissions"
      ? revoltingGreen
      : status === "Rejected Submissions"
      ? "black"
      : status === "Submitted"
      ? revoltingGreen
      : status === "Awaiting Review"
      ? grayHeavy
      : status === "Uncompleted submissions"
      ? commonBlue
      : "";
  if (disabled) {
    color = "grayDisable";
  }
  if (disabled) {
    fill = grayDisable;
  }

  return (
    <div
      className={classNames(
        `border-2 border-${color} text-${color} rounded-md p-2  w-full`
      )}>
      <div
        className="flex justify-between font-bold cursor-pointer text-base"
        onClick={() => setOpen(!open)}>
        <span>{isExperiment ? "Added Experiments" : status}</span>

        <div className="flex items-center gap-1">
          <span>({number})</span>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d={
                open
                  ? "M17 14.8297L15.9917 15.9738L12 12.9018L7.93354 15.9738L7 14.8297L12 10.9738L17 14.8297Z"
                  : "M7 11.1179L8.00833 9.97381L12 13.0458L16.0665 9.97379L17 11.1179L12 14.9738L7 11.1179Z"
              }
              fill={fill}
            />
          </svg>
        </div>
      </div>
      {open && (
        <div>
          {papers?.map((paper) => (
            <div
              key={paper.title}
              className={classNames(
                `flex my-2 justify-between text-base border-b border-${color}`
              )}>
              <div className="flex items-center gap-2">
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1360_16287)">
                    <path
                      d="M9 0.982422H3C2.60218 0.982422 2.22064 1.14046 1.93934 1.42176C1.65804 1.70307 1.5 2.0846 1.5 2.48242V11.4824C1.5 11.8802 1.65804 12.2618 1.93934 12.5431C2.22064 12.8244 2.60218 12.9824 3 12.9824H9C9.39782 12.9824 9.77936 12.8244 10.0607 12.5431C10.342 12.2618 10.5 11.8802 10.5 11.4824V2.48242C10.5 2.0846 10.342 1.70307 10.0607 1.42176C9.77936 1.14046 9.39782 0.982422 9 0.982422ZM3.75 3.98242H8.25C8.34946 3.98242 8.44484 4.02193 8.51517 4.09226C8.58549 4.16258 8.625 4.25797 8.625 4.35742C8.625 4.45688 8.58549 4.55226 8.51517 4.62259C8.44484 4.69291 8.34946 4.73242 8.25 4.73242H3.75C3.65054 4.73242 3.55516 4.69291 3.48484 4.62259C3.41451 4.55226 3.375 4.45688 3.375 4.35742C3.375 4.25797 3.41451 4.16258 3.48484 4.09226C3.55516 4.02193 3.65054 3.98242 3.75 3.98242ZM3.375 5.85742C3.375 5.75797 3.41451 5.66258 3.48484 5.59226C3.55516 5.52193 3.65054 5.48242 3.75 5.48242H8.25C8.34946 5.48242 8.44484 5.52193 8.51517 5.59226C8.58549 5.66258 8.625 5.75797 8.625 5.85742C8.625 5.95688 8.58549 6.05226 8.51517 6.12259C8.44484 6.19291 8.34946 6.23242 8.25 6.23242H3.75C3.65054 6.23242 3.55516 6.19291 3.48484 6.12259C3.41451 6.05226 3.375 5.95688 3.375 5.85742ZM3.75 6.98242H8.25C8.34946 6.98242 8.44484 7.02193 8.51517 7.09226C8.58549 7.16258 8.625 7.25797 8.625 7.35742C8.625 7.45688 8.58549 7.55226 8.51517 7.62259C8.44484 7.69291 8.34946 7.73242 8.25 7.73242H3.75C3.65054 7.73242 3.55516 7.69291 3.48484 7.62259C3.41451 7.55226 3.375 7.45688 3.375 7.35742C3.375 7.25797 3.41451 7.16258 3.48484 7.09226C3.55516 7.02193 3.65054 6.98242 3.75 6.98242ZM3.75 8.48242H6C6.09946 8.48242 6.19484 8.52193 6.26517 8.59226C6.33549 8.66258 6.375 8.75797 6.375 8.85742C6.375 8.95688 6.33549 9.05226 6.26517 9.12259C6.19484 9.19291 6.09946 9.23242 6 9.23242H3.75C3.65054 9.23242 3.55516 9.19291 3.48484 9.12259C3.41451 9.05226 3.375 8.95688 3.375 8.85742C3.375 8.75797 3.41451 8.66258 3.48484 8.59226C3.55516 8.52193 3.65054 8.48242 3.75 8.48242Z"
                      fill={fill}
                    />
                  </g>
                </svg>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    if (isExperiment) {
                      setPaperToShow(paper);
                      setPaperToEdit(false);
                    } else {
                      //setExperimentToShow(false)& setExperimentToEdit(false) are for closing the experiment section
                      //so no "old" experimnet will stay there while another study is on the studies section
                      setExperimentToShow(false);
                      setExperimentToEdit(false);
                      setPaperToShow(paper.id);
                      setShowEditble(false);
                    }
                  }}>
                  {/* Title */}
                  {paper.title.length > 20
                    ? paper.title.slice(0, 20) + "..."
                    : paper.title}
                </span>
              </div>

              {showEditble && (
                <div
                  className={classNames(
                    `flex gap-1 items-center ${
                      isExperiment ? "text-base" : "text-xs"
                    }`
                  )}>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      if (isExperiment) {
                        setPaperToEdit(paper);
                        setPaperToShow(false);
                      } else {
                        setPaperToShow(paper.id);
                        //setExperimentToShow(false)& setExperimentToEdit(false) are for closing the experiment section
                        //so no "old" experimnet will stay there while another study is on the studies section
                        setExperimentToEdit(false);
                        setExperimentToShow(false);

                        if (paper.approval_status === 0) {
                          setShowEditble(true);
                          refetch();
                        }
                      }
                    }}>
                    edit
                  </span>
                  <span>|</span>

                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleDelete(paper);
                    }}>
                    delete
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
