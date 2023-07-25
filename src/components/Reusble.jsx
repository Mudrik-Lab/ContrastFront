/** @format */
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { ReactComponent as QuestionMark } from "../assets/icons/help-q-mark.svg";
RessetIcon;

import { ReactComponent as CsvIcon } from "../assets/icons/csv-file.svg";

import { ReactComponent as RessetIcon } from "../assets/icons/reset.svg";
import { Tooltip } from "flowbite-react";
import { screenWidth, sideSectionClass, sideWidth } from "../Utils/HardCoded";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { state } from "../state";
import { ErrorMessage, Field } from "formik";

export const TextInput = ({ ...config }) => {
  return (
    <input
      {...config}
      type="text"
      className="border-cyan-600 border-2 rounded-md"></input>
  );
};

export const Button = ({
  extraClass,
  children,
  black,
  isCommingSoon,
  ...config
}) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div className={classNames(`${isCommingSoon ? "relative" : ""}`)}>
      {hover && isCommingSoon && (
        <p
          className="bg-indigo-900 text-white p-1 min-w-full z-50  "
          style={{
            position: "absolute",
            top: "calc(50% - 16px)",
          }}>
          Comming soon
        </p>
      )}
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={classNames(
          `${extraClass} text-white text-base leading-4 font-bold ${
            black ? "bg-black" : "bg-blue border-[3px] border-blue"
          } hover:opacity-40 rounded-full px-4 py-3 text-center flex justify-center items-center gap-2 whitespace-nowrap`
        )}
        {...config}>
        {children}
      </button>
    </div>
  );
};
export const ButtonReversed = ({
  children,
  extraClass,

  isChosen,
  ...config
}) => {
  return (
    <button
      className={classNames(
        ` ${extraClass} ${
          isChosen ? "text-blue bg-white" : "bg-blue text-white"
        } text-blue text-md leading-4 font-bold bg-white border-[3px] border-blue rounded-full px-4 py-3 text-center flex justify-center items-center gap-2 whitespace-nowrap hover:opacity-40`
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
  xl,
  lg,
  xs,
  sm,
  xl3,
  center,
  color,
  flexed,
  onClick,
  className,
  id,
}) => {
  return (
    <p
      id={id}
      onClick={onClick}
      className={classNames(
        `${flexed ? "flex justify-center items-center gap-2" : ""} text-${
          color ? color : "black"
        } font-${weight ? weight : "medium"} text-${
          xl3 ? "3xl" : xl ? "xl" : lg ? "lg" : xs ? "xs" : sm ? "sm" : "base"
        } ${className ? className : ""}`
      )}
      style={{
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
export const RadioInput = ({ name, values, checked, setChecked, isFlat }) => {
  return (
    <div
      className={classNames(
        `flex flex-wrap justify-between items-center ${
          isFlat ? "text-sm gap-4" : "text-base px-8"
        }`
      )}
      id={name}>
      {values.map((option, index) =>
        isFlat ? (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              value={option.value}
              checked={checked === option.value}
              onChange={(e) => setChecked(e.target.value)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-1">{option.name}</span>
          </label>
        ) : index % 2 === 0 ? (
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
        <button
          type="button"
          className="flex justify-center items-center gap-2 text-sm"
          aria-label={tooltip}>
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
          max={99}
          step={1}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          id="numOfExperiments"
          aria-label="number of experiments range input"
        />
        <span
          style={{
            left: label * 0.9 + (label < 10 ? 4 : 2) + "%",
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

export const SideControl = ({ children, headline, isUploadPaper = false }) => {
  const isMoblile = screenWidth < 600;

  return (
    <div
      className={classNames(
        `side-filter-box p-2 flex flex-col items-center  ${
          isUploadPaper ? "pt-0 h-full relative" : ""
        }`
      )}
      style={{
        width: "100%",
        maxHeight: isMoblile ? "400px" : "100vh",
      }}>
      {isUploadPaper ? (
        <div className=" w-full">{headline}</div>
      ) : (
        <div className="p-4 ">
          <Text className="text-3xl" weight="bold" color="blue" center>
            {headline}
          </Text>
        </div>
      )}

      <div
        className={classNames(
          `shadow-xl w-full mt-6 rounded-md bg-white flex flex-col  gap-2 px-4 py-2 overflow-y-scroll z-20 ${
            isUploadPaper ? "items-start h-full " : "items-center"
          }`
        )}>
        {isUploadPaper && <h2 className="text-3xl">Papers</h2>}
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
      <Button extraClass={"px-3 py-1.5 "}>
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
        extraClass={"px-3 py-1.5"}
        onClick={() => {
          navigate("/" + pageName);
        }}>
        <RessetIcon /> Reset to default
      </ButtonReversed>
    </div>
  );
};
export const Temporary = ({ extraClass, children }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div className="relative">
      {hover && (
        <p
          className="bg-indigo-900 text-white p-1 min-w-full z-50 "
          style={{
            position: "absolute",
            top: "calc(50% - 16px)",
          }}>
          Comming soon
        </p>
      )}
      <p
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={classNames(`${extraClass}`)}>
        {children}
      </p>
    </div>
  );
};

export const BigButton = ({ extraClass, icon, text, ...config }) => {
  return (
    <button
      className={classNames(
        `${extraClass} h-full w-full border-4 border-darkBlue flex flex-col justify-center items-center p-2 text-darkBlue font-bold text-md`
      )}
      {...config}>
      {icon}
      {text}
    </button>
  );
};
export const Checkbox = ({ field }) => {
  return (
    <label className="flex gap-2 items-center text-sm">
      <input
        {...field}
        className="text-blue focus:outline-none"
        type="checkbox"
      />
      <span>I want to get updates from ConTraSt website</span>
    </label>
  );
};
export const TopSideUserBox = () => {
  const snap = useSnapshot(state);
  return (
    <div className="w-full bg-grayLight p-4 h-28">
      <h2 className="text-2xl text-black font-normal">
        {snap.user.username}’s workspace
      </h2>
      <Text lg weight={"bold"} color={"blue"}>
        {snap.user.email}
      </Text>
      <div className="flex gap-2">
        <a className="underline text-xs" href="">
          edit my profile
        </a>
        <a className="underline text-xs" href="">
          logout
        </a>
      </div>
    </div>
  );
};
export const RadioFeedback = ({ label1, label2, name, headline, question }) => {
  const radioLabelClass = "flex flex-col items-start gap-1";
  return (
    <div>
      <h1 className="text-xl text-blue font-bold ">{headline}</h1>
      <p className="text-base mb-4">{question}</p>
      <div className="w-full flex gap-4 justify-center p-4 bg-grayLight mb-2">
        <label className="text-lg font-semibold text-right ">{label1}</label>
        <label className={radioLabelClass}>
          <Field type="radio" name={name} value={"1"} />1
        </label>
        <label className={radioLabelClass}>
          <Field type="radio" name={name} value={"2"} />2
        </label>
        <label className={radioLabelClass}>
          <Field type="radio" name={name} value={"3"} />3
        </label>
        <label className={radioLabelClass}>
          <Field type="radio" name={name} value={"4"} />4
        </label>
        <label className={radioLabelClass}>
          <Field type="radio" name={name} value={"5"} />5
        </label>

        <label className="text-lg font-semibold">{label2}</label>
        <ErrorMessage name={name} component="div" />
      </div>
    </div>
  );
};
export const ToastBox = ({ headline, text }) => {
  return (
    <div className="h-40 w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl text-blue mx-auto">{headline}</h1>
      <p className="text-lg mx-auto">{text}</p>
    </div>
  );
};

export const ExpandingBox = ({ children, headline, disabled }) => {
  const [open, setOpen] = useState(false);
  console.log(disabled);
  return (
    <div
      className={classNames(
        `px-2 py-1 border-2 border-blue rounded-md ${
          disabled ? "bg-slate-300" : "bg-white"
        }`
      )}>
      <div
        className="flex justify-between py-1 px-2"
        onClick={!disabled ? () => setOpen(!open) : null}>
        {" "}
        <Text weight={"bold"}>{headline}</Text>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d={
              open
                ? "M17 14.8297L15.9917 15.9738L12 12.9018L7.93354 15.9738L7 14.8297L12 10.9738L17 14.8297Z"
                : "M7 11.1179L8.00833 9.97381L12 13.0458L16.0665 9.97379L17 11.1179L12 14.9738L7 11.1179Z"
            }
            fill="#66bff1"
          />
        </svg>
      </div>
      {open && <div className="flex flex-col gap-2">{children}</div>}
    </div>
  );
};
