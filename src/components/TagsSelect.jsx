import React from "react";
import Select from "react-select";

export default function TagsSelect({
  options,
  placeholder,
  isMulti,
  onChange,
  defaultValue,
}) {
  return (
    <Select
      closeMenuOnSelect={true}
      isMulti={isMulti}
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
}
