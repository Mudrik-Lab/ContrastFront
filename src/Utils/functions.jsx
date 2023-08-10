import { toast } from "react-toastify";
import { ToastBox } from "../components/Reusble";
import {
  addFieldToexperiment,
  addPropertyToexperiment,
} from "../apiHooks/createExperiment";
import {
  deleteFieldFromExperiments,
  deletePropertyFromExperiment,
} from "../apiHooks/deleteExperiment";

export function blueToYellow(numColors) {
  const colors = [];

  const startColor = [254, 247, 202]; // light yellow

  const midColor = [100, 200, 200]; // light green
  const endColor = [41, 24, 107]; // deep dark blue

  const numMidColors = Math.ceil(numColors / 2);

  for (let i = 0; i < numMidColors; i++) {
    const r =
      startColor[0] - ((startColor[0] - midColor[0]) / (numMidColors - 1)) * i;
    const g =
      startColor[1] - ((startColor[1] - midColor[1]) / (numMidColors - 1)) * i;
    const b =
      startColor[2] - ((startColor[2] - midColor[2]) / (numMidColors - 1)) * i;
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  const numEndColors = Math.floor(numColors / 2);

  for (let i = 0; i < numEndColors; i++) {
    const r =
      midColor[0] - ((midColor[0] - endColor[0]) / (numEndColors - 1)) * i;
    const g =
      midColor[1] - ((midColor[1] - endColor[1]) / (numEndColors - 1)) * i;
    const b =
      midColor[2] - ((midColor[2] - endColor[2]) / (numEndColors - 1)) * i;
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colors;
}

export function rawTextToShow(text) {
  text = text.replace(/[-_]/g, " ");
  const words = text.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

export function showTextToRaw(text) {
  const words = text.split(" ");
  const rawWords = words.map(
    (word) => word.charAt(0).toLowerCase() + word.slice(1)
  );
  return rawWords.join("_");
}
export function breakLongLines(sentence, chunkSize) {
  const words = sentence.split(" "); // Split the sentence into individual words
  let result = "";
  let currentChunk = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (currentChunk.length + word.length <= chunkSize) {
      // Add the word to the current chunk
      currentChunk += (currentChunk ? " " : "") + word;
    } else {
      // Start a new chunk
      result += (result ? "<br />" : "") + currentChunk;
      currentChunk = word;
    }
  }

  if (currentChunk) {
    // Add the last chunk
    result += (result ? "<br />" : "") + currentChunk;
  }

  return result;
}

export function hexToRgba(hexColor) {
  const hex = hexColor?.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

export function fixArraytoURL(arr, name) {
  const queriesArr = arr?.map((item) => "&" + name + "=" + item.value);
  const urlString = queriesArr?.join("");
  return urlString;
}

export function buildUrl(pageName, paramName, value, navigate) {
  if (value) {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set(paramName, value);
    navigate("/" + pageName + "?" + queryParams.toString());
  } else {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete(paramName);
    navigate(`/${pageName}?${queryParams.toString()}`);
  }
}

export function buildUrlForMultiSelect(e, paramName, searchParams, navigate) {
  const selectedValues = Array.from(e, (option) => option);
  const queryParams = new URLSearchParams(searchParams.toString());
  queryParams.delete(paramName);
  selectedValues.forEach((value) => {
    queryParams.append(paramName, value.value);
  });
  navigate(`?${queryParams.toString()}`);
}

export const enlargeFont = () => {
  document.getElementsByClassName("text-4xl").className = "text-6xl";
  document.getElementsByClassName("text-3xl").className = "text-5xl";
  document.getElementsByClassName("text-2xl").className = "text-4xl";
  document.getElementsByClassName("text-xl").className = "text-3xl";
  document.getElementsByClassName("text-lg").className = "text-2xl";
  document.getElementsByClassName("text-base").className = "text-xl";
  document.getElementsByClassName("text-sm").className = "text-lg";
  document.getElementsByClassName("text-xxs").className = "text-base";
};

function updateClass(classToFind, newClass) {
  const elements = document.querySelectorAll(`[class*="${classToFind}"]`);

  elements.forEach((element) => {
    const classes = element.getAttribute("class").split(" ");
    const updatedClasses = classes.map((className) => {
      if (className.includes(classToFind)) {
        return className.replace(new RegExp(classToFind, "g"), newClass);
      }
      return className;
    });
    element.setAttribute("class", updatedClasses.join(" "));
  });
}
export function updateTextClass() {
  updateClass("text-5xl", "text-7xl");
  updateClass("text-4xl", "text-6xl");
  updateClass("text-3xl", "text-5xl");
  updateClass("text-xl", "text-3xl");
  updateClass("text-lg", "text-3xl");
  updateClass("text-base", "text-2xl");
  updateClass("text-sm", "text-xl");
  updateClass("text-xs", "text-lg");
}
export const generateSelectOptions = (start, end) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    const value = i.toString().padStart(2, "0");
    options.push(
      <option key={i} value={value}>
        {value}
      </option>
    );
  }
  return options;
};

export function SubmitClassificationField(
  study_pk,
  experiment_pk,
  classificationName,
  fieldValues,
  setFieldValues
) {
  return async (values, index) => {
    if (
      classificationName !== "paradigm" &&
      classificationName !== "technique"
    ) {
      try {
        const res = await addFieldToexperiment({
          field: values[index],
          study_pk,
          experiment_pk,
          field_name: classificationName,
        });
        if (res.status === 201) {
          console.log(res);
          toast.success(
            <ToastBox
              headline={"Success"}
              text={`Added ${classificationName.slice(0, -1)} classification`}
            />
          );
          const newArr = [...fieldValues];
          newArr[index] = res.data;
          setFieldValues(newArr);
        }
      } catch (e) {
        console.log(Object.entries(e.response.data));
        const errors = Object.entries(e.response.data);
        toast.error(<ToastBox text={e.message} headline={errors} />);
      }
    } else {
      try {
        const res = await addPropertyToexperiment({
          experiment_pk,
          study_pk,
          property_id: values,
          classificationName,
        });
        if (res.status === 201) {
          toast.success(
            <ToastBox
              headline={"Success"}
              text={`Added ${classificationName.slice(0, -1)} classification`}
            />
          );
          const newArr = [...fieldValues];
          newArr[index].id = res.data.id;
          setFieldValues(newArr);
        }
      } catch (e) {
        const errors = Object.values(e.response.data);
        toast.error(<ToastBox text={e.message} headline={errors} />);
      }
    }
  };
}
export function DeleteClassificationField(
  study_pk,
  experiment_pk,
  classificationName,
  fieldValues,
  setFieldValues
) {
  return async (values, index) => {
    if (!values[index].id) {
      if (fieldValues.length !== 1) {
        const newArr = [...fieldValues];
        newArr.splice(index, 1);
        setFieldValues(newArr);
      }
      return;
    }

    if (
      classificationName !== "paradigm" &&
      classificationName !== "technique"
    ) {
      try {
        const res = await deleteFieldFromExperiments({
          study_pk,
          experiment_pk,
          field_name: classificationName,
          id: values[index].id,
        });
        if (res.status === 204) {
          if (fieldValues.length !== 1) {
            const newArr = [...fieldValues];
            newArr.splice(index, 1);
            setFieldValues(newArr);
          } else {
            setFieldValues([
              {
                type: "",
                description: "",
                key: Math.round(Math.random() * 101),
              },
            ]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(classificationName);

      try {
        const res = await deletePropertyFromExperiment({
          study_pk,
          experiment_pk,
          classificationName,
          property_id: values[index].id,
        });
        if (res.status === 204) {
          if (fieldValues.length !== 1) {
            const newArr = [...fieldValues];
            newArr.splice(index, 1);
            setFieldValues(newArr);
          } else {
            setFieldValues([
              {
                type: "",
                description: "",
                key: Math.round(Math.random() * 101),
              },
            ]);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
}
