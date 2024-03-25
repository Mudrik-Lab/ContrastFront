import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  ToastBox,
  ToastErrorBox,
  TrashButton,
} from "../../../../shared/Reusble.jsx";
import { useEffect, useState } from "react";

import { rawTextToShow } from "../../../Utils/functions";
import { setNotes } from "../../../apiHooks/setNotes";
import { toast } from "react-toastify";
import ExternalNotes from "../../../components/ExternalNotes";

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
      number={description.length > 0 ? 1 : 0}
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
