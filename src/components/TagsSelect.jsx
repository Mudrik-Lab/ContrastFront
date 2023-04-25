import React from "react";
import Select from "react-select";

export default function TagsSelect({
  options,

  isMulti,
  onChange,
  value,
}) {
  return (
    <Select
      className="basic-single"
      isMulti={isMulti}
      isSearchable={true}
      options={options}
      onChange={onChange}
      value={value}
    />
  );
}
