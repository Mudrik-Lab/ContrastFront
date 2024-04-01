import { ExpandingBox } from "../../.././sharedComponents/Reusble";
import { useEffect, useState } from "react";
import { rawTextToShow } from "../../../Utils/functions";
import ExternalNotes from "../../.././sharedComponents/ExternalNotes";

export default function ResultsSummary({
  disabled,
  experiment_pk,
  study_pk,
  values,
}) {
  const [description, setDescription] = useState("");
  const classificationName = "results_summary";
  useEffect(() => {
    setDescription(values);
  }, []);

  return (
    <ExpandingBox
      number={description?.length > 0 ? 1 : 0}
      disabled={disabled}
      headline={rawTextToShow(classificationName)}>
      <ExternalNotes
        description={description}
        setDescription={setDescription}
        classification={classificationName}
        study_pk={study_pk}
        experiment_pk={experiment_pk}
      />
    </ExpandingBox>
  );
}
