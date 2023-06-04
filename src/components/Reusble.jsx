/** @format */
import React, { useEffect } from "react";
import classNames from "classnames";
import { ReactComponent as QuestionMark } from "../assets/icons/help-q-mark.svg";
RessetIcon;
import { ReactComponent as CsvIcon } from "../assets/icons/csv-file.svg";
import { ReactComponent as RessetIcon } from "../assets/icons/reset.svg";
import { Tooltip } from "flowbite-react";
import { screenWidth, sideSectionClass, sideWidth } from "../Utils/HardCoded";
import { useNavigate } from "react-router-dom";

export const TextInput = ({ ...config }) => {
  return (
    <input
      {...config}
      type="text"
      className="border-cyan-600 border-2 rounded-md"></input>
  );
};

export const Button = ({ extraClass, children, black, ...config }) => {
  return (
    <button
      className={classNames(
        `${extraClass} text-white text-md leading-4 font-bold ${
          black ? "bg-black" : "bg-blue"
        } hover:bg-white hover:text-blue border-[3px] border-blue rounded-full px-4 py-3 text-center flex justify-center items-center gap-2 whitespace-nowrap`
      )}
      {...config}>
      {children}
    </button>
  );
};
export const ButtonReversed = ({ children, ...config }) => {
  return (
    <button
      className="
         text-blue hover:text-white text-md leading-4 font-bold bg-white hover:bg-blue border-[3px] border-blue rounded-full px-4 py-3 text-center flex justify-center items-center gap-2 whitespace-nowrap"
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
    <div
      id={id}
      onClick={onClick}
      className={classNames(
        `${flexed ? "flex justify-center items-center gap-2" : ""} text-${
          color ? color : "black"
        } font-${weight ? weight : "medium"} ${
          className ? className : ""
        } leading-${lineHeight}`
      )}
      style={{
        fontSize: lg ? "20px" : md ? "18px" : sm ? "12px" : size,
        textAlign: center && "center",
      }}>
      {children}
    </div>
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
    <div
      className="flex flex-wrap justify-between items-center px-10"
      id={name}>
      {values.map((option, index) =>
        index % 2 === 0 ? (
          <label key={option.value} className="flex items-center w-1/2">
            <input
              type="radio"
              value={option.value}
              checked={checked === option.value}
              onChange={(e) => setChecked(e.target.value)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">{option.name}</span>
          </label>
        ) : (
          <label
            key={option.value}
            className="flex items-center justify-end w-1/2">
            <span className="mr-2 text-right">{option.name}</span>
            <input
              type="radio"
              value={option.value}
              checked={checked === option.value}
              onChange={(e) => setChecked(e.target.value)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
          </label>
        )
      )}
    </div>
  );
};

export const FilterExplanation = ({ text, tooltip }) => {
  return (
    <div className="flex gap-2 mt-1">
      <Tooltip content={tooltip} trigger="click">
        <button className="flex justify-center items-center gap-2 text-sm">
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

export const ResetButton = ({ ...config }) => {
  return (
    <button
      className="text-blue border border-blue px-2 rounded-lg mt-2 shadow-sm"
      {...config}>
      Reset to defaut
    </button>
  );
};

export const RangeInput = ({ number, setNumber }) => {
  const [label, setLabel] = React.useState(number);
  useEffect(() => {
    setLabel(number);
  }, [number]);

  return (
    <div className={sideSectionClass}>
      <div className="relative">
        <input
          type="range"
          onChange={(e) => setLabel(e.target.value)}
          onMouseUp={(e) => setNumber(e.target.value)}
          onTouchEnd={(e) => setNumber(e.target.value)}
          min={0}
          defaultValue={0}
          max={100}
          step={1}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          id="numOfExperiments"
        />
        <span
          style={{
            left: label * 0.9 + (label < 10 ? 5 : label < 70 ? 2 : 0) + "%",
            top: 4,
          }}
          className="absolute text-sm text-blue pointer-events-none ">
          {label}
        </span>
      </div>
      <FilterExplanation
        text="Minimum number of experiments"
        tooltip="You can determine the minimum number of experiments in each category of the chosen parameter (i.e., filter out categories with very few entries).
        "
      />
    </div>
  );
};

export const SideControl = ({ children, headline }) => {
  const isMoblile = screenWidth < 600;

  return (
    <div
      className="side-filter-box p-2 flex flex-col items-center "
      style={{
        width: isMoblile ? "100%" : sideWidth,
        maxHeight: isMoblile ? "400px" : "100vh",
      }}>
      <div className="p-4">
        <Text size={28} weight="bold" color="blue" center>
          {headline}
        </Text>
      </div>

      <div className="shadow-xl mt-6 rounded-md bg-white flex flex-col items-center gap-2 px-4 py-2 overflow-y-scroll z-50 ">
        {children}
        <Spacer height={20} />
      </div>
    </div>
  );
};

export const TypeOfConsciousnessFilter = ({ checked, setChecked }) => {
  return (
    <div className={sideSectionClass}>
      <RadioInput
        name="Consciousness"
        values={[
          { value: "state", name: "State" },
          { value: "content", name: "Content" },
          { value: "either", name: "No Filter" },
          { value: "both", name: "Both" },
        ]}
        checked={checked}
        setChecked={setChecked}
      />
      <FilterExplanation
        text="Type of consciousness"
        tooltip="You can use this to filter the result so to include only experiments that studied content consciousness,state consciousness, both types of consciousness in the same experiment (an AND operator), or either (show all experiments that studied either content or state consciousness; an OR operator)"
      />
    </div>
  );
};

export const ReportFilter = ({ checked, setChecked }) => {
  return (
    <div className={sideSectionClass}>
      <RadioInput
        name="Report"
        values={[
          { value: "report", name: "Report" },
          { value: "no_report", name: "No-Report" },
          { value: "either", name: "No Filter" },
          { value: "both", name: "Both" },
        ]}
        checked={checked}
        setChecked={setChecked}
      />
      <FilterExplanation
        text="Report"
        tooltip="You can use this to filter the results by experiments that use Report, No-Report techniques. Both techniques in the same experiment (an AND operator), or either (show all experiments that used either report or content consciousness; an OR operator)."
      />
    </div>
  );
};

export const TheoryDrivenFilter = ({ checked, setChecked }) => {
  return (
    <div className={sideSectionClass}>
      <RadioInput
        name="Theory-Driven"
        values={[
          { value: "driven", name: "Driven" },
          { value: "mentioning", name: "Mentioning" },
          { value: "either", name: "No Filter" },
          { value: "post-hoc", name: "Post Hoc" },
        ]}
        checked={checked}
        setChecked={setChecked}
      />{" "}
      <FilterExplanation
        text="Theory Driven"
        tooltip="You can choose to filter the results by experiments that were aimed at testing at least one prediction made by the theories, experiments that only mention the theories in the introduction, experiments that post-hoc interpret their findings with respect to the theories, or experiments that do any one of these options (an OR operator)."
      />
    </div>
  );
};
export const TopGraphText = ({ firstLine, text, legendLine }) => {
  const [extend, setExtend] = React.useState(false);
  return (
    <div className="bg-grayLight w-full items-center py-5 flex justify-between px-8  ">
      <div className="max-w-[85%]">
        <Text>{firstLine}</Text>
        {extend && (
          <Text>
            {text}
            <br />
            {legendLine}
          </Text>
        )}
      </div>
      <Button
        extraClass="bg-grayReg p-2.5 max-h-[34px] border-grayLight"
        onClick={() => setExtend(!extend)}>
        {extend ? "<<Read Less" : "Read More >>"}
      </Button>
    </div>
  );
};
export const CSV = ({ data }) => {
  return (
    <a href={data?.request.responseURL + "&is_csv=true"}>
      <Button extraClass="mt-4 mb-16">
        <CsvIcon />
        Download
      </Button>
    </a>
  );
};
export const Reset = ({ pageName, setInterpretation }) => {
  const navigate = useNavigate();
  return (
    <div>
      <ButtonReversed
        onClick={() => {
          navigate("/" + pageName);
        }}>
        <RessetIcon /> Reset to default
      </ButtonReversed>
    </div>
  );
};
