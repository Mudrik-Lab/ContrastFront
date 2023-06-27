import classNames from "classnames";
import React from "react";
import SideStatus from "../../components/SideStatus";

export default function ExperimentsBox({ disabled }) {
  return (
    <div
      className={classNames(
        `w-full bg-grayLight border border-grayReg rounded-md p-2 ${
          disabled ? "text-grayHeavy bg-grayLight" : "text-black bg-white"
        }`
      )}>
      <h3 className="text-2xl">Experiments</h3>
      <div className="flex flex-col gap-2">
        <SideStatus number={0} status={"Submitted"} disabled={disabled} />
        <SideStatus number={0} status={"In Progress"} disabled={disabled} />
      </div>
    </div>
  );
}
