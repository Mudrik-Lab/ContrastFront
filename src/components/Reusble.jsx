/** @format */
import React from "react";
import classNames from "classnames";
import { ReactComponent as QuestionMark } from "../assets/icons/help-q-mark.svg";
import { Tooltip } from "flowbite-react";
import {
  navHeight,
  screenHeight,
  sideSectionClass,
  sideWidth,
} from "./HardCoded";

export const TextInput = ({ ...config }) => {
  return (
    <input
      {...config}
      type="text"
      className="border-cyan-600 border-2 rounded-md"></input>
  );
};

export const Button = ({ children, black, ...config }) => {
  return (
    <button
      className={classNames(
        `text-white text-md leading-4 font-bold ${
          black ? "bg-black" : "bg-blue"
        } hover:bg-gray-500 rounded-full px-4 py-3 text-center flex justify-center items-center gap-2 whitespace-nowrap`
      )}
      {...config}>
      {children}
    </button>
  );
};
export const WhiteButton = ({ children, ...config }) => {
  return (
    <button
      className=" text-lg leading-4 font-bold bg-white hover:bg-gray-500 rounded-full px-4 py-3 text-center flex justify-center gap-2 "
      {...config}>
      {children}
    </button>
  );
};

export const Spacer = ({ height }) => {
  return <div style={{ height }}></div>;
};

export const Text = ({
  weight,
  children,
  size,
  lg,
  md,
  sm,
  center,
  color,
  flexed,
  onClick,
  className,
  lineHeight,
  id,
}) => {
  return (
    <p
      id={id}
      onClick={onClick}
      className={classNames(
        `${flexed ? "flex justify-center items-center gap-2" : ""} text-${
          color ? color : "black"
        } font-${weight ? weight : "medium"} ${className ? className : ""} `
      )}
      style={{
        fontSize: lg ? "20px" : md ? "18px" : sm ? "12px" : size,
        textAlign: center && "center",
      }}>
      {children}
    </p>
  );
};

export const Select = ({ children, placeHolder, optionsArr, ...config }) => {
  const optionClass = "block px-4 py-2 border text-gray-800";

  return (
    <select
      id="some-select"
      className="bg-white border text-grayReg text-md rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
      <option className={optionClass} value="" selected>
        {placeHolder}
      </option>
      {optionsArr.map((option) => (
        <option className={optionClass} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
export const RadioInput = ({ name, values, checked, setChecked }) => {
  return (
    <div className="flex px-12 flex-wrap justify-center">
      {values.map((val) => (
        <div className="mr-4" key={val.name}>
          <input
            id={name}
            type="radio"
            name={name}
            value={val.value}
            checked={checked === val.value}
            onChange={(e) => setChecked(e.target.value)}
            className="w-4 h-4 bg-gray-100 border-gray-300"
          />
          <label
            htmlFor={name}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 break-normal">
            {val.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export const FilterExplanation = ({ text, tooltip }) => {
  return (
    <div className="flex gap-2">
      <Tooltip content={tooltip} trigger="click">
        <button className="flex justify-center items-center gap-2">
          {text} <QuestionMark />{" "}
        </button>
      </Tooltip>
    </div>
  );
};
export const Label = ({ children }) => {
  return (
    <label
      htmlFor="Select"
      className="block mb-2 text-sm text-gray-400 dark:text-white">
      {children}
    </label>
  );
};

export const RangeInput = ({ number, setNumber }) => {
  const [label, setLabel] = React.useState(number);
  return (
    <div className={sideSectionClass}>
      <FilterExplanation
        text="Minimum number of experiments"
        tooltip="few more words about Minimum number of experiments"
      />

      <div className="relative">
        <input
          type="range"
          onChange={(e) => setLabel(e.target.value)}
          onMouseUp={(e) => setNumber(e.target.value)}
          min={0}
          defaultValue={0}
          max={100}
          step={1}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
          id="numOfExperiments"
        />
        <span
          style={{
            left: label * 0.9 + (label < 10 ? 5 : label < 70 ? 2 : 0) + "%",
            top: 3.5,
          }}
          className="absolute text-sm text-blue pointer-events-none ">
          {label}
        </span>
      </div>
    </div>
  );
};

export const SideControl = ({ children, headline }) => {
  return (
    <div
      className="side-filter-box p-2 pt-10 flex flex-col items-center fixed z-10 "
      style={{ height: screenHeight - navHeight, width: sideWidth }}>
      <Text size={28} weight="bold" color="blue" center>
        {headline}
      </Text>
      <div className=" shadow-xl mt-10 rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2 overflow-y-scroll mb-[100px] ">
        {children}
      </div>
    </div>
  );
};

export const TypeOfConsciousnessFilter = ({ checked, setChecked }) => {
  return (
    <div className={sideSectionClass}>
      <Text md weight="bold">
        Type of Consciousness
      </Text>
      <RadioInput
        name="Consciousness"
        values={[
          { value: "state", name: "State" },
          { value: "content", name: "Content" },
          { value: "either", name: "Either" },
          { value: "both", name: "Both" },
        ]}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export const ReportFilter = ({ checked, setChecked }) => {
  return (
    <div className={sideSectionClass}>
      <Text md weight="bold">
        Report
      </Text>
      <RadioInput
        name="Report"
        values={[
          { value: "report", name: "Report" },
          { value: "no_report", name: "No-Report" },
          { value: "either", name: "Either" },
          { value: "both", name: "Both" },
        ]}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};

export const TheoryDrivenFilter = ({ checked, setChecked }) => {
  return (
    <div className={sideSectionClass}>
      <Text md weight="bold">
        Theory Driven
      </Text>
      <RadioInput
        name="Theory-Driven"
        values={[
          { value: "driven", name: "Driven" },
          { value: "mentioning", name: "Mentioning" },
          { value: "either", name: "Either" },
          { value: "post-hoc", name: "Post Hoc" },
        ]}
        checked={checked}
        setChecked={setChecked}
      />
    </div>
  );
};
