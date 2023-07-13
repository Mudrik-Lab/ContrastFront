import React from "react";

export default function ProgressComponent({ status, paperNmae }) {
  return (
    <div className="px-6 py-10 h-28 bg-grayLight">
      <div className="flex w-full justify-start items-center gap-2">
        <span>{status}</span>
        <span>
          {" "}
          <svg
            width="9"
            height="10"
            viewBox="0 0 9 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.54 4.67242V5.69842L0.188 9.98242V8.75842L7.316 5.21242V5.17642L0.188 1.63042V0.406422L8.54 4.67242Z"
              fill="#6D6D6D"
            />
          </svg>
        </span>
        <span>{paperNmae} </span>
      </div>
    </div>
  );
}
