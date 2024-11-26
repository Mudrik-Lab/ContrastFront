import { confirmAlert } from "react-confirm-alert";
import { deleteFieldFromExperiments } from "../../../../apiHooks/deleteExperiment";

export default function stimuliHandleChange({
  value,
  index,
  fieldValues,
  setFieldValues,
  study_pk,
  experiment_pk,
  previousValue,
  setPreviousValue,
  targetValues,
}) {
  const newArray = [...fieldValues];
  if (newArray[index].is_target_stimulus === "yes" && value === "no") {
    setPreviousValue(newArray[index].is_target_stimulus);
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            onClick={onClose}
            className="fixed top-0 left-0 z-[100] bg-[rgba(230,230,230,0.5)] bg-white h-screen w-screen">
            <div
              className="absolute top-1/2 z-[80] opacity-100 bg-white w-[300px] p-4 rounded-lg shadow-lg border-b-8 border-blue"
              style={{
                left: "calc(50% - 150px)",
              }}>
              <h1 className=" text-blue text-2xl mb-2">Are you sure?</h1>
              <p className="text-gray-600 text-lg">
                Switching the answer to "No" will delete the attached field of
                "Target Stimulus"
              </p>
              <div className="mt-4 flex justify-start gap-2">
                <button
                  onClick={async () => {
                    const res = await deleteFieldFromExperiments({
                      isUncontrast: true,
                      study_pk,
                      experiment_pk,
                      classificationName: "target_stimuli",
                      id: targetValues?.id,
                    });
                    if (res.status === 204) {
                      newArray[index].is_target_stimulus = "no";
                      setFieldValues(newArray);
                      setPreviousValue("");
                    }
                    onClose();
                  }}
                  className="bg-blue text-white font-bold p-2 rounded-full">
                  Delete
                </button>
                <button
                  className="text-grayHeavy"
                  onClick={() => {
                    newArray[index].is_target_stimulus = previousValue;
                    setFieldValues(newArray);
                    onClose();
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  } else {
    newArray[index].is_target_stimulus = value;
    setFieldValues(newArray);
  }
}
