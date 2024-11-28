import { toast } from "react-toastify";
import { ToastErrorBox } from "../sharedComponents/Reusble";
import {
  addFieldToexperiment,
  addPropertyToexperiment,
  editClassificationField,
} from "../apiHooks/createExperiment";
import {
  deleteFieldFromExperiments,
  deletePropertyFromExperiment,
} from "../apiHooks/deleteExperiment";
import { confirmAlert } from "react-confirm-alert";

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
  text = text?.replace(/[-_]/g, " ");
  const words = text?.split(" ");
  const capitalizedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords?.join(" ");
}

export function showTextToRaw(text) {
  // take a showble strind and return a string with underscores and lowercases
  const words = text.split(" ");
  const rawWords = words.map(
    (word) => word.charAt(0).toLowerCase() + word.slice(1)
  );
  return rawWords.join("_");
}
export function breakLongLines(sentence, chunkSize) {
  if (sentence) {
    const words = sentence?.split(" "); // Split the sentence into individual words
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

export function buildUrlForMultiSelect(
  options,
  paramName,
  searchParams,
  navigate
) {
  const selectedValues = Array.from(options, (option) => option);
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
export function updateTextClass(isBiggerText) {
  if (!isBiggerText) {
    updateClass("text-5xl", "text-7xl");
    updateClass("text-4xl", "text-6xl");
    updateClass("text-3xl", "text-5xl");
    updateClass("text-xl", "text-3xl");
    updateClass("text-lg", "text-3xl");
    updateClass("text-base", "text-2xl");
    updateClass("text-sm", "text-xl");
    updateClass("text-xs", "text-lg");
  } else {
    updateClass("text-7xl", "text-5xl");
    updateClass("text-6xl", "text-4xl");
    updateClass("text-5xl", "text-3xl");
    updateClass("text-3xl", "text-xl");
    updateClass("text-3xl", "text-lg");
    updateClass("text-2xl", "text-base");
    updateClass("text-xl", "text-sm");
    updateClass("text-lg", "text-xs");
  }
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
  setFieldValues,
  isUncontrast
) {
  return async (values, index) => {
    if (
      classificationName !== "paradigms" &&
      classificationName !== "techniques"
    ) {
      try {
        const res = await addFieldToexperiment({
          isUncontrast,
          field: Array.isArray(values) ? values[index] : values,
          study_pk,
          experiment_pk,
          field_name: classificationName,
        });

        if (res.status === 201) {
          if (Array.isArray(values)) {
            const newArr = [...fieldValues];
            newArr[index] = res.data;
            setFieldValues(newArr);
            return true;
          } else {
            const newObj = res.data;
            setFieldValues(newObj);
            return true;
          }
        }
      } catch (e) {
        ToastError(e);
      }
    } else {
      try {
        const res = await addPropertyToexperiment({
          isUncontrast,
          experiment_pk,
          study_pk,
          property_id: values,
          classificationName,
        });
        if (res.status === 201) {
          const newArr = [...fieldValues];
          newArr[index].id = res.data.id;
          setFieldValues(newArr);
          return true;
        }
      } catch (e) {
        ToastError(e);
      }
    }
  };
}

export function deleteClassificationField(
  study_pk,
  experiment_pk,
  classificationName,
  fieldValues,
  setFieldValues,
  isUncontrast
) {
  return async (values, index) => {
    if (Array.isArray(values)) {
      if (!values[index].id) {
        // case no id= field is uncompleted form, just clearing content
        const newArr = [...fieldValues];
        if (fieldValues.length === 1) {
          const updatedState = {};
          Object.keys(fieldValues[0]).map((key) => {
            updatedState[key] = "";
          });
          setFieldValues([updatedState]);
        } else {
          newArr.splice(index, 1);
          setFieldValues(newArr);
        }
        return;
      }
    } else {
      if (!values.id) {
        // clearing content case field is not array
        const updatedState = {};
        Object.keys(fieldValues).map((key) => {
          updatedState[key] = "";
        });
        setFieldValues(updatedState);
        return;
      }
    }

    if (
      classificationName !== "paradigms" &&
      classificationName !== "techniques"
    ) {
      try {
        // in case field has id (it's a real data on server) we delete and clearing content
        let id = Array.isArray(values) ? values[index].id : values.id;
        const res = await deleteFieldFromExperiments({
          isUncontrast,
          study_pk,
          experiment_pk,
          classificationName,
          id: id,
        });

        if (res.status === 204) {
          if (Array.isArray(fieldValues)) {
            if (fieldValues.length !== 1) {
              const deletedId = id;
              const newArr = fieldValues.filter(
                (item) => item.id?.toString() !== deletedId.toString()
              );
              setFieldValues(newArr);
            } else {
              const updatedState = {};
              Object.keys(fieldValues[0]).map((key) => {
                updatedState[key] = "";
              });
              setFieldValues([updatedState]);
            }
          } else {
            const updatedState = {};
            Object.keys(fieldValues).map((key) => {
              if (key !== "suppressed_stimulus") {
                updatedState[key] = "";
              }
            });
            setFieldValues(updatedState);
          }
        }
      } catch (e) {
        console.log(e);
        ToastError(e);
      }
    } else {
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
            const updatedState = {};
            Object.keys(fieldValues[0]).map((key) => {
              if (key !== "suppressed_stimulus") {
                updatedState[key] = "";
              }
            });
            setFieldValues([updatedState]);
          }
        }
      } catch (e) {
        ToastError(e);
      }
    }
  };
}

