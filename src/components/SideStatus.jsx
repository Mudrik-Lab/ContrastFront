import classNames from "classnames";
import react, { useState } from "react";

export default function SideStatus({ number, status, disabled }) {
  const [open, setOpen] = useState(false);
  let color =
    status === "Complete"
      ? "green-500"
      : status === "Submitted"
      ? "green-500"
      : status === "Awaiting Review"
      ? "grayHeavy"
      : status === "In Progress"
      ? "blue"
      : "";
  let fill =
    status === "Complete"
      ? "#088515"
      : status === "Submitted"
      ? "#088515"
      : status === "Awaiting Review"
      ? "#6D6D6D"
      : status === "In Progress"
      ? "#159DEA"
      : "";
  if (disabled) {
    color = "grayHeavy";
  }
  if (disabled) {
    fill = "#6D6D6D";
  }

  return (
    <div
      className={classNames(
        `border-2 border-${color}  text-${color} rounded-md p-2  w-full`
      )}>
      <div
        className="flex justify-between font-bold cursor-pointer"
        onClick={() => setOpen(!open)}>
        <span>{status}</span>

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
    </div>
  );
}
