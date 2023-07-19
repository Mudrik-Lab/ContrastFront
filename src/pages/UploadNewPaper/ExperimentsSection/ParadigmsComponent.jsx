import { useState } from "react";
import {
  FilterExplanation,
  Spacer,
  Text,
  Button,
  ExpandingBox,
} from "../../../components/Reusble";
import Select from "react-select";

export default function ParadigmsComponent({
  setFieldValue,
  paradigmsFamilies,
  values,
  paradigms,
  paradigmValues,
  setParadigmValues,
}) {
  const handleAddParadigmField = () => {
    setParadigmValues([...paradigmValues, ""]);
  };
  const handleDeleteParadigmField = () => {
    console.log(paradigmValues);
    setParadigmValues((prev) => prev.slice(0, -1));
  };
  return (
    <ExpandingBox headline={"Paradigms"}>
      {paradigmValues.map((_, index) => (
        <div
          key={index}
          className="flex gap-2 items-start justify-between border border-blue border-x-4 p-2 rounded-md">
          <div className="w-4">
            <Text weight={"bold"} color={"blue"}>
              {index + 1}
            </Text>
          </div>
          <div className="w-full">
            <Text weight={"bold"} color={"grayReg"}>
              Main Paradim
            </Text>
            <div className="flex items-center gap-2">
              <Select
                id={`paradigms_families${index}`}
                name={`paradigms_families${index}`}
                onChange={(v) => setFieldValue(`paradigms_families${index}`, v)}
                // placeholder="Select paradigm family "
                options={paradigmsFamilies}
              />
            </div>
          </div>

          <div className="w-full">
            <Text weight={"bold"} color={"grayReg"}>
              Specific Paradigm
            </Text>
            <div className="flex items-center gap-2">
              <Select
                isDisabled={!values[`paradigms_families${index}`]?.label}
                id={`paradigms${index}`}
                name={`paradigms${index}`}
                onChange={(v) => {
                  setFieldValue(`paradigms${index}`, v);
                }}
                // placeholder="Select specific paradigm  "
                options={paradigms
                  .filter(
                    (paradigm) =>
                      paradigm.parent ===
                      values[`paradigms_families${index}`]?.label
                  )
                  .map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
              />

              {index === paradigmValues.length - 1 && (
                <button type="button" onClick={handleDeleteParadigmField}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    {" "}
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />{" "}
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <Button type="button" onClick={handleAddParadigmField}>
        +
      </Button>
    </ExpandingBox>
  );
}