export function EditClassificationFields(
  study_pk,
  experiment_pk,
  classificationName,
  fieldValues,
  setFieldValues
) {
  return async (values, index) => {
    try {
      const res = await editClassificationField({
        field: values,
        study_pk,
        experiment_pk,
        classificationName,
        id: values.id,
      });
      if (res.status === 200) {
        return true;
      }
    } catch (e) {
      console.log(e);
      ToastError(e);
    }
  };
}

export function confirmFunction({
  paperName,
  clickDelete,
  question,
  confirmButton,
  missingDetails,
}) {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="fixed top-0 left-0 z-30 bg-[rgba(255,255,255,0.8)] bg-white h-screen w-screen">
          <div
            className="absolute top-10 opacity-100 bg-white w-[450px] p-4 rounded-lg shadow-lg border-b-8 border-blue"
            style={{ left: "calc(50% - 225px)" }}>
            <div className="px-2 flex gap-4 items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M32 16.5C32 20.7435 30.3143 24.8131 27.3137 27.8137C24.3131 30.8143 20.2435 32.5 16 32.5C11.7565 32.5 7.68687 30.8143 4.68629 27.8137C1.68571 24.8131 0 20.7435 0 16.5C0 12.2565 1.68571 8.18687 4.68629 5.18629C7.68687 2.18571 11.7565 0.5 16 0.5C20.2435 0.5 24.3131 2.18571 27.3137 5.18629C30.3143 8.18687 32 12.2565 32 16.5ZM10.992 12.566H12.642C12.918 12.566 13.138 12.34 13.174 12.066C13.354 10.754 14.254 9.798 15.858 9.798C17.23 9.798 18.486 10.484 18.486 12.134C18.486 13.404 17.738 13.988 16.556 14.876C15.21 15.854 14.144 16.996 14.22 18.85L14.226 19.284C14.2281 19.4152 14.2817 19.5403 14.3752 19.6324C14.4688 19.7244 14.5948 19.776 14.726 19.776H16.348C16.4806 19.776 16.6078 19.7233 16.7016 19.6296C16.7953 19.5358 16.848 19.4086 16.848 19.276V19.066C16.848 17.63 17.394 17.212 18.868 16.094C20.086 15.168 21.356 14.14 21.356 11.982C21.356 8.96 18.804 7.5 16.01 7.5C13.476 7.5 10.7 8.68 10.51 12.072C10.5073 12.1366 10.5178 12.2011 10.5409 12.2614C10.564 12.3218 10.5992 12.3768 10.6443 12.4231C10.6895 12.4694 10.7436 12.5059 10.8034 12.5305C10.8632 12.5551 10.9274 12.5671 10.992 12.566ZM15.642 25.452C16.862 25.452 17.7 24.664 17.7 23.598C17.7 22.494 16.86 21.718 15.642 21.718C14.474 21.718 13.624 22.494 13.624 23.598C13.624 24.664 14.472 25.452 15.642 25.452Z"
                  fill="#66BFF1"
                />
              </svg>
              <div>
                <h1 className=" text-blue text-2xl mb-2">Are you sure ?</h1>
                <p className="text-gray-600 text-lg">
                  {question} {paperName}
                </p>
                {missingDetails && missingDetails[0].length > 0 && (
                  <div>
                    <span className="text-flourishRed">
                      Notice! There are missing details in:{" "}
                    </span>
                    {missingDetails?.map((row, index) => (
                      <div>
                        <h3 className="font-bold">Experiment {index + 1}:</h3>
                        <div>
                          {row.map((missingKey) => {
                            return (
                              <span>
                                {rawTextToShow(missingKey)}
                                {", "}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex justify-start gap-2">
                  <button
                    onClick={() => {
                      clickDelete();
                      onClose();
                    }}
                    className="bg-blue text-white font-bold p-2 rounded-full">
                    {confirmButton}
                  </button>
                  <button className="text-grayHeavy" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
}
export function alphabetizeByLabels(selectFieldOptions) {
  const sortedOptionListByLabels = selectFieldOptions?.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });
  return sortedOptionListByLabels;
}

export function ToastError(e) {
  return toast.error(
    <ToastErrorBox errors={e?.response?.data || "Error occurred"} />
  );
}
export function calculateHistogramData(xValues, yValues, binSize = 1) {
  if (xValues.length !== yValues.length) {
    throw new Error("X and Y arrays must have the same length");
  }

  // Calculate histogram data
  const min = Math.min(...xValues);
  const max = Math.max(...xValues);
  const numBins = Math.ceil((max - min) / binSize);
  const binEdges = Array(numBins + 1)
    .fill(0)
    .map((_, i) => min + i * binSize);

  const bins = Array(numBins).fill(0);
  xValues.forEach((value, index) => {
    const binIndex = Math.floor((value - min) / binSize);
    bins[binIndex] += yValues[index];
  });

  const binMiddles = binEdges
    .slice(0, -1)
    .map((edge, i) => (edge + binEdges[i + 1]) / 2);

  return { bins, binMiddles };
}

export function duplicateArray(arr, n) {
  // Create an empty array to hold the result
  let result = [];

  // Loop n times to concatenate the array to the result
  for (let i = 0; i < n; i++) {
    result = result.concat(arr);
  }

  return result;
}
export function fixTrueToYes(data) {
  return data?.map((item) => {
    if (item.key === "True") {
      return { ...item, key: "Yes" };
    } else if (item.key === "False") {
      return { ...item, key: "No" };
    } else {
      return item;
    }
  });
}
export function extendColorList(colorList, minLength) {
  const extendedColors = [];
  while (extendedColors.length < minLength) {
    extendedColors.push(...colorList);
  }
  return extendedColors.slice(0, minLength);
}
export function analyticsPlotInteraction(searchParams, pageName) {
  // Fires GA event so user's interaction with the plot will be counted
  if (searchParams.size > 0) {
    window.gtag("event", `${pageName}- plot interaction`, {
      event_category: "plot_interactions",
      event_label: searchParams,
    });
  }
}
export function yesNoInputValue(value) {
  return value === false ? "no" : value === true ? "yes" : value;
}
