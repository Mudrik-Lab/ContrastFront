import classNames from "classnames";
import React, { useState } from "react";
import SideStatus from "../../../sharedComponents/SideStatus";
import { Spacer } from "../../../sharedComponents/Reusble";

export default function ExperimentsBox({
  disabled,
  experiments,
  setExperimentToShow,
  setNewPaper,
  setExperimentToEdit,
  showEditble,
  refetch,
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
          isUncontrast={true}
          refetch={refetch}
          isExperiment={true}
          number={experiments?.length}
          status={"Submitted"}
          disabled={disabled}
          papers={experiments}
          setPaperToShow={setExperimentToShow}
          setPaperToEdit={setExperimentToEdit}
          showEditble={showEditble}
          setNewPaper={setNewPaper}
          setAddNewExperiment={setAddNewExperiment}
        />
      </div>
      <Spacer height={10} />
      {showEditble && (
        <span
          className="ml-1 font-bold text-base cursor-pointer text-revoltingGreen"
          onClick={() => {
            setNewPaper(true);
            setAddNewExperiment(true);
          }}>
          + Add new experiment
        </span>
      )}
    </div>
  );
}
