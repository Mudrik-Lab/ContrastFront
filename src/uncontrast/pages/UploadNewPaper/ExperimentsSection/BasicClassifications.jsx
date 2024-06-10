import {
  ExpandingBox,
  TooltipExplanation,
  CustomSelect,
  CircledIndex,
  Button,
  ToastBox,
} from "../../../../sharedComponents/Reusble";
import { useEffect, useState } from "react";
import ExternalNotes from "../../../../sharedComponents/ExternalNotes";
import {
  createUncontrastExperiments,
  editExperiments,
  updateUncontrastExperiments,
} from "../../../../apiHooks/createExperiment";
import { ReactComponent as Vicon } from "../../../../assets/icons/v-icon.svg";
import { toast } from "react-toastify";

export default function BasicClassifications({
  fieldOptions,
  optionalParadigms,
  experiment_pk,
  study_pk,
  values,
  minimumClassifications,
  setMinimumClassifications,
  setExperimentID,
  experimentID,
}) {
  const initialValues = {
    main: "",
    specific: "",
  };

  const [description, setDescription] = useState(values?.paradigms || "");
  const [fieldValues, setFieldValues] = useState(initialValues);
  const classificationName = "paradigms";

  useEffect(() => {
    if (values?.paradigm?.id) {
      setFieldValues({
        main: values.paradigm.main,
        specific: values.paradigm.id,
        id: values.paradigm.id,
      });
    }
  }, []);

  const handleSubmit = async (chosenParadigm) => {
    try {
      let res = await createUncontrastExperiments({
        study_pk,
        chosenParadigm,
      });
      if (res.status === 201) {
        setExperimentID(res.data.id);
        toast.success(
          <ToastBox
            headline={"New experiment was created successfully"}
            text={" Now you can add other classifications"}
          />
        );
      }
    } catch (e) {
      ToastError(e);
    }
  };
  const handleEdit = async (chosenParadigm) => {
    try {
      console.log(experimentID);
      const res = await updateUncontrastExperiments({
        experiment_id: experimentID,
        chosenParadigm,
        study_pk,
      });
      if (res.status === 201) {
        toast.success(
          <ToastBox
            headline={"Success"}
            text={"Experiment's basic classifications were updated "}
          />
        );
      }
    } catch (e) {
      ToastError(e);
    }
  };
  const fieldsNum = fieldValues.id ? 1 : 0;
  useEffect(() => {
    setMinimumClassifications({
      ...minimumClassifications,
      paradigms: fieldsNum,
    });
  }, [fieldsNum]);

  console.log(values);
  return (
    <>
      <ExpandingBox
        noNumber
        disabled={false}
        headline={"Basic Classifications"}>
        <div key={`${classificationName}`}>
          <form className="flex flex-col gap-2">
            <div className="flex gap-2 items-center border border-blue border-x-4 p-2 rounded-md">
              <CircledIndex index={0} />
              <div className="w-full flex flex-col gap-2">
                <div className="flex gap-2 items-start">
                  <div className="w-full">
                    <TooltipExplanation
                      isHeadline
                      tooltip={
                        "Indicate which class of paradigms/manipulations were used in the experiment using the dropdown menu. Then, choose the more specific paradigm/manipulation used, under the specified class of paradigms/manipulations. You can choose several paradigms/manipulations if more than one was used."
                      }
                      text={"Main paradigm "}
                    />

                    <CustomSelect
                      value={fieldValues.main}
                      onChange={(value) => {
                        const newObj = { ...fieldValues };
                        newObj.main = value;
                        setFieldValues(newObj);
                      }}
                      options={fieldOptions}
                    />
                  </div>

                  <div className="w-full">
                    <TooltipExplanation
                      isHeadline
                      tooltip={
                        'Choose a specific paradigm used in the experiment under the relevant paradigm class. For example, for an experiment that used backward masking, select "Masking" as the main paradigm, and then select Backward Masking as the specific paradigm.'
                      }
                      text={"Specific paradigm"}
                    />

                    <CustomSelect
                      value={fieldValues.specific}
                      onChange={async (value) => {
                        console.log("onChang", value);
                        const newObj = { ...fieldValues };
                        newObj.specific = value;
                        setFieldValues(newObj);
                      }}
                      options={[
                        ...new Set(
                          optionalParadigms
                            .filter(
                              (paradigm) => paradigm.main == fieldValues.main
                            )
                            .map((row) => ({
                              label: row.name,
                              value: row.id,
                            }))
                        ),
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button
                type="button"
                onClick={() =>
                  experimentID
                    ? handleEdit(fieldValues.specific)
                    : handleSubmit(fieldValues.specific)
                }>
                <Vicon />
                {!experimentID ? "Save Experiment" : "Save edit"}
              </Button>
            </div>
          </form>
        </div>
      </ExpandingBox>
    </>
  );
}
