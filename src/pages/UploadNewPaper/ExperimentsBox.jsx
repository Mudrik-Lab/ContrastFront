import classNames from "classnames";
import React, { useState } from "react";
import SideStatus from "../../components/SideStatus";

export default function ExperimentsBox({
  disabled,
  completedStudy,
  experiments,
  setPaperToShow,
  setNewPaper,
  showEditble,
  study,
  setAddNewExperiment,
}) {
  return (
    <div
      className={classNames(
        `w-full bg-grayLight border border-grayReg rounded-md p-2 ${
          disabled ? "text-grayHeavy bg-grayLight" : "text-black bg-white"
        }`
      )}>
      <h3 className="text-2xl">Experiments</h3>
      <div className="flex flex-col gap-2">
        <SideStatus
          isExperiment
          number={experiments?.length}
          status={"Submitted"}
          disabled={disabled}
          papers={experiments}
          setPaperToShow={setPaperToShow}
          showEditble={showEditble}
          setNewPaper={setNewPaper}
          setAddNewExperiment={setAddNewExperiment}
        />
      </div>
    </div>
  );
}
