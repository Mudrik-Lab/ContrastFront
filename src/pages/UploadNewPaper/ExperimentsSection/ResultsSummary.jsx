import {
  AddFieldButton,
  ExpandingBox,
  SubmitButton,
  Text,
  ToastBox,
  ToastErrorBox,
  TrashButton,
} from "../../../components/Reusble";
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
  const [description, setDescription] = useState(values?.tasks_notes || "");
  const [fieldValues, setFieldValues] = useState(values || "");
  const classificationName = "results_summary";

  return (
    <ExpandingBox
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
