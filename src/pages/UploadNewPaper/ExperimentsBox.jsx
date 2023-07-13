import classNames from "classnames";
import React from "react";
import SideStatus from "../../components/SideStatus";

export default function ExperimentsBox({
  disabled,
  completedStudy,
  experiments,
  setPaperToShow,
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
          completedStudy={completedStudy}
          number={experiments.length}
          status={"Submitted"}
          disabled={disabled}
          papers={experiments}
          setPaperToShow={setPaperToShow}
        />
        {!completedStudy && (
          <SideStatus
            number={0}
            status={"Uncompleted submissions"}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
}
