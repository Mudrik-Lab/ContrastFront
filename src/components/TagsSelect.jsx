import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

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
