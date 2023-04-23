import React from "react";
import Select from "react-select";

export default function TagsSelect({
  options,

  isMulti,
  onChange,
  defaultValue,
}) {
  return (
    <Select
      closeMenuOnSelect={true}
      isMulti={isMulti}
      options={options}
      onChange={onChange}
      defaultInputValue={defaultValue}
    />
  );
}
