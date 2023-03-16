import React from "react";
import Select from "react-select";

export default function TagsSelect({ options, placeholder }) {
  return (
    <Select
      closeMenuOnSelect={true}
      isMulti
      options={options}
      placeholder={placeholder}
    />
  );
}
