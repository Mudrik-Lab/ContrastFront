/** @format */
import React from "react";
import classNames from "classnames";

export const TextInput = ({ ...config }) => {
  return (
    <input
      {...config}
      type="text"
      className="border-cyan-600 border-2 rounded-md"
    ></input>
  );
};

export const Button = ({ children, ...config }) => {
  return (
    <button
      className="text-gray-800 bg-gray-100 hover:bg-gray-500 font-medium rounded-sm text-sm px-5 py-1.5 text-center mr-3 "
      {...config}
    >
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
  onClick,
}) => {
  return (
    <p
      onClick={onClick}
      className={classNames(
        `font-sans text-${color ? colors[color][1] : "black"} font-${
          weight ? weight : "medium"
        }  `
      )}
      style={{
        fontSize: lg ? "20px" : md ? "16px" : sm ? "12px" : size,
        textAlign: center && "center",
      }}
    >
      {children}
    </p>
  );
};

export const AlertButton = ({ text, icon }) => {
  const [colorPicker, setColorPicker] = React.useState(false);
  // initial chosen should come from server
  const [chosen, setChosen] = React.useState("green");

  return (
    <button
      onClick={() => setColorPicker(!colorPicker)}
      className={classNames(
        "relative w-full rounded-xl flex justify-between items-center font-semibold p-2 bg-white text-midDarkColor border border-grayLight mt-2 mb-2"
      )}
    >
      <div className="flex justify-start gap-2">
        {icon}
        {text}
      </div>
      <ColorTag color={chosen} />
      {colorPicker && <ColorPicker chosen={chosen} setChosen={setChosen} />}
    </button>
  );
};

export const Select = ({ children, ...config }) => {
  const optionClass = "block px-4 py-2 border text-gray-800";
  return (
    <select
      id="countries"
      className="bg-white border text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    >
      <option className={optionClass} selected>
        X axis category selection..
      </option>
      <option className={optionClass} value="US">
        Somthing
      </option>
      <option className={optionClass} value="CA">
        Somthing
      </option>
      <option className={optionClass} value="FR">
        Somthing
      </option>
      <option className={optionClass} value="DE">
        Somthing
      </option>
    </select>
  );
};
export const RadioInput = ({}) => {
  return (
    <div class="flex flex-wrap">
      <div class="flex items-center mr-4">
        <input
          id="red-radio"
          type="radio"
          value=""
          name="colored-radio"
          class="w-4 h-4 bg-gray-100 border-gray-300"
        />
        <label
          for="red-radio"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Amount
        </label>
      </div>
      <div class="flex items-center mr-4">
        <input
          type="radio"
          value=""
          name="colored-radio"
          class="w-4 h-4 bg-gray-100 border-gray-300"
        />
        <label
          for="green-radio"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Percent
        </label>
      </div>
    </div>
  );
};

export const Label = ({ children }) => {
  return (
    <label
      for="Select"
      class="block mb-2 text-sm text-gray-400 dark:text-white"
    >
      {children}
    </label>
  );
};

export const RangeInput = ({}) => {
  const [number, setNumber] = React.useState();
  return (
    <div className="relative">
      <input
        type="range"
        onChange={(e) => setNumber(e.target.value)}
        min={0}
        max={100}
        step={5}
        class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
        id="numOfExperiments"
      />
      <span
        style={{
          left: number * 0.9 + (number < 20 ? 5 : number < 70 ? 2 : 0) + "%",
          top: 4,
        }}
        className="absolute text-sm pointer-events-none transition-all"
      >
        {number}
      </span>
    </div>
  );
};
